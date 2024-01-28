import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="CF">
      <div className="social-icons">
        <a
          href="https://web.facebook.com/unisjp"
          target="_blank"
          rel="noopener noreferrer"
          className="m-1"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a
          href="https://twitter.com/usjp"
          target="_blank"
          rel="noopener noreferrer"
          className="m-1"
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="m-1"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a
          href="https://www.linkedin.com/school/university-of-sri-jayewardenepura/"
          target="_blank"
          rel="noopener noreferrer"
          className="m-1"
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
      <div className="footer-details">
        <p>&copy; All rights reserved.</p>
        <p>Address: University Name, Sri Lanka</p>
        <a href="UniName@email.com">Email: UniName@email.com</a>
      </div>
    </footer>
  );
};

export default Footer;
