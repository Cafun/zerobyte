import "./setup.ts";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { afterAll, afterEach, beforeAll, mock } from "bun:test";
import { client } from "~/client/api-client/client.gen";
import { server } from "~/test/msw/server";

void mock.module("~/client/hooks/use-root-loader-data", () => ({
	useRootLoaderData: () => ({
		theme: "dark",
		locale: "en-US",
		timeZone: "UTC",
		dateFormat: "MM/DD/YYYY",
		timeFormat: "12h",
		now: Date.now(),
	}),
}));

GlobalRegistrator.register({ url: "http://localhost:3000" });

client.setConfig({
	baseUrl: "http://localhost:3000",
	credentials: "include",
});

beforeAll(() => {
	server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});
