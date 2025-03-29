import { Request, Response } from "express";
import { ICreateToolsUsecase } from "../usecases/createTools/createTools.interface.ts";
import { IGetToolUsecase } from "../usecases/getTool/getTool.interface.ts";

class ToolsController {
	constructor(
		private readonly createToolsUsecase: ICreateToolsUsecase,
		private readonly getToolUsecase: IGetToolUsecase,
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
}

export { ToolsController };
