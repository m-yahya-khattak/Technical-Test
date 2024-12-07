"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store from "@/store/store";
import theme from "@/theme";
import { AuthProvider } from "@/context/AuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <AuthProvider>
            {children}
          </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
