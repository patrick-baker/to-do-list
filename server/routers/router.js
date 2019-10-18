const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require ('../modules/pool.js');

// GET
koalaRouter.get('/', (req, res) => {
    console.log('in GET route');

    const query = 'SELECT * FROM koalas ORDER BY "id";';

    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error making GET query', error);
        res.sendStatus(500);        
    });
}); // END GET ROUTE


// POST
koalaRouter.post('/', (req, res) => {
    console.log('in POST route');

    const query = `INSERT INTO "koalas" ("name", "gender", "age", "readyForTransfer", "notes")
	VALUES($1, $2, $3, $4, $5);`;

    pool.query(query, [req.body.name, req.body.gender, req.body.age, req.body.transfer, req.body.notes])
    .then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error making insert query', error);
        res.sendStatus(500);        
    });
}); // END POST ROUTE

// PUT
koalaRouter.put('/:id', (req, res) => {
    console.log('in Put route');
    const query = `UPDATE "koalas" SET "readyForTransfer" = true
    WHERE "id" = $1;`;
    pool.query(query, [req.params.id]).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in Put query`, error);
        res.sendStatus(500);
    });
}); // END PUT ROUTE


// DELETE
koalaRouter.delete('/:id', (req, res) => {
    console.log('koalas delete was hit');

    const query = `DELETE FROM "koalas"
    WHERE "id" = $1;`;

    pool.query(query, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error making DELETE query', error);
            res.sendStatus(500);
        });
}); // END DELETE ROUTE



module.exports = koalaRouter;