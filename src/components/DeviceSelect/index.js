import React, { useState } from "react";
import PropTypes from "prop-types";
import DropDown from "../DropDown";
import SectionSeparator from "../SectionSeparator";
import { useSelectedOptions } from "../../Context/SelectedOptionsContext";

const DeviceSelect = ({ devices = [] }) => {
  const { selectedDevice, setSelectedDevice } = useSelectedOptions();
  const activeDevice = devices.find((device) => device.is_active === true);
  const handleDropdownClick = (device) => {
    setSelectedDevice(device);
  };
  return (
    <div className="w-full">
      <SectionSeparator title="Select Device" />
      <div className="w-full">
        <DropDown
          onOptionSelect={handleDropdownClick}
          value={selectedDevice || activeDevice?.name}
        >
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
