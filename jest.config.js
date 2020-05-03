module.exports = {
  "setupFiles": [
    "<rootDir>/test-shim.js",
    "<rootDir>/test-setup.js",
    "jest-canvas-mock"
  ],
  "moduleFileExtensions": [
    "js", "json", "jsx", "ts", "tsx"
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
