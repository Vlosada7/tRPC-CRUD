import { trpc } from "../trpc";

interface Props {
	note: {
		_id: string;
		title: string;
		description: string;
		done: boolean;
	};
}

export function NoteCard({ note }: Props) {
	const deleteNote = trpc.note.delete.useMutation();
	const toggleDoneNote = trpc.note.toggleDone.useMutation();
	const utils = trpc.useContext();

	return (
		<div>
			<h1>{note.title}</h1>
			<p>{note.description}</p>
			<button
				onClick={() => {
					deleteNote.mutate(note._id, {
						onSuccess: (data) => {
							if (data) {
								utils.note.get.invalidate();
							}
						},
						onError: (error) => {
							console.error(error);
						},
					});
				}}
			>
				Delete
			</button>
			<button
				onClick={async () => {
					await toggleDoneNote.mutate(note._id, {
						onSuccess(data) {
							if (data) {
								utils.note.get.invalidate();
							}
						},
					});
				}}
			>
				{note.done ? "Undone" : "Done"}
			</button>
		</div>
	);
}
