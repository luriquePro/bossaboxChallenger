interface IDefaultReturn<T> {
	is_error: boolean;
	message?: string;
	status_code?: number;
	response?: T;
}

export { IDefaultReturn };
