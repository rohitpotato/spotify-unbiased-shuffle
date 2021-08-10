import React from "react";
import PropTypes from "prop-types";

/**
 * @param {React.HTMLProps<HTMLButtonElement>} props
 * @return {HTMLButtonElement}
 */

/* eslint-disable react/jsx-props-no-spreading */
const Button = ({ children, className, type, ...rest }) => {
  const types = {
    primary:
      "bg-spotify-green font-montserrat font-bold rounded text-base shadow text-purple border border-spotify-green ",
  };
  const defaultClass = `px-5 py-1 font-montserrat tracking-wider font-medium`;
  return (
    <button
      type="button"
      className={`${defaultClass} ${types[type]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  className: "",
  type: "",
};

export default Button;
