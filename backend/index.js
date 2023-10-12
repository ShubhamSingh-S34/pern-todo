const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')



app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("Server on port 5000");
})


app.post('/todos', async (req, res) => {

    try {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])

        res.json(newTodo.rows)
        // res.send(req.body);
    }
    catch (err) {
        console.error(err.message)
    }

})



// get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id DESC");
        res.json(allTodos.rows);
    }
    catch (err) {
        console.error(err.message);
    }
})

// get 1 todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id= $1", [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message)
    }
})



// updata a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatedTodo = await pool.query("UPDATE todo SET description =$1 WHERE todo_id=$2", [description, id]);
        res.json(updatedTodo.rows);
    } catch (err) {
        console.error(err.message)
    }

})

// delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo where todo_id=$1", [id]);
        res.json(deleteTodo);
    } catch (err) {
        console.log(err.message)
    }
})