import { Request, Response } from "express";
import { ICreateToolsUsecase } from "../usecases/createTools/createTools.interface.ts";

class ToolsController {
	constructor(private readonly createToolsUsecase: ICreateToolsUsecase) {}

	public async createTools(req: Request, res: Response) {
		try {
			const { title, link, description, tags } = req.body;
			const result = await this.createToolsUsecase.execute({ title, link, description, tags });

			if (result.is_error) {
				res.status(result.status_code || 400).json({ ...result, status_code: undefined });
				return;
			}

			res.status(201).json({ ...result, status_code: undefined });
			return;
		} catch (error) {
			let messageError = "Something went wrong";
			res.status(500).json({ is_error: true, message: messageError });
		}
	}
}

export { ToolsController };
