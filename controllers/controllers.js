

// importacion de querys
const { listUsers, listIncidence, getIncidenceByUserEmail, queryCreateIncidence, queryCreateUser, updateIncidencia
} = require("../query");



const Pool = require("pg").Pool;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
})

// ============== List all the Users ===============
const allDataUsers = async (req, res) => {
    const client = await pool.connect();

    try {
        const response = await client.query(listUsers);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
}

// ============== List all the Incidencias ===============
const allDataIncidence = async (req, res) => {
    const client = await pool.connect();

    try {
        const response = await client.query(listIncidence);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
}

// ============== List all incidence by Email ===============

const dataFromUserEmail = async (req, res) => {
    const client = await pool.connect();
    const requiredEmail = req.params.email;

    try {
        const response = await client.query(getIncidenceByUserEmail, [
            requiredEmail,
        ]);
        if (response.rows.length === 0) {
            res.status(200).json({
                response: true,
                message: "Este usuario no tiene incidencias",
            });
        } else {
            res.status(200).json({ response: true, result: response.rows });
        }
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
};

//================== Create Incidence ===================

const createIncidence = async (req, res) => {
    const client = await pool.connect();
    const { user_id, fault_location, failure, priority_level, user_email, time_start } = req.body;
    const values = [user_id, fault_location, failure, priority_level, user_email, time_start];


    try {
        const response = await client.query(queryCreateIncidence, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
}

//================== Create User ===================

const createUser = async (req, res) => {
    const client = await pool.connect();
    const { name, user_email, images, token } = req.body;

    const values = [name, user_email, images, token];
    try {
        const response = await client.query(queryCreateUser, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
}


module.exports = { allDataUsers, allDataIncidence, dataFromUserEmail, createIncidence, createUser };
