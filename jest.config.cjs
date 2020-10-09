module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/test"],
  testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
};
