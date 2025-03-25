import { model, Schema } from "mongoose";
import { IToolsDTO, ToolsStatus } from "../interface/tools.inteface.ts";
import { GenerateRandomid } from "../utils/GenerateRandomId.ts";

interface IToolsModel extends Partial<Omit<Omit<Document, "id">, "title">>, Omit<IToolsDTO, "_id"> {}

const ToolsModel = new Schema<IToolsModel>(
	{
		id: { type: String, required: true, unique: true, index: true, default: GenerateRandomid },
		title: { type: String, required: true, unique: true, index: true },
		link: { type: String, required: true, index: true },
		description: { type: String, required: true, index: true },
		tags: { type: [String], required: true, index: true },
		status: { type: String, required: true, index: true, enum: ToolsStatus, default: ToolsStatus.ACTIVE },
	},
	{ timestamps: true },
);

const Tools = model<IToolsModel>("Tools", ToolsModel);

export { Tools };
