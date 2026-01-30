import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/ChatModal.css";

// New minimal chat icon SVG component
const ChatIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="chat-icon-svg"
    aria-hidden="true"
  >
    <path
      d="M12 2C6.48 2 2 5.58 2 10c0 2.24 1.12 4.26 2.92 5.72L4 22l5.26-2.63C10.14 19.45 11.06 19.5 12 19.5c5.52 0 10-3.58 10-8.5S17.52 2 12 2z"
      fill="currentColor"
    />
    <circle cx="8" cy="10" r="1.5" fill="var(--bg-surface, #1f1a14)" />
    <circle cx="12" cy="10" r="1.5" fill="var(--bg-surface, #1f1a14)" />
    <circle cx="16" cy="10" r="1.5" fill="var(--bg-surface, #1f1a14)" />
  </svg>
);

function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const modalRef = useRef(null);

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
    }, 800);
  }, []);

  // Schedule periodic attention between 10-15s
  const scheduleAttention = useCallback(() => {
    const delay = Math.floor(Math.random() * 5000) + 10000;
    attentionTimeoutRef.current = setTimeout(() => {
      triggerAttention();
      scheduleAttention();
    }, delay);
  }, [triggerAttention]);

  // When chat modal opens/closes, manage attention scheduling and active state
  useEffect(() => {
    if (!isOpen) {
      scheduleAttention();
      // Reset position when modal closes
      setPosition({ x: 0, y: 0 });
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

  // Dragging handlers
  const handleDragStart = useCallback((e) => {
    // Only allow dragging from header
    if (e.target.closest('.chat-header') && !e.target.closest('.close-btn')) {
      setIsDragging(true);
      const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
      dragStartRef.current = {
        x: clientX - position.x,
        y: clientY - position.y,
      };
      e.preventDefault();
    }
  }, [position]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    const newX = clientX - dragStartRef.current.x;
    const newY = clientY - dragStartRef.current.y;

    // Limit dragging within viewport
    const modal = modalRef.current;
    if (modal) {
      const rect = modal.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;

      setPosition({
        x: Math.max(-maxX, Math.min(0, newX)),
        y: Math.max(-maxY, Math.min(0, newY)),
      });
    }
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse/touch event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Send user message and fetch Nyx's reply
  const handleSend = async () => {
    if (!input.trim()) return;

    const outgoing = { sender: "user", text: input.trim() };
    const updatedChat = [...chat, outgoing];
    setChat(updatedChat);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("https://nyxfolio.onrender.com/chat", {
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
      <div
        className={`nyx-floating-button${buttonState !== "idle" ? ` nyx-floating-button--${buttonState}` : ""
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
        <ChatIcon />
      </div>

      {isOpen && (
        <div
          ref={modalRef}
          className={`chat-modal ${isDragging ? 'chat-modal--dragging' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatTitle"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <div
            className="chat-header"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
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
                aria-label={`${msg.sender === "user" ? "You" : "Nyx"}: ${msg.text
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
