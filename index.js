let todos = [];

const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// users
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
    ]);
});

app.post('/api/users', (req, res) => {
    const { name } = req.body;

    res.json({
        message: 'User Received',
        user: name
    })
});

// todos
app.get('/api/todos', (req, res) => {

    res.status(200).json(todos);
})

app.post('/api/todos', (req, res) => {
    const { task } = req.body;

    const newTodo = {
        id: todos.length + 1,
        task,
        completed: false
    }

    todos.push(newTodo);

    res.status(200).json(newTodo);
})

app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;

    const todo = todos.find(t => t.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos[todos.indexOf(todo)] = {
        ...todo,
        task: task || todo.task,
        completed: completed !== undefined ? completed : todo.completed
    };

    res.status(200).json(todos[todos.indexOf(todo)]);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});