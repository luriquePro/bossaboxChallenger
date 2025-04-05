import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IToolsRepositoryReturnDTO } from "../../interface/tools.inteface.ts";

interface IDeleteToolEntryDTO {
	toolId: string;
}
interface IDeleteToolUsecase {
	execute({ toolId }: IDeleteToolEntryDTO): Promise<IDefaultReturn<IToolsRepositoryReturnDTO>>;
}

export type { IDeleteToolEntryDTO, IDeleteToolUsecase };
