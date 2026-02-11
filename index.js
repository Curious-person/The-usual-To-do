const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('api/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
    ]);
});

app.post('api/users', (req, res) => {
    const { name } = req.body;

    res.json({
        message: 'User Received',
        user: name
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});