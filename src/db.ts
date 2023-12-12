import mongoose from "mongoose";

export const dbConnect = async () => {
	try {
		const db = await mongoose.connect(
			"mongodb+srv://losadaadv:abcd1234@cluster0.15ki57m.mongodb.net/"
		);
		console.log("Database connected to", db.connection.db.databaseName);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	}
};
