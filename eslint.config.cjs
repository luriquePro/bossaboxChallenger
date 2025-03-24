export default {
	parser: "@typescript-eslint/parser",
	extends: [
		"prettier",
		"eslint:recommended",
		"plugin:prettier/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:import/typescript",
		"plugin:eslint-plugin-import",
	],
	plugins: ["@typescript-eslint", "prettier", "import"],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	env: {
		browser: true,
		node: true,
		es2020: true,
	},
	rules: {
		"no-var": "error",
		indent: ["error", "tab", { SwitchCase: 1 }],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"import/order": [
			"warn",
			{
				groups: [
					"builtin", // Módulos nativos do Node.js (fs, path, etc.)
					["external", "type"], // Pacotes externos (react, next, etc.)

					["internal", "parent", "sibling"], // Tudo que é do projeto mas não é um estilo

					"index", // Imports do próprio diretório (./)

					["unknown"], // Qualquer outra coisa que não se encaixe nos grupos acima
				],
				pathGroups: [
					{
						pattern: "@/usecases/**",
						group: "internal",
						position: "before",
					},
					{
						pattern: "@/controllers/**",
						group: "internal",
						position: "before",
					},
					{
						pattern: "@/utils/**",
						group: "internal",
						position: "before",
					},
					{
						pattern: ["@/interface/**", "@/types/**"],
						group: "internal",
						position: "before",
					},
				],
				pathGroupsExcludedImportTypes: ["builtin"],
				alphabetize: { order: "asc", caseInsensitive: true },
				"newlines-between": "always",
			},
		],
		"sort-imports": [
			"warn",
			{
				ignoreCase: true,
				ignoreDeclarationSort: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ["single", "none", "all", "multiple"],
			},
		],
		"no-multi-spaces": "error",
		"space-in-parens": "error",
		"no-multiple-empty-lines": "error",
		"prefer-const": "error",
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/consistent-type-definitions": ["error", "interface"],
		"no-restricted-syntax": [
			"error",
			{
				selector: 'CallExpression[callee.object.name="$match"]',
				message: "$match can be used consecutively.",
			},
		],
		"prettier/prettier": ["error", { endOfLine: "auto" }],
	},
};
