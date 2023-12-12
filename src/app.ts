import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import morgan from "morgan";
import { router, createContext } from "./trpc";
import { notesRouter } from "./routes/notes";

const app = express();

const appRouter = router({
	note: notesRouter,
});
app.use(morgan("dev"));

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);

export default app;
