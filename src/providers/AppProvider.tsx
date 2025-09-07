"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { store } from "@/redux/store";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Toaster />
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AppProvider;
