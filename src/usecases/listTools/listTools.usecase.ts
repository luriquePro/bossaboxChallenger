import { IDefaultReturn } from "../../interface/app.interface.ts";
import { IListToolsOptions, IToolsRepository } from "../../interface/tools.inteface.ts";
import { IListToolsEntryDTO, IListToolsReturnDTO, IListToolsUsecase } from "./listTools.interface.ts";

class ListToolsUsecase implements IListToolsUsecase {
	constructor(private readonly toolsRepository: IToolsRepository) {}

	public async execute({ tag, useRegex = false }: IListToolsEntryDTO): Promise<IDefaultReturn<IListToolsReturnDTO[]>> {
		const options = this.formatOptions({ tag, useRegex });
		const tools = await this.toolsRepository.list(options);

		return {
			is_error: false,
			response: tools,
		};
	}

	private formatOptions({ tag, useRegex }: IListToolsEntryDTO) {
		const options: IListToolsOptions = {};

		if (useRegex && tag) {
			options.tags = new RegExp(tag, "i");
		} else if (tag) {
			options.tags = tag;
		}

		return options;
	}
}

export { ListToolsUsecase };
