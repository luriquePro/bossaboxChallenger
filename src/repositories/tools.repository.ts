import { FilterQuery } from "mongoose";
import { IToolsCreateDTO, IToolsDTO, IToolsRepository, IToolsRepositoryReturnDTO } from "../interface/tools.inteface.ts";
import { Tools } from "../models/tools.model.ts";

class ToolsRepository implements IToolsRepository {
	public async findOneByObj(filter: FilterQuery<IToolsDTO>): Promise<IToolsRepositoryReturnDTO | null> {
		return await Tools.findOne(filter).lean();
	}

	public async findOneByTitle(title: string): Promise<IToolsRepositoryReturnDTO | null> {
		return await this.findOneByObj({ title });
	}

	public async findOneById(toolId: string): Promise<IToolsRepositoryReturnDTO | null> {
		return await this.findOneByObj({ id: toolId });
	}

	public async create(dataCreate: IToolsCreateDTO): Promise<IToolsRepositoryReturnDTO> {
		return await new Tools(dataCreate).save();
	}
}

export { ToolsRepository };
