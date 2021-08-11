import React from "react";
import { clientId, redirectUrl, scopes, stateKey } from "../constants";
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

export const uuidv4 = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;

    // eslint-disable-next-line no-bitwise
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const isPrimitive = (value) =>
  typeof value !== "object" || typeof value !== "function";

export const getAuthUrl = (state) =>
  `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(
    clientId
  )}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUrl
  )}&state=${encodeURIComponent(state)}&scope=${encodeURIComponent(
    scopes.join(" ")
  )}`;

export const login = () => {
  const state = uuidv4();
  localStorage.setItem(stateKey, state);
  window.location.href = getAuthUrl(state);
};

export const hashParams = () => {
  const params = {};
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);

  let e;
  // eslint-disable-next-line no-cond-assign
  while ((e = r.exec(q))) {
    params[e[1]] = decodeURIComponent(e[2]);
  }

  return params;
};

export const shuffleArray = (arr) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i -= 1) {
    if (!arr[i]?.includes("local")) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  return array;
};

export class SpotifyError extends Error {
  constructor(body) {
    super();
    this.body = body;
  }
}
