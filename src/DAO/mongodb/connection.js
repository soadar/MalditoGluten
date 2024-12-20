import 'dotenv/config';

//import mongoose from 'mongoose';
import { connect } from 'mongoose';

//const connectionString = 'mongodb+srv://sdario66:LGvgvI5bFHzXH3HT@cluster0.vanew69.mongodb.net/TACC?retryWrites=true&w=majority'
const connectionString = process.env.MONGO_ATLAS_URL
try {
    await connect("mongodb+srv://sdario66:LGvgvI5bFHzXH3HT@cluster0.vanew69.mongodb.net/TACC?retryWrites=true&w=majority", {
        tls: true,
        ssl: true,
    })
    console.log('Conectado a MongoDB!');
} catch (error) {
    console.log("errorerror", error);
    console.log("errorerror2", error.msg);
}
// }