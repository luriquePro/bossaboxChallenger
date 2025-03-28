import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IToolsRepositoryReturnDTO } from "../../interface/tools.inteface.ts";

interface IGetToolEntryDTO {
	toolId: string;
}

interface IGetToolUsecase {
	execute(dataGet: IGetToolEntryDTO): Promise<IDefaultReturn<IToolsRepositoryReturnDTO>>;
}

export type { IGetToolEntryDTO, IGetToolUsecase };
