import { Request, Response } from "express";
import sanitize from "mongo-sanitize";
import { ICreateToolsUsecase } from "../usecases/createTools/createTools.interface.ts";
import { IGetToolUsecase } from "../usecases/getTool/getTool.interface.ts";
import { IListToolsEntryDTO, IListToolsUsecase } from "../usecases/listTools/listTools.interface.ts";

class ToolsController {
	constructor(
		private readonly createToolsUsecase: ICreateToolsUsecase,
		private readonly getToolUsecase: IGetToolUsecase,
		private readonly listToolsUsecase: IListToolsUsecase,
	) {}

	public async createTools(req: Request, res: Response) {
		const { title, link, description, tags } = req.body;
		const result = await this.createToolsUsecase.execute({ title, link, description, tags });
		res.status(201).json(result);
		return;
	}

	public async getTool(req: Request, res: Response) {
		const { toolId } = req.params;
		const result = await this.getToolUsecase.execute({ toolId });
		res.json(result);
		return;
	}

	public async listTools(req: Request, res: Response) {
		const { tag, useRegex } = req.query;

		const queryData: IListToolsEntryDTO = {
			tag: sanitize(tag) as string,
			useRegex: sanitize(useRegex) === "true",
		};

		const result = await this.listToolsUsecase.execute(queryData);
		res.json(result);
		return;
	}
}

export { ToolsController };
