import { createContext, useContext, useReducer } from "react";

// creating data layer
export const StateContext = createContext();

// state provider and higher order function 
export const StateProvider = ({ reducer , initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
