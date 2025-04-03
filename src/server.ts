import { App } from "./app.ts";

class ServerAPI {
	public application: App;
	public port: number;

	constructor({ application, port }: { application: App; port: number }) {
		Object.assign(this, { application, port });
	}

	public run() {
		this.application.listen(this.port, () => {
			console.log(`Server running on http://localhost:${this.port}. Started at ${new Date()}.\nPress CTRL+C to stop.`);
		});
	}
}

const SERVER = new ServerAPI({ application: new App(), port: Number(process.env.PORT) });
SERVER.run();
