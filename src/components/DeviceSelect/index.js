import React, { useState } from "react";
import PropTypes from "prop-types";
import DropDown from "../DropDown";
import SectionSeparator from "../SectionSeparator";

const DeviceSelect = ({ devices = [] }) => {
  const [value, setValue] = useState("");
  const handleDropdownClick = (device) => {
    setValue(device);
  };
  return (
    <div className="w-full">
      <SectionSeparator title="Select Device" />
      <div className="w-full">
        <DropDown onOptionSelect={handleDropdownClick} value={value}>
          {devices.map(({ id, name }) => (
            <DropDown.Option key={id} value={name}>
              {name}
            </DropDown.Option>
          ))}
        </DropDown>
      </div>
    </div>
  );
};

DeviceSelect.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.any),
};

DeviceSelect.defaultProps = {
  devices: [],
};

export default DeviceSelect;
