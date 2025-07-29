
import "../styles/Contact.css";

function Contact() {
  return (
    <section className="section">
      <section className="contact" id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">📬 Contact Me</h2>
        <p>
          If you'd like to collaborate, hire, or just chat drop a message below or email me
          directly.
        </p>

        <div className="contact-buttons">
          <a
            href="mailto:shubhampatra635@gmail.com"
            className="email-button"
            role="button"
            aria-label="Send Email"
          >
            Send Email
          </a>
          <a
            href="/ShubhamPatraResume.pdf"
            className="resume-button"
            download
            role="button"
            aria-label="Download Resume"
          >
            Download Resume 📄
          </a>
        </div>
      </section>
    </section>
  );
}

export default Contact;