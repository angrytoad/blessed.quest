import React from 'react';
import BuilderStore from "./Stores/BuilderStore";
import BuilderUIStore from "./Stores/BuilderUIStore";

export const AppContext = React.createContext({
  BuilderStore,
  BuilderUIStore,
});
