import { createContext } from "react";
import { initialState } from "@contexts/Data/initialState";

const DataContext = createContext(initialState);

export default DataContext;
