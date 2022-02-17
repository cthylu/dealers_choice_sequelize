const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://localhost/dealers_choice_sq');

const Item = sequelize.define('item', {
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
});

const Category = sequelize.define('category', {
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
});

Item.belongsTo(Category);
Category.hasMany(Item);

const dbSync = async() => {
    try {
        await sequelize.sync({force: true});

        const weapons = await Category.create({name: 'Weapons', description: `In Breath of the Wild, Weapons are Link's main way of defeating Enemies by dealing damage to them directly. Weapons have a set amount of durability and will break when this value reaches zero, dealing twice as much damage as they do so.`});
        const shields = await Category.create({name: 'Shields', description: `Breath of the Wild features several different pieces of equipment to use as protection. The diverse range of Shields available allows Link to deviate from the standard Sword and Shield dynamic.`})

        await Item.create({name: 'Master Sword', categoryId: weapons.id, description: 'The Legendary sword that seals the darkness. Its blade gleams with a sacred luster that can oppose the Calamity. Only a hero chosen by the sword itself may wield it.'});
        await Item.create({name: 'Boomerang', categoryId: weapons.id, description: 'This throwing weapon was originally used by the forest-dwelling Koroks. Its unique shape allows it to return after being thrown.'});
        await Item.create({name: 'Hylian Shield', categoryId: shields.id, description: 'A shield passed down through the Hyrulean royal family, along with the legend of the hero who wielded it. Its defensive capabilities and durability outshine all other shields.'});
        
    } catch(err) {
        console.log(err)
    }
};

dbSync();

module.exports = {
        sequelize,
        Item,
        Category
}