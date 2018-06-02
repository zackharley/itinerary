import express from 'express';
import path from 'path';
import csp from 'helmet-csp';
import api from './api';

const app = express();
const PORT = 8080;

app.use(csp({
    directives: {
        objectSrc: ["'self'", 'blob:']
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => console.log(`Itinerary server running on port ${PORT}`));