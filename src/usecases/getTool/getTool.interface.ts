import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IToolsRepositoryReturnDTO } from "../../interface/tools.inteface.ts";

interface IGetToolEntryDTO {
	toolId: string;
}

interface IGetToolReturnDTO extends Omit<IToolsRepositoryReturnDTO, "_id" | "__v"> {
	_id: undefined;
	__v: undefined;
}

interface IGetToolUsecase {
	execute(dataGet: IGetToolEntryDTO): Promise<IDefaultReturn<IGetToolReturnDTO>>;
}

export type { IGetToolEntryDTO, IGetToolReturnDTO, IGetToolUsecase };
