import { RedisClientType } from "redis";
import { IRequestCounter } from "../interface/app.interface.ts";
import { IRedisRepository } from "../interface/redis.interface.ts";

class RedisRepository implements IRedisRepository {
	constructor(private readonly redisClient: RedisClientType<any>) {
		this.redisClient.on("error", err => console.log("Redis Client Error", err));

		if (!this.redisClient.isOpen) {
			this.redisClient
				.connect()
				.then(() => console.log("Connected to Redis"))
				.catch(() => console.log("Error to connect to Redis"));
		}
	}

	public async getRequestCounter(key: string): Promise<string | null> {
		return this.redisClient.get(key);
	}

	public async saveRequestCounter(key: string, requestCounter: IRequestCounter, timeEXP: number): Promise<void> {
		await this.redisClient.set(key, JSON.stringify(requestCounter), { EX: timeEXP });
	}
}

export { RedisRepository };
