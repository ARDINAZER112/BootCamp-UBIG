import { createContext } from "react";

// Argumen createContext = nilai default (dipakai kalau tidak ada Provider)
const UserContext = createContext("Guest");

export default UserContext;
