import React, { useState, useContext, createContext, useCallback } from "react";

const Context = createContext(undefined);

const ContextProvider = ({ children }) => {
  const [head, setHead] = useState({});
  // const addHead = (key, value) => {
  //   setHead((data) => ({
  //     ...data,
  //     [key]: value,
  //   }));
  // };
  const addHead = useCallback((key, value) => {
    setHead((prevHead) => ({
      ...prevHead,
      [key]: value,
    }));
  }, []);

  return (
    <Context.Provider value={{ head, addHead }}>{children}</Context.Provider>
  );
};

const useHead = () => {
  return useContext(Context);
};

export { useHead, ContextProvider };
