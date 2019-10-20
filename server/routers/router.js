const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require ('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    console.log('in GET route');
    const query = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error making GET query', error);
        res.sendStatus(500);        
    });
}); // END GET ROUTE


// POST
router.post('/', (req, res) => {
    console.log('in POST route');
    const query = `INSERT INTO "tasks" ("taskName", "priority", "notes")
	VALUES($1, $2, $3);`;

    pool.query(query, [req.body.taskName, req.body.priority, req.body.notes])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error making insert query', error);
        res.sendStatus(500);        
    });
}); // END POST ROUTE

// PUT
router.put('/:id', (req, res) => {
    console.log('in Put route');
    const query = `UPDATE "tasks" 
    SET "priority" = $1,
    "status" = $2
    WHERE "id" = $3;`;
    pool.query(query, [req.body.priority, req.body.status, req.params.id])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in Put query`, error);
        res.sendStatus(500);
    });
}); // END PUT ROUTE


// DELETE
router.delete('/:id', (req, res) => {
    console.log('tasks delete was hit');
    const query = `DELETE FROM "tasks"
    WHERE "id" = $1;`;
    pool.query(query, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error making DELETE query', error);
            res.sendStatus(500);
        });
}); // END DELETE ROUTE


module.exports = router;