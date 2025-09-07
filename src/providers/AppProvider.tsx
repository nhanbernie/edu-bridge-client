"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { store } from "@/redux/store";
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster />
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
