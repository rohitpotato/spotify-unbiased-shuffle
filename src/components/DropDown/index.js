import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { getSelectedChild, isPrimitive, noop } from "../../utils/common";
import Chevron from "../icons/Chevron";

const DropDownContext = React.createContext();
const defaultDropDownClass = `rounded-md w-full border border-spotify-green text-black p-4 font-montserrat bg-light cursor-pointer relative`;
const defaultOptionClass = `p-4 text-black font-montserrat block bg-white w-full text-left hover:bg-spotify-green transition-colors `;

const useSelectContext = () => {
  if (!DropDownContext) {
    throw new Error("Need a DropDown Context to render");
  }
  const { onOptionSelect, isVisible, setIsVisible } =
    useContext(DropDownContext);
  return {
    onOptionSelect,
    isVisible,
    setIsVisible,
  };
};

/* eslint-disable react/jsx-props-no-spreading */
const Option = ({ children, value, className, ...rest }) => {
  const { onOptionSelect, setIsVisible } = useSelectContext();
  const handleOptionSelect = () => {
    onOptionSelect(value);
    setIsVisible(false);
  };

  return (
    <button
      type="button"
      className={`${defaultOptionClass} ${className}`}
      onClick={handleOptionSelect}
      {...rest}
    >
      {children}
    </button>
  );
};

const DropDownContainer = ({ children, className = "" }) => {
  const { isVisible } = useSelectContext();
  return isVisible ? <div className={`${className}`}>{children}</div> : null;
};

const DropDownSelect = ({
  children,
  className = "",
  placeholder,
  value,
  selectedChild,
  rightIcon,
}) => {
  const { setIsVisible } = useSelectContext();

  const handleDropdownClick = () => {
    setIsVisible((s) => !s);
  };

  return (
    <div
      tabIndex={0}
      role="listbox"
      onClick={handleDropdownClick}
      onKeyPress={handleDropdownClick}
      className={`${defaultDropDownClass} ${className}`}
    >
      <div className="flex justify-between items-center">
        {value ? selectedChild : placeholder}
        {rightIcon || <Chevron />}
      </div>
      {children}
    </div>
  );
};

const DropDown = ({
  children,
  placeholder = "Choose an option.",
  value,
  className,
  onOptionSelect = noop,
  rightIcon = null,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (containerRef.current) {
        if (!containerRef.current.contains(event.target)) {
          setIsVisible(false);
        }
      }
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const values = {
    isVisible,
    setIsVisible,
    onOptionSelect,
  };
  const selectedChild = useMemo(() => {
    if (!children) return null;
    const [optionChild] = getSelectedChild(children, "value", value);
    if (!optionChild?.props?.children) return null;
    const _ = React.Children.toArray(optionChild.props.children);
    return React.Children.map(_, (child) => {
      let ch = child;
      if (isPrimitive(ch)) {
        ch = <>{ch}</>;
      }
      if (!React.isValidElement(ch)) return null;
      return React.cloneElement(ch);
    });
  }, [children, value]);

  return (
    <DropDownContext.Provider value={values}>
      <div ref={containerRef} className="relative">
        <DropDownSelect
          className={className}
          placeholder={placeholder}
          value={value}
          selectedChild={selectedChild}
          rightIcon={rightIcon}
        />
        <div className="absolute w-full top-20">
          <DropDownContainer>{children}</DropDownContainer>
        </div>
      </div>
    </DropDownContext.Provider>
  );
};
DropDown.Option = Option;

DropDown.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onOptionSelect: PropTypes.func,
  rightIcon: PropTypes.node,
};

DropDown.defaultProps = {
  children: null,
  placeholder: "Choose an option",
  value: null,
  className: "",
  onOptionSelect: noop,
  rightIcon: null,
};

DropDownSelect.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  selectedChild: PropTypes.node,
  rightIcon: PropTypes.node,
};

DropDownSelect.defaultProps = {
  children: null,
  placeholder: "Choose an option",
  value: null,
  className: "",
  selectedChild: null,
  rightIcon: null,
};

DropDownContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DropDownContainer.defaultProps = {
  children: null,
  className: "",
};

Option.propTypes = {
  children: PropTypes.node,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

Option.defaultProps = {
  children: null,
  value: null,
  className: "",
};

export default DropDown;
