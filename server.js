// Import Express
const express = require('express');
//const morgan = require('morgan');

// Create an Express app
const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


// Use Morgan middleware with the 'dev' option for concise output
//app.use(morgan('dev'));

// Rest of your Express app code
// Define routes here (we'll add them soon)

// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  });

// Define routes here:
app.get('/greetings/:name', (req, res) => {
    res.send(`Hello there, ${req.params.name}`);
  });
  
app.get('/roll/:number', (req, res) => {
    let number = Number(req.params.number);
    if (typeof(number) !== 'number') {
        res.send(`You must specify a number.`);
    }
    else { 
        let randomNumber = Math.floor(Math.random() * number) + 1;
        res.send(`You rolled a ${randomNumber}`)
    }
});

app.get('/collectibles/:number', (req, res) => {
    console.log (req.params.number);
    let number = Number(req.params.number);
    if (typeof(number) !== 'number') {
        res.send(`You must specify an item number.`);
    }
    else if ((number < 0) || (number > collectibles.length -1)){ 
        res.send(`“This item is not yet in stock. Check back soon!”`)
    }
    else {
        let item = collectibles[number];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
    }
});

app.get('/shoes', (req, res) => {
    let shoesDisplay = [];
    let dynamicIndex = 0;
    shoesDisplay = [...shoes];
    const minPrice = Number(req.query.min);
    const maxPrice = Number(req.query.max);
    const type = req.query.type;
    
    if (typeof minPrice === 'number') {
        while (dynamicIndex < shoesDisplay.length) {
            if (shoesDisplay[dynamicIndex].price < minPrice) {
                shoesDisplay.splice(dynamicIndex, 1);
                dynamicIndex = dynamicIndex - 1;
            }
            dynamicIndex++;
        } 
    }

    dynamicIndex = 0; 
    if (typeof maxPrice === 'number') {
        while (dynamicIndex < shoesDisplay.length) {
            if (shoesDisplay[dynamicIndex].price > maxPrice) {
                shoesDisplay.splice(dynamicIndex, 1);
                dynamicIndex = dynamicIndex - 1;
            }
            dynamicIndex++;
        } 
    }

    dynamicIndex = 0; 
    if (type) {
        while (dynamicIndex < shoesDisplay.length) {
            console.log (shoesDisplay[dynamicIndex].type);
            console.log (type);
            if (shoesDisplay[dynamicIndex].type !== type) {
                shoesDisplay.splice(dynamicIndex, 1);
                dynamicIndex = dynamicIndex - 1;
            }
            dynamicIndex++;
        }
    }
    res.send(shoesDisplay);
});

