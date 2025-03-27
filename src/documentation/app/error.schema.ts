import { Schema } from "swagger-jsdoc";

const DefaultErrorSchema: Schema = {
	type: "object",
	properties: {
		message: { type: "string", description: "The error message", default: "Something went wrong", example: "Something went wrong", required: true },
		is_error: { type: "boolean", description: "The error status", default: true, example: true, required: true },
	},
	required: ["message", "is_error"],
};
const ErrorSchema = {
	DefaultError: DefaultErrorSchema,
};

export { ErrorSchema };
