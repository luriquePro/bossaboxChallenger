import { Paths } from "swagger-jsdoc";

const ToolsPath: Paths = {
	"/tools/{toolId}": {
		get: {},
	},
	"/tools/": {
		post: {
			summary: "Create a new tool",
			description: "Create a new tool with the provided data and return the created tool with its id and status",
			parameters: undefined,
			requestBody: {
				required: true,
				content: { "application/json": { schema: { $ref: "#/components/schemas/ToolsCreate" } } },
			},
			responses: {
				"201": {
					description: "Created",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/Tools" },
							example: {
								is_error: false,
								response: {
									id: "1",
									title: "Tool title",
									link: "https://example.com",
									description: "Tool description",
									tags: ["tag1", "tag2"],
									status: "ACTIVE",
								},
							},
						},
					},
				},
				"400": {
					description: "Tool with same title already exists",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/DefaultError", required: ["message", "is_error"] },
							example: {
								is_error: true,
								message: "Tool with same title already exists",
							},
						},
					},
				},
			},
		},
		get: {},
		patch: {},
		delete: {},
	},
};

export { ToolsPath };
