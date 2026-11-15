import { createRoot } from "react-dom/client";

import App from "./component/App";

const container = document.getElementById("main");
if (!container) {
  throw new Error("Missing #main container");
}

createRoot(container).render(<App />);
