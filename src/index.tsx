import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "@radix-ui/themes/styles.css";
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById("root")!);

root.render(<BrowserRouter>
    <App />
</BrowserRouter >,)



