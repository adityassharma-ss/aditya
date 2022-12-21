import { createContext } from "react";
import { initialState } from "../Data/initialState";

const DataContext = createContext(initialState);

export default DataContext;
