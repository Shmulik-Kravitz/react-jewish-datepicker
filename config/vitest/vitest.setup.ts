import '@testing-library/jest-dom/vitest';
import filterConsole from "../utils/filterConsoleUtils";

// JSDOM does not implement window.matchMedia — provide a no-op stub
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

export const setup = () => {
  const disableFilter = filterConsole(['MODULE_NOT_FOUND']);
};
export const teardown = () => {

};
