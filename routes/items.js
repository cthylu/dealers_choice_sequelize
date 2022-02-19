const express = require('express');
const router = express.Router();
const {sequelize, Item, Category} = require('../db');

router.get('/', async(req, res, next) => {
    try {
        const items = await Item.findAll();
        
        const html = `
        <html>
            <body>
                <h1>The Legend of Zelda Item Wiki for Breath of the Wild</h1>
                <h3>All Items</h3>
                <div>${items.map(item => {
                    return `<div><a href="/items/${item.id}">${item.name}</a></div>
                    <p>${item.description}</p>`;
                }).join('')}</div>
                <p><a href="/categories"><< All Categories</a></p>
            </body>
        </html>
        `;
        res.send(html);
        
    } catch(err) {
        next(err);
    }
});

router.get('/:id', async(req, res, next) => {
    try {
        const items = await Item.findAll({
            where: {
                id: req.params.id
            }
        });
        const item = items[0];
        const html = `
        <html>
            <body>
                <h1>The Legend of Zelda Item Wiki for Breath of the Wild</h1>
                <h3>Item: ${item.name}, Category: ${item.categoryId}</h3>
                <div>
                    <p>${item.description}</p>
                    <p><a href="/items"><< All Items</a></p>
                    <p><a href="/categories"><< All Categories</a></p>
                </div>
            </body>
        </html>
        `;
        res.send(html);
    } catch(err) {
        next(err);
    }
});

module.exports = router;