const express = require('express');
const app = express();
const port = 3000;


app.use('/', express.static('public'));

const budget ={
  myBudget : [
    {
        title : 'Eat Out',
        budget : 30,
    },  {
        title : 'Rent',
        budget : 350,
    } , {
        title : 'groceries',
        budget : 90,
    }

]
};



app.get('/hello', (req, res) => {
    res.send('Welcome to the Personal Budget API');
});

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});