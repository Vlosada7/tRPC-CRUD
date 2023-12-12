import { publicProcedure, router } from "../trpc";

export const getNotes = publicProcedure.query(() => {
	return [];
});

export const notesRouter = router({
	get: getNotes,
});
