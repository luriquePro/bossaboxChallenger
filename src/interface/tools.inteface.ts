import mongoose, { FilterQuery } from "mongoose";
import { ICreateToolsEntryDTO } from "../usecases/createTools/createTools.interface.ts";

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
	findOneByObj(filter: FilterQuery<IToolsDTO>): Promise<IToolsRepositoryReturnDTO | null>;
	findOneByTitle(title: string): Promise<IToolsRepositoryReturnDTO | null>;
	create(dataCreate: IToolsCreateDTO): Promise<IToolsRepositoryReturnDTO>;
}

export { IToolsStatus as ToolsStatus };
export type { IToolsCreateDTO, IToolsDTO, IToolsRepository, IToolsRepositoryReturnDTO, IToolsStatus };
