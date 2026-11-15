module.exports = {
  "setupFiles": [
    "jest-canvas-mock"
  ],
  "transform": {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: {
        module: "Node16",
        moduleResolution: "Node16",
        isolatedModules: true
      }
    }]
  }
};
