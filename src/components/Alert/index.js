import React from "react";
import PropTypes from "prop-types";

const Alert = ({ message, onRemove }) => {
  const { type = "info", body } = message || {};
  if (!body) {
    return null;
  }

  const handleRemove = () => {
    onRemove("");
  };

  const types = {
    error: "bg-red-500",
    info: "bg-spotify-green",
  };

  return (
    <div
      className={`fixed top-3 right-3 py-3 px-2 text-white font-medium font-montserrat flex items-center justify-between space-x-3 ${types[type]}`}
    >
      <div>{body}</div>
      <button className="text-xl px-2" onClick={handleRemove} type="button">
        &times;
      </button>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Alert;
