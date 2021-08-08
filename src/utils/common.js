import React from "react";

/* eslint-disable consistent-return */
export const getSelectedChild = (children, key, value) => {
  const selectedChild = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    if (child.props[key] === value) {
      return child;
    }
  });
  return selectedChild;
};

export const noop = () => {};

export const isPrimitive = (value) =>
  typeof value !== "object" || typeof value !== "function";
