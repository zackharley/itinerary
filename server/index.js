import express from 'express';
import path from 'path';
import api from './api';

const app = express();
const PORT = 8080;

app.use('/api', api);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => console.log(`Itinerary server running on port ${PORT}`));