type IDefaultReturn<T> = IReturnError | IReturnSuccess<T>;
interface IReturnError {
	is_error: true;
	message: string;
	status_code?: number;
}

interface IReturnSuccess<T> {
	is_error: false;
	response: T;
}

export { IDefaultReturn };
