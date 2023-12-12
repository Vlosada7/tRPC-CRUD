import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import Note from "../models/note";

export const getNotes = publicProcedure.query(async () => {
	const notes = await Note.find();
	return notes;
});

const createNote = publicProcedure
	.input(
		// Aqui estou fazendo o type da nota para que o frontend nao reclame com o Typescript
		z.object({
			title: z.string(),
			description: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		// Aqui aconteceria o salvamento no meu banco de dados
		const newNote = new Note({
			title: input.title,
			description: input.description,
		});

		const savedNote = await newNote.save();
		return `New note storage. New note: ${savedNote}`;
	});

const deleteNote = publicProcedure
	.input(z.string())
	.mutation(async ({ input }) => {
		const noteFound = await Note.findByIdAndDelete(input);
		if (!noteFound) throw new Error("Note not found");
		return true;
	});
// Rotas que o frontend pode acessar
export const notesRouter = router({
	// Metodos que o frontend pode acessar e chamar a funcao para realizar o que deseja
	create: createNote,
	get: getNotes,
	delete: deleteNote,
});
