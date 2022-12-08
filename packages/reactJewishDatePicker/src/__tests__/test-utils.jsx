import React from "react";
import { render } from "@testing-library/react";


const customRender = (ui, options) =>
  render(ui, { ...options, legacyRoot: true });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
