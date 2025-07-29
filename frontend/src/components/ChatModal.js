import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/ChatModal.css";
import ChatbotLogo from "./ChatbotLogo";

function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const bodyRef = useRef(null);

  // Track floating button animation state: 'idle', 'attention', 'active'
  const [buttonState, setButtonState] = useState("idle");
  const attentionTimeoutRef = useRef(null);

  // Trigger one attention wiggle, then reset to idle
  const triggerAttention = useCallback(() => {
    setButtonState("attention");
    clearTimeout(attentionTimeoutRef.current);
    attentionTimeoutRef.current = setTimeout(() => {
      setButtonState("idle");
    }, 800); // matches --btn-attention-duration
  }, []);

  // Schedule periodic attention between 10-15s
  const scheduleAttention = useCallback(() => {
    const delay = Math.floor(Math.random() * 5000) + 10000; // 10000ms - 15000ms
    attentionTimeoutRef.current = setTimeout(() => {
      triggerAttention();
      scheduleAttention();
    }, delay);
  }, [triggerAttention]);

  // When chat modal opens/closes, manage attention scheduling and active state
  useEffect(() => {
    if (!isOpen) {
      scheduleAttention();
    } else {
      setButtonState("active");
      clearTimeout(attentionTimeoutRef.current);
    }
    return () => {
      clearTimeout(attentionTimeoutRef.current);
    };
  }, [isOpen, scheduleAttention]);

  // Initialize chat with greeting when opened
  useEffect(() => {
    if (isOpen && chat.length === 0) {
      setChat([
        {
          sender: "nyx",
          text: "Hey, I'm Nyx! Ask me anything about Boss 👾",
        },
      ]);
    }
  }, [isOpen, chat.length]);

  // Manage focus and keyboard handling when modal opens/closes
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      if (e.key === "Enter" && !isOpen) {
        setIsOpen(true);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      buttonRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Auto-scroll chat body to bottom on new messages or typing indicator change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [chat, isTyping]);

  // Listen for custom event to open chat modal from Hero component
  useEffect(() => {
    const handleOpenChatModal = () => {
      setIsOpen(true);
    };

    window.addEventListener("openChatModal", handleOpenChatModal);

    return () => {
      window.removeEventListener("openChatModal", handleOpenChatModal);
    };
  }, []);

  // Send user message and fetch Nyx's reply
  const handleSend = async () => {
    if (!input.trim()) return;

    const outgoing = { sender: "user", text: input.trim() };
    const updatedChat = [...chat, outgoing];
    setChat(updatedChat);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: outgoing.text }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.response || "Hmm... Something went wrong 😕";

      setTimeout(() => {
        setChat((prev) => [...prev, { sender: "nyx", text: replyText }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          sender: "nyx",
          text: "Error reaching Nyx 😢 Please try again later.",
        },
      ]);
      setIsTyping(false);
    }
  };

  // Reset to idle after bounceIn or wiggleAttention animation completes
  const handleAnimationEnd = useCallback((e) => {
    if (e.animationName === "bounceIn") {
      setButtonState("idle");
    }
    if (e.animationName === "wiggleAttention") {
      setButtonState("idle");
    }
  }, []);

  // Mouse handlers for click feedback
  const handleMouseDown = useCallback(() => {
    // CSS :active handles clickFeedback animation
  }, []);

  const handleMouseUp = useCallback(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <>
      {!isOpen && (
        <div
          className="nyx-speech-bubble"
          aria-label="Chat assistant prompt"
        >
          <span className="speech-text">Talk to Nyx</span>
          <div className="speech-pointer"></div>
        </div>
      )}

      <div
        className={`nyx-floating-button${
          buttonState !== "idle" ? ` nyx-floating-button--${buttonState}` : ""
        }`}
        role="button"
        aria-label={isOpen ? "Close chat" : "Open Nyx AI assistant"}
        aria-live="polite"
        data-button-state={buttonState}
        tabIndex="0"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen((prev) => !prev)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onAnimationEnd={handleAnimationEnd}
        ref={buttonRef}
      >
        <ChatbotLogo type="icon" size="sm" className="chat-logo" />
      </div>

      {isOpen && (
        <div
          className="chat-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatTitle"
        >
          <div className="chat-header">
            <span id="chatTitle">Nyx</span>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✖
            </button>
          </div>

          <div
            className="chat-body"
            ref={bodyRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-msg ${msg.sender}`}
                aria-label={`${msg.sender === "user" ? "You" : "Nyx"}: ${
                  msg.text
                }`}
              >
                {msg.text.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
            {isTyping && (
              <div
                className="chat-msg loading"
                role="status"
                aria-label="Nyx is typing"
              ></div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask Nyx anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              aria-label="Type your message"
              ref={inputRef}
            />
            <button onClick={handleSend} aria-label="Send message">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatModal;