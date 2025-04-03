import { IRequestCounter } from "./app.interface.ts";

interface IRedisRepository {
	getRequestCounter(key: string): Promise<string | null>;
	saveRequestCounter(key: string, requestCounter: IRequestCounter, timeEXP: number): Promise<void>;
}

export type { IRedisRepository };
