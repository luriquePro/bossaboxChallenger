import mongoose, { FilterQuery } from "mongoose";
import { ICreateToolsEntryDTO } from "../usecases/createTools/createTools.interface.ts";
import { IListToolsReturnDTO } from "../usecases/listTools/listTools.interface.ts";

interface IToolsDTO {
	_id: mongoose.Types.ObjectId;
	id: string;
	title: string;
	link: string;
	description: string;
	tags: string[];
	status: IToolsStatus;
	createdAt: Date;
	updateAt: Date;
}

interface IToolsCreateDTO extends ICreateToolsEntryDTO {}

interface IToolsRepositoryReturnDTO {
	_id: mongoose.Types.ObjectId;
	id: string;
	title: string;
	link: string;
	description: string;
	tags: string[];
	status: IToolsStatus;
}

enum IToolsStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	DELETED = "DELETED",
}

interface IToolsRepository {
	findByObj(filter: FilterQuery<IToolsDTO>): Promise<IToolsRepositoryReturnDTO[]>;
	findOneByObj(filter: FilterQuery<IToolsDTO>): Promise<IToolsRepositoryReturnDTO | null>;
	findOneByTitle(title: string): Promise<IToolsRepositoryReturnDTO | null>;
	findOneById(toolId: string): Promise<IToolsRepositoryReturnDTO | null>;
	create(dataCreate: IToolsCreateDTO): Promise<IToolsRepositoryReturnDTO>;
	list(query: IListToolsOptions): Promise<IListToolsReturnDTO[]>;
}

interface IListToolsOptions {
	tags?: string | RegExp;
}

export { IToolsStatus as ToolsStatus };
export type { IListToolsOptions, IToolsCreateDTO, IToolsDTO, IToolsRepository, IToolsRepositoryReturnDTO, IToolsStatus };
