const express = require('express');
const router = express.Router();
const {sequelize, Item, Category} = require('../db');

router.get('/', (req, res) => res.redirect('/categories'));

router.get('/categories', async(req, res, next) => {
    try {
        const categories = await Category.findAll();
        
        /*const html = `
        <html>
            <body>
                <h1>The Legend of Zelda Item Wiki for Breath of the Wild</h1>
                <p>On all adventures, both free-roaming and guided, there are items for Link to grab and use in the world. Check out some of them here!</p>
                <h3>Categories</h3>
                <div>${categories.map(category => {
                    return `<div><a href="/categories/${category.id}">${category.name}</a></div>`;
                }).join('')}</div>
            </body>
        </html>
        `*/
        res.send(categories);
    } catch(err) {
        next(err);
    }
    
});

router.get('/categories/:id', async(req, res, next) => {
    try {
        const category = await Category.findAll({
            include: [
                {model: Category}
            ]
        });
        const html = `
        <html>
            <body>
                <h1>The Legend of Zelda Item Wiki for Breath of the Wild</h1>
                
                <h3>Category: ${category.name}</h3>
                <div><p>${category.description}</p></div>
            </body>
        </html>
        `
        res.send(category);
    } catch(err) {
        next(err);
    }
});

module.exports = router;