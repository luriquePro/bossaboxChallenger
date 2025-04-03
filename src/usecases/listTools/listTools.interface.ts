import { IDefaultReturn } from "../../interface/app.interface.ts";

interface IListToolsEntryDTO {
	tag?: string;
	useRegex?: boolean;
}

interface IListToolsUsecase {
	execute(query: IListToolsEntryDTO): Promise<IDefaultReturn<IListToolsReturnDTO[]>>;
}

interface IListToolsReturnDTO {
	id: string;
	title: string;
	link: string;
	description: string;
	tags: string[];
}

export type { IListToolsEntryDTO, IListToolsReturnDTO, IListToolsUsecase };
