import { useState, useRef, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import "../styles/Contact.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// Validation functions matching backend rules
const validators = {
  name: (value) => {
    if (!value.trim()) return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  },
  email: (value) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  },
  message: (value) => {
    if (!value.trim()) return "Message is required";
    if (value.trim().length < 10)
      return "Message must be at least 10 characters";
    return "";
  },
};

function Contact() {
  const [ref, isVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [charCount, setCharCount] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const emailButtonRef = useRef(null);
  const resumeButtonRef = useRef(null);

  useEffect(() => {
    // Skip magnetic effect on touch devices
    if ("ontouchstart" in window) return;

    const magneticDistance = 10;

    const createMagneticEffect = (button) => {
      if (!button) return null;

      const handleMouseMove = (e) => {
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const offsetX =
          ((e.clientX - buttonCenterX) / rect.width) * magneticDistance;
        const offsetY =
          ((e.clientY - buttonCenterY) / rect.height) * magneticDistance;

        requestAnimationFrame(() => {
          button.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
      };

      const handleMouseLeave = () => {
        requestAnimationFrame(() => {
          button.style.transform = "translate(0, 0)";
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    const cleanupEmail = createMagneticEffect(emailButtonRef.current);
    const cleanupResume = createMagneticEffect(resumeButtonRef.current);

    return () => {
      if (cleanupEmail) cleanupEmail();
      if (cleanupResume) cleanupResume();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Track character count for message field
    if (name === "message") {
      setCharCount(value.length);
    }

    // Real-time validation only if field is touched
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validators[name](value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const error = validators[name](formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // Log form data for debugging
    console.log("Submitting form data:", formData);

    const contactBackendUrl =
      process.env.REACT_APP_CONTACT_BACKEND_URL || "http://localhost:3001";

    try {
      const response = await fetch(`${contactBackendUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok && data.success) {
        setFormStatus("success");
        setShowSuccessAnimation(true);
        setFormData({ name: "", email: "", message: "" });
        setCharCount(0);
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: "", email: "", message: "" });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus("");
          setShowSuccessAnimation(false);
        }, 5000);
      } else {
        // Show the actual error message from backend
        console.error("Backend error:", data.message);
        setFormStatus("error");
        setTimeout(() => setFormStatus(""), 5000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus(""), 5000);
    }
  };

  return (
    <section className="section">
      <section
        ref={ref}
        className={`contact fade-in ${isVisible ? "visible" : ""}`}
        id="contact"
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading">Contact Me</h2>
        <p>
          If you'd like to collaborate, hire, or just chat, drop a message below
          or email me directly.
        </p>

        <div className="form-container-glass">
          <form className="contact-form" onSubmit={handleSubmit}>
            {formStatus === "sending" ? (
              <div className="form-skeleton">
                <div className="skeleton-item skeleton-input"></div>
                <div className="skeleton-item skeleton-input"></div>
                <div className="skeleton-item skeleton-textarea"></div>
                <div className="skeleton-item skeleton-button"></div>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <div className="floating-field">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className={
                        errors.name && touched.name ? "input-error" : ""
                      }
                      aria-required="true"
                      aria-invalid={
                        errors.name && touched.name ? "true" : "false"
                      }
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  {errors.name && touched.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <div className="floating-field">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className={
                        errors.email && touched.email ? "input-error" : ""
                      }
                      aria-required="true"
                      aria-invalid={
                        errors.email && touched.email ? "true" : "false"
                      }
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  {errors.email && touched.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <div className="floating-field">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      rows="5"
                      maxLength="1000"
                      className={
                        errors.message && touched.message ? "input-error" : ""
                      }
                      aria-required="true"
                      aria-invalid={
                        errors.message && touched.message ? "true" : "false"
                      }
                    />
                    <label htmlFor="message">Message</label>
                  </div>
                  {errors.message && touched.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                  <div className="char-counter">
                    <span
                      className={`char-count ${
                        charCount > 900 ? "warning" : ""
                      } ${charCount === 1000 ? "max" : ""}`}
                    >
                      {charCount}/1000
                    </span>
                    {charCount < 10 && (
                      <span className="char-hint">Minimum 10 characters</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={
                    formStatus === "sending" ||
                    Object.values(errors).some((e) => e)
                  }
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
              </>
            )}

            {formStatus === "success" && (
              <div
                className={`form-status success ${
                  showSuccessAnimation ? "animate" : ""
                }`}
                role="status"
              >
                <div className="success-checkmark">
                  <svg className="checkmark-svg" viewBox="0 0 52 52">
                    <circle
                      className="checkmark-circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      className="checkmark-check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                </div>
                <p className="success-text">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}

            {formStatus === "error" && (
              <p className="form-status error" role="status">
                ✗ Failed to send message. Please try emailing directly.
              </p>
            )}
          </form>
        </div>

        <div className="contact-divider">
          <span>or</span>
        </div>

        <div className="contact-buttons">
          <a
            ref={emailButtonRef}
            href="mailto:shubhampatra635@gmail.com"
            className="email-button"
            role="button"
            aria-label="Send Email Directly"
          >
            Email Directly
          </a>
          <a
            ref={resumeButtonRef}
            href="/ShubhamPatraResume.pdf"
            className="resume-button secondary"
            download
            role="button"
            aria-label="Download Resume"
          >
            <FaDownload className="button-icon" />
            Download Resume
          </a>
        </div>
      </section>
    </section>
  );
}

export default Contact;
