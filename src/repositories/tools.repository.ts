import { FilterQuery } from "mongoose";
import { IListToolsOptions, IToolsCreateDTO, IToolsDTO, IToolsRepository, IToolsRepositoryReturnDTO } from "../interface/tools.inteface.ts";
import { Tools } from "../models/tools.model.ts";
import { IListToolsReturnDTO } from "../usecases/listTools/listTools.interface.ts";

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

	public async findByObj(filter: FilterQuery<IToolsDTO>): Promise<IToolsRepositoryReturnDTO[]> {
		return await Tools.find(filter).lean();
	}

	public async list(query: IListToolsOptions): Promise<IListToolsReturnDTO[]> {
		return await Tools.aggregate([
			{ $match: query },
			{
				$project: {
					_id: 0,
					id: 1,
					title: 1,
					link: 1,
					description: 1,
					tags: 1,
				},
			},
		]);
	}
}

export { ToolsRepository };
