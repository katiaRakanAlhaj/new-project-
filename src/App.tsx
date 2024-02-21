import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme.js";
import "../i18n.js";
import "./index.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Layout />
          </Router>
          <ToastContainer />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
