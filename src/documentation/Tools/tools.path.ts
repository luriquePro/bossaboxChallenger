import { Paths } from "swagger-jsdoc";

const ToolsPath: Paths = {
	"/tools/{toolId}": {
		get: {
			summary: "Get a tool by id",
			description: "Get a tool by id",
			parameters: [
				{
					name: "toolId",
					in: "path",
					description: "The id of the tool",
					required: true,
					schema: { type: "string" },
				},
			],
			responses: {
				"200": {
					description: "OK",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/ToolsGet" },
							example: {
								is_error: false,
								response: {
									id: "1",
									title: "Tool title",
									link: "https://example.com",
									description: "Tool description",
									tags: ["tag1", "tag2"],
									status: "ACTIVE",
									createdAt: "2021-01-01T00:00:00.000Z",
									updateAt: "2021-01-01T00:00:00.000Z",
								},
							},
						},
					},
				},
				"404": {
					description: "Tool with this id does not exist",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/DefaultError" },
							example: {
								is_error: true,
								message: "Tool with this id does not exist",
							},
						},
					},
				},
				"500": {
					description: "Something went wrong",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/DefaultError" },
							example: {
								is_error: true,
								message: "Something went wrong",
							},
						},
					},
				},
			},
		},
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
				"500": {
					description: "Something went wrong",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/DefaultError" },
							example: {
								is_error: true,
								message: "Something went wrong",
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
