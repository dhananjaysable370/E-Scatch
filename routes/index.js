import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    const error = ''; // Default to an empty string or array if there's no error
    res.render('index', { error });
});


export default router;