const mongoose = require('mongoose')



const connect = async () => {
	try {
		await mongoose.connect(
			process.env.DB_CONNECT,
			{
				useUnifiedTopology: true,
				useCreateIndex: true,
				useNewUrlParser: true
			}
		);

	} catch (err) {
		console.log(err);
	}
};

connect();