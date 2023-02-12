import { userName, logout, profile, searchBar } from "./forImport.js";

window.onload = async () => {
  await userName();
  logout();
  profile();
  searchBar();
};
