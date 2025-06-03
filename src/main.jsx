import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; //It lets your React app change the URL and render different components without reloading the page.
import { AppContextProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        {/* Step2: Wrap the app with the context provider */}
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </BrowserRouter>
);
