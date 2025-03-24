module.exports = {
	preset: "ts-jest/presets/default-esm",
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "js"],
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	transform: {
		"^.+\\.tsx?$": ["ts-jest", { useESM: true }],
	},
	testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
};
