import React from "react";
import PropTypes from "prop-types";
import DropDown from "../DropDown";
import SectionSeparator from "../SectionSeparator";
import { useSelectedOptions } from "../../Context/SelectedOptionsContext";

const DeviceSelect = ({ devices = [] }) => {
  const { selectedDevice, setSelectedDevice } = useSelectedOptions();
  const handleDropdownClick = (device) => {
    setSelectedDevice(device);
  };

  const noDeviceAlert = devices.length === 0;

  return (
    <div className="w-full">
      <SectionSeparator title="Select Device" />
      <div className="w-full">
        <DropDown onOptionSelect={handleDropdownClick} value={selectedDevice}>
          {devices.map(({ id, name }) => (
            <DropDown.Option key={id} value={name}>
              {name}
            </DropDown.Option>
          ))}
        </DropDown>
      </div>

      {noDeviceAlert && (
        <div className="text-center font-montserrat text-red-600 font-bold mt-4">
          Please Open Spotify on your device and refresh.
        </div>
      )}
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
