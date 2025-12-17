module.exports = {
  preset: "jest-expo",
  
  // UPDATE THIS ARRAY:
  setupFilesAfterEnv: [
    "./jest.setup.js", // <--- Add this line here
    "@testing-library/jest-native/extend-expect"
  ],

  moduleNameMapper: {
    "^expo-router$": "<rootDir>/__mocks__/expo-router.ts",
  },

  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native" +
      "|@react-native" +
      "|expo" +
      "|@expo" +
      "|@unimodules" +
      "|immer" +
      "|zustand" +
      ")",
  ],
};