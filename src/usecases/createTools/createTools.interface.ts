import { IDefaultReturn } from "../../interface/app.interface.ts";

interface ICreateToolsEntryDTO {
	title: string;
	link: string;
	description: string;
	tags: string[];
}

interface ICreateToolsReturnDTO extends ICreateToolsEntryDTO {
	id: string;
}

interface ICreateToolsUsecase {
	execute(dataCreate: ICreateToolsEntryDTO): Promise<IDefaultReturn<ICreateToolsReturnDTO>>;
}

export { ICreateToolsEntryDTO, ICreateToolsReturnDTO, ICreateToolsUsecase };
