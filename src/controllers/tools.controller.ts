import { Request, Response } from "express";
import sanitize from "mongo-sanitize";
import { ICreateToolsEntryDTO, ICreateToolsUsecase } from "../usecases/createTools/createTools.interface.ts";
import { IDeleteToolUsecase } from "../usecases/deleteTool/deleteTool.interface.ts";
import { IGetToolUsecase } from "../usecases/getTool/getTool.interface.ts";
import { IListToolsEntryDTO, IListToolsUsecase } from "../usecases/listTools/listTools.interface.ts";

class ToolsController {
	constructor(
		private readonly createToolsUsecase: ICreateToolsUsecase,
		private readonly getToolUsecase: IGetToolUsecase,
		private readonly listToolsUsecase: IListToolsUsecase,
		private readonly deleteToolUsecase: IDeleteToolUsecase,
	) {}

	public async createTools(req: Request, res: Response) {
		const { title, link, description, tags } = req.body;
		const dataCreate: ICreateToolsEntryDTO = {
			title: sanitize(title) as string,
			link: sanitize(link) as string,
			description: sanitize(description) as string,
			tags: sanitize(tags) as string[],
		};

		const result = await this.createToolsUsecase.execute(dataCreate);
		res.status(201).json(result);
		return;
	}

	public async getTool(req: Request, res: Response) {
		const { toolId } = req.params;
		const result = await this.getToolUsecase.execute({ toolId: sanitize(toolId) });
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

	public async deleteTool(req: Request, res: Response) {
		const { toolId } = req.params;
		const result = await this.deleteToolUsecase.execute({ toolId: sanitize(toolId) });
		res.json(result);
		return;
	}
}

export { ToolsController };
