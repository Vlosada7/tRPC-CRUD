import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../trpc";

const initialState = {
	title: "",
	description: "",
};

function NoteForm() {
	const [note, setNote] = useState(initialState);

	const addNote = trpc.note.create.useMutation();
	const utils = trpc.useContext();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addNote.mutate(note, {
			onSuccess: () => {
				console.log("Note added succefully");
				utils.note.get.invalidate();
				setNote(initialState);
			},
		});
	};
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<form onSubmit={handleSubmit} className="bg-zinc-900 p-10 rounded-md">
			<input
				type="text"
				placeholder="Title"
				name="title"
				autoFocus
				onChange={handleChange}
				className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3"
				value={note.title}
			/>

			<textarea
				name="description"
				placeholder="Description"
				onChange={handleChange}
				className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3"
				value={note.description}
			></textarea>
			<button className="bg-zinc-500 px-3 py-2 rounded-md text-white">
				Save
			</button>
		</form>
	);
}

export default NoteForm;
