import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const getNotes = publicProcedure.query(() => {
	return [
		{
			id: 1,
			title: "Note 1",
			content: "Content 1",
		},
	];
});

const createNote = publicProcedure
	.input(
		// Aqui estou fazendo o type da nota para que o frontend nao reclame com o Typescript
		z.object({
			title: z.string(),
			description: z.string(),
		})
	)
	.mutation(({ input }) => {
		// Aqui aconteceria o salvamento no meu banco de dados
		console.log(input);
		return "received";
	});

// Rotas que o frontend pode acessar
export const notesRouter = router({
	// Metodos que o frontend pode acessar e chamar a funcao para realizar o que deseja
	create: createNote,
	get: getNotes,
});
