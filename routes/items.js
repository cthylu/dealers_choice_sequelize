const express = require('express');
const router = express.Router();
const {sequelize, Item, Category} = require('../db');

router.get('/', async(req, res) => {
    try {
        const items = await Item.findAll();
        
        const html = `
        <html>
            <body>
                <h1>The Legend of Zelda Item Wiki for Breath of the Wild</h1>
                <h3>All Items</h3>
                <div>${items.map(item => {
                    return `<div><a href="/categories/${item.id}">${item.name}</a></div>
                    <p>${item.description}</p>`;
                }).join('')}</div>
            </body>
        </html>
        `
        res.send(html);
    } catch(err) {
        next(err);
    }
});

router.get()

module.exports = router;