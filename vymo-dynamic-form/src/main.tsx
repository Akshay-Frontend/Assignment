import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/global.css";
import { LeadPage } from "./features/lead/LeadPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LeadPage />
  </StrictMode>,
);
