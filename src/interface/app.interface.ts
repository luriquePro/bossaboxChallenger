interface IDefaultReturn<T> {
	is_error: boolean;
	message?: string;
	status_code?: number;
	response?: T;
}

interface IRequestCounter {
	count: number;
	limit_datetime: string;
}

interface IRateLimit {
	timeLimitInSeconds?: number;
	limitRequestPerTime?: number;
	messageInError?: string;
}

export type { IDefaultReturn, IRateLimit, IRequestCounter };
