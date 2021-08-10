import React from "react";
import PropTypes from "prop-types";

const SectionSeparator = ({ title }) => (
  <div className="mb-4 font-montserrat md:text-2xl text-xl text-opacity-60 text-white font-medium">
    {title}
  </div>
);

SectionSeparator.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionSeparator;
