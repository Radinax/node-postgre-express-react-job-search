import { createContext } from "react";

export const SearchContext = createContext([]);

export const SearchProvider = SearchContext.Provider;

export const SearchConsumer = SearchContext.Consumer;
