module.exports = {
    testEnvironment: 'jsdom',
    verbose: true,
    rootDir: "./",
    testPathIgnorePatterns: ["<rootDir>/node_modules"],
    transform: {
        "^.+\\.(js|jsx)?$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx"],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "babel-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: '<rootDir>/coverage/unit'
}