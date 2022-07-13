import app from './app';
import { AppDataSource } from './src/database/Config';

async function connection() {
    const port = process.env.PORT;
    try {
        await AppDataSource.initialize();
        console.log('Database connected! ');
        app.listen(port);
        console.log(`Listening on port ${port}`)
    } catch (error) {
        console.log(error);
    }
}

connection();