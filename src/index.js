import app from './app.js';
import { connectDB } from './db.js';

connectDB();
app.listen(4000, () => console.log('server listening at port 4000'));
