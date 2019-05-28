const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3',
    },
    useNullAsDefault: true, // needed for sqlite
};

const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());


server.post('/api/cohorts', async (req, res) => {
    try {
        const [id] = await db('cohorts').insert(req.body);

        const cohort = await db('cohorts')
            .where({ id })
            .first();
        
        res.status(201).json(cohort);
    } catch(err) {
        const message = 'There is an error somewhere';
        res.status(500).json({ message, err });
    }
});

server.get('/api/cohorts', async (req, res) => {
    try {
        const cohorts = await db('cohorts'); // Get all cohorts
        res.status(200).json(cohorts);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.get('/api/cohorts/:id', async (req, res) => {
    try {
        const cohort = await db('cohorts')
            .where({ id: req.params.id })
            .first();
        if(!cohort) {
            res.status(404).json({ message: 'Cohort doesn\'t exist' });
        } else {
            res.status(200).json(cohort);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

server.get('/api/cohorts/:id/students', async (req, res) => {
    try {
        const students = await db('students')
            .where({ id: req.params.id })
            .first();
        if(!students) {
            res.status(404).json({ message: 'No students in that cohort' });
        } else {
            res.status(200).json(students);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

server.put('/api/cohorts/:id', async (req, res) => {
    try {
        const update = await db('cohorts')
            .where({ id: req.params.id })
            .update(req.body);

        if(update > 0) {
            const cohort = await db('cohorts')
                .where({ id: req.params.id })
                .first();

            res.status(200).json(cohort);
        } else {
            res.status(404).json({ message: 'Cohort not found' });
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

server.delete('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .del();

        if(count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Cohort not found' });
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`\n** API running on http://localhost:${port} **\n`);
});
