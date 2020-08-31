let jwtDecode = require("jwt-decode");

export const updateAppSettings = (token) => {
  localStorage.clear();
  if (token) {
    localStorage.setItem("displayName", jwtDecode(token)["sub"]);
    localStorage.setItem("token", token);
  }
};

export const isMember = () => {
  if (localStorage.getItem("token")) {
    const audience = jwtDecode(localStorage.getItem("token"))["aud"];
    return !audience.includes("SHOW_USERS") && !audience.includes("ADD_BOOK");
  }
};

export const constructHeader = (contentType) => {
  const auth = "Bearer " + localStorage.getItem("token") || "";
  return contentType
    ? { "Content-type": contentType, Authorization: auth }
    : { Authorization: auth };
};
