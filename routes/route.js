import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { fetchShopData } from '../controllers/productControllers/products.js';

const router = express.Router();

router.get('/', (req, res) => {
    const error = req.flash('error') || '';
    res.render('index', { error });
});

router.get('/shop', isLoggedIn, async (req, res, next) => {
    try {
        // Replace with your database or API call to get the products
        const products = await fetchShopData(); // Assuming fetchShopData() retrieves products from your database

        res.render('shop.ejs', { products }); // Pass products to the shop view
    } catch (error) {
        req.flash('error', 'Failed to fetch shop data');
        next(error);
    }
});

export default router;
