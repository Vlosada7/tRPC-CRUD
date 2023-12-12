import { trpc } from "../trpc";

interface Props {
	note: {
		_id: string;
		title: string;
		description: string;
	};
}

export function NoteCard({ note }: Props) {
	const deleteNote = trpc.note.delete.useMutation();
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
					});
				}}
			>
				Delete
			</button>
			<button>Done</button>
		</div>
	);
}
