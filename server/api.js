import { Router } from 'express';
import fs from 'fs';
import moment from 'moment-timezone';
import { generateItinerary } from '../pdf';

const router = Router();

router.get('/itinerary/:date', async (req, res) => {
    try {
        const date = moment(req.params.date).format('YYYY-MM-DD');
        const itineraryFile = await generateItinerary({ date });
        const stream = fs.createReadStream(itineraryFile);
        const stat = fs.statSync(itineraryFile);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=itinerary-${date}.pdf`);
        return stream.pipe(res);
    } catch (error) {
        return res.status(400).send({ message: 'Error!', error: error.toString() });
    }
});

export default router;