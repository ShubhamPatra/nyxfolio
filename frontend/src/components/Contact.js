import { useRef, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FaDownload } from "react-icons/fa";
import "../styles/Contact.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function Contact() {
  const [ref, isVisible] = useScrollAnimation();
  const [state, handleSubmit] = useForm("meekrjjb");
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

  return (
    <section className="section">
      <section
        ref={ref}
        className={`contact fade-in ${isVisible ? "visible" : ""}`}
        id="contact"
        aria-labelledby="contact-heading"
      >
        <div className="contact-container">
          <h2 id="contact-heading">Contact Me</h2>
          <p>
            If you'd like to collaborate, hire, or just chat, drop a message below
            or email me directly.
          </p>

          <div className="form-container-glass">
            {state.succeeded ? (
              <div className="form-status success animate" role="status">
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
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="floating-field">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder=" "
                      aria-required="true"
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <div className="floating-field">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder=" "
                      aria-required="true"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <div className="floating-field">
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder=" "
                      rows="5"
                      aria-required="true"
                    />
                    <label htmlFor="message">Message</label>
                  </div>
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="error-message"
                  />
                </div>

                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={state.submitting}
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
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
        </div>
      </section>
    </section>
  );
}

export default Contact;
