"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
