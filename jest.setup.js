// jest.setup.js
require("@testing-library/jest-native/extend-expect");

// 1. Fix for Expo SDK 52: __ExpoImportMetaRegistry
// Prevents the "Winter" runtime from failing when lazy-loading Metro metadata.
Object.defineProperty(global, "__ExpoImportMetaRegistry", {
  value: {},
  configurable: true,
  writable: true,
});

// 2. Fix for Expo SDK 52: structuredClone
// Prevents Expo from trying to load its native implementation of structuredClone,
// which causes the "import outside of scope" error in Jest.
Object.defineProperty(global, "structuredClone", {
  value: (obj) => JSON.parse(JSON.stringify(obj)),
  configurable: true,
  writable: true,
});