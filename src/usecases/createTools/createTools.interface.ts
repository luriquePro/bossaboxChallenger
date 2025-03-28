import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IToolsRepositoryReturnDTO } from "../../interface/tools.inteface.ts";

interface ICreateToolsEntryDTO {
	title: string;
	link: string;
	description: string;
	tags: string[];
}

interface ICreateToolsReturnDTO extends Omit<IToolsRepositoryReturnDTO, "_id" | "__v"> {
	_id: undefined;
	__v: undefined;
}

interface ICreateToolsUsecase {
	execute(dataCreate: ICreateToolsEntryDTO): Promise<IDefaultReturn<ICreateToolsReturnDTO>>;
}

export type { ICreateToolsEntryDTO, ICreateToolsReturnDTO, ICreateToolsUsecase };
