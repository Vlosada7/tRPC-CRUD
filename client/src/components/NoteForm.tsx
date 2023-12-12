import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../trpc";

function NoteForm() {
	const [note, setNote] = useState({
		title: "",
		description: "",
	});

	const addNote = trpc.note.create.useMutation();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(note);
		addNote.mutate(note, {
			onSuccess: () => {
				console.log("Note added succefully");
			},
		});
	};
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Title"
				name="title"
				autoFocus
				onChange={handleChange}
			/>

			<textarea
				name="description"
				placeholder="Description"
				onChange={handleChange}
			></textarea>
			<button>save</button>
		</form>
	);
}

export default NoteForm;
