import React from "react";
import Icon from "../../images/linkedin.png";

function LinkedIn() {
  return (
    <a
      href="https://www.linkedin.com/in/rohit-kashyap-a33a4716a/"
      target="_blank"
      rel="noreferrer"
    >
      <img src={Icon} className="h-12 w-12" alt="LinkedIn-icon" />
    </a>
  );
}

export default LinkedIn;
