module.exports = {
  "setupFiles": [
    "<rootDir>/test-shim.js",
    "<rootDir>/test-setup.js"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testMatch": [
    "**/*.test.(ts|tsx|js)"
  ],
  "moduleNameMapper": {
    "\\.(css|less|scss|sass)$": "jest-css-modules"
  }
};
