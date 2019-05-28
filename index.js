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
        const message = errors[error.errno] || 'There is an error somewhere';
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

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`\n** API running on http://localhost:${port} **\n`);
});
