import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-number">05.</span> Contact
          </h2>
          <div className="section-line"></div>
        </div>
        <div className="contact-content">
          <p>
            Feel free to reach out for collaborations, project inquiries, or just to say hello!
          </p>
          <form className="contact-form" style={{marginTop: "2rem", maxWidth: 500}}>
            <div style={{marginBottom: "1rem"}}>
              <label htmlFor="name" style={{display: "block", marginBottom: 4}}>Name</label>
              <input type="text" id="name" name="name" required style={{width: "100%", padding: "0.5rem", borderRadius: 4, border: "1px solid var(--border-color)"}} />
            </div>
            <div style={{marginBottom: "1rem"}}>
              <label htmlFor="email" style={{display: "block", marginBottom: 4}}>Email</label>
              <input type="email" id="email" name="email" required style={{width: "100%", padding: "0.5rem", borderRadius: 4, border: "1px solid var(--border-color)"}} />
            </div>
            <div style={{marginBottom: "1rem"}}>
              <label htmlFor="message" style={{display: "block", marginBottom: 4}}>Message</label>
              <textarea id="message" name="message" rows="5" required style={{width: "100%", padding: "0.5rem", borderRadius: 4, border: "1px solid var(--border-color)"}} />
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;