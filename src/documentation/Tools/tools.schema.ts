import { Schema } from "swagger-jsdoc";

const toolsRequiredFields = ["title", "link", "description", "tags"];

const toolsCreateSchema: Schema = {
	type: "object",
	properties: {
		title: { type: "string", description: "The title of the tool", default: "Tool title" },
		link: { type: "string", description: "The link of the tool", default: "https://example.com" },
		description: { type: "string", description: "The description of the tool", default: "Tool description" },
		tags: { type: "array", description: "The tags of the tool", default: ["tag1", "tag2"] },
	},
	required: toolsRequiredFields,
};

const toolsGetSchema: Schema = {
	type: "object",
	properties: {
		id: { type: "string", description: "The id of the tool", default: "1" },
		title: { type: "string", description: "The title of the tool", default: "Tool title" },
		link: { type: "string", description: "The link of the tool", default: "https://example.com" },
		description: { type: "string", description: "The description of the tool", default: "Tool description" },
		tags: { type: "array", description: "The tags of the tool", default: ["tag1", "tag2"] },
		status: { type: "string", description: "The status of the tool", default: "ACTIVE", enum: ["ACTIVE", "INACTIVE"] },
	},
	required: [],
};

const ToolsSchema = {
	ToolsCreate: toolsCreateSchema,
};

export { ToolsSchema };
