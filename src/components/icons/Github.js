import React from "react";
import Icon from "../../images/github.png";

function Github() {
  return (
    <a
      href="https://github.com/rohitpotato/spotify-unbiased-shuffle"
      target="_blank"
      rel="noreferrer"
    >
      <img src={Icon} className="h-12 w-12" alt="github-icon" />
    </a>
  );
}

export default Github;
