function Contact() {
  return (
    <>
      <div className="container-contact">
        <div className="block-one">
          <div className="heading-contact-text">
            <p>CONTACT</p>
          </div>
          <div className="heading-blockone">
            <h1>Let's build</h1>
            <h1>something great</h1>
          </div>
          <div className="messgg">
            <p>
              Have a project in mind or just want to say hello? Would love to
              hear from you.
            </p>
          </div>

          <div className="contact-details-div">
            <div className="contact-dtls">
              <div className="email-details">
                <div className="mail-desc-wrapper">
                  <div className="mail-icon-wrapper">
                    <div className="mail-icon">
                      <i class="fa-regular fa-envelope"></i>
                    </div>
                  </div>
                  <div className="mail-desc">
                    <p style={{ fontWeight: "bold" }}>Email</p>
                    <p style={{ color: "gray" }}>abhishek.kabi.21@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="email-details">
                <div className="mail-desc-wrapper">
                  <div className="mail-icon-wrapper">
                    <div className="mail-icon">
                      <i class="fa-solid fa-phone"></i>
                    </div>
                  </div>
                  <div className="mail-desc">
                    <p style={{ fontWeight: "bold" }}>Phone</p>
                    <p style={{ color: "gray" }}>+91 9332522166</p>
                  </div>
                </div>
              </div>

              <div className="email-details">
                <div className="mail-desc-wrapper">
                  <div className="mail-icon-wrapper">
                    <div className="mail-icon">
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                  </div>
                  <div className="mail-desc">
                    <p style={{ fontWeight: "bold" }}>Location</p>
                    <p style={{ color: "gray" }}>Bangalore, India.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="social-icons">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-x-twitter"></i>
            <i class="fa-brands fa-square-instagram"></i>

            <i class="fa-brands fa-discord"></i>
          </div>
        </div>
        <div className="block-two">
          <div className="name-and-mail-wrapper">
            <div className="flex-field">
              <p>Your Name</p>
              <input
                type="text"
                placeholder="Enter your name"
                className="header-input"
              />
            </div>
            <div className="flex-field">
              <p>Your Email</p>
              <input
                type="text"
                placeholder="Enter your email"
                className="header-input"
              />
            </div>
          </div>
          <div className="flex-field">
            <p>Subject</p>
            <input
              type="text"
              placeholder="Enter subject"
              className="header-input-subject"
            />
          </div>
          <div className="flex-field">
            <p>Message</p>
            <textarea type="text" className="header-input-textarea" />
          </div>
          <div className="Send-message-btn">
            <button className="Send-btn">Send Message</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
