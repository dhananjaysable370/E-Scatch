import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();


router.get('/', (req, res) => {
    const error = req.flash('error') || ''; // Use flash messages for errors
    res.render('index', { error });
});

router.get('/shop', isLoggedIn, async (req, res, next) => {
    try {
        // Fetch shop data from database or API
        // const shopData = await fetchShopData();
        res.render('shop.ejs');
    } catch (error) {
        req.flash('error', 'Failed to fetch shop data');
        next(error);
    }
})

export default router;