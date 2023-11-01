

// importacion de querys
const { listUsers, listIncidence, getIncidenceByUserEmail, queryCreateIncidence, queryCreateUser,
    updateIncidencia, getAllUsersByEmail, queryDeleteIncidenceId, queryCreateIncidenceDaily, listIncidenceDaily, getAllIncidenceDailyByEmail
    , getAnalystsByEmail, queryDeleteUserId, queryDeleteDailyId, queryUpdateUserId, querySearchIncidenciasUserId, querySearchDailyUserId, queryUpdateImagesUserId } = require("../query");



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
    const { user_id, fault_location, failure, priority_level, user_email, name, description, time_start } = req.body;
    const values = [
        user_id,
        fault_location,
        failure,
        priority_level,
        user_email,
        name,
        description,
        time_start
    ];


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

// ============== List User by Email ===============
const searchUserEmail = async (req, res) => {
    const client = await pool.connect();
    const user_email = req.params.email;
    const values = [user_email];

    try {
        const response = await client.query(getAllUsersByEmail, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
};

// ============ Delete INCIDENCE for ID================

const deleteIncidenceId = async (req, res) => {
    const client = await pool.connect();
    const incidencia_id = req.params.id;
    const values = [incidencia_id];

    try {
        const response = await client.query(queryDeleteIncidenceId, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
}

// ============== List all the Incidencias ===============
const allDataIncidenceDaily = async (req, res) => {
    const client = await pool.connect();

    try {
        const response = await client.query(listIncidenceDaily);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
}

//================== Create Incidence Daily ===================

const createIncidenceDaily = async (req, res) => {
    const client = await pool.connect();
    const { user_id, failure_daily, location_daily, description_daily, downtime, name, user_email, time_start } = req.body;
    const values = [
        user_id,
        failure_daily,
        location_daily,
        description_daily,
        downtime,
        name,
        user_email,
        time_start
    ];


    try {
        const response = await client.query(queryCreateIncidenceDaily, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
}

// ============== List INCIDENCE DAILY by Email ===============
const searchIncidenceDailyEmail = async (req, res) => {
    const client = await pool.connect();
    const user_email = req.params.email;
    const values = [user_email];

    try {
        const response = await client.query(getAllIncidenceDailyByEmail, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
};

// ============== List Analysts by Email ===============

const searchAnalystsEmail = async (req, res) => {
    const client = await pool.connect();
    const user_email = req.params.email;
    const values = [user_email];

    try {
        // Realizamos la consulta SQL con EXISTS
        const query = `
            SELECT EXISTS (
                SELECT 1
                FROM analysts
                WHERE user_email = $1
            ) AS email_exists;
        `;

        const response = await client.query(query, values);

        // Verificamos el resultado y devolvemos true o false
        const emailExists = response.rows[0].email_exists;
        res.status(200).json({ response: true, email_exists: emailExists });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
};

// ============ DELETE USER for ID================

const deleteUserId = async (req, res) => {
    const client = await pool.connect();
    const user_id = req.params.id;
    const values = [user_id];

    try {
        const response = await client.query(queryDeleteUserId, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
}


// ============ DELETE DAILY for ID================


const deleteDailyId = async (req, res) => {
    const client = await pool.connect();
    const user_id = req.params.id;
    const values = [user_id];

    try {
        const response = await client.query(queryDeleteDailyId, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
}

// ============ UPDATE USER for ID================

const updateUserId = async (req, res) => {
    const client = await pool.connect();
    const user_id = req.params.id;
    const { token } = req.body;
    const values = [token, user_id];

    try {
        const response = await client.query(queryUpdateUserId, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }

}

// ============ Search a INCIDENCE for User ID ================

const searchIncidenciasUserId = async (req, res) => {
    const client = await pool.connect();
    const user_id = req.params.id;
    const values = [user_id];
    
    try {
        const response = await client.query(querySearchIncidenciasUserId, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
    
    }

    // ============ Search a DAILY for User ID ================

const searchDailyUserId = async (req, res) => {
    const client = await pool.connect();
    const user_id = req.params.id;
    const values = [user_id];
    
    try {
        const response = await client.query(querySearchDailyUserId, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
    
    }

    
// ============ UPDATE IMAGES USER for ID================

const UpdateImagesUserId = async (req, res) => {
    const client = await pool.connect();
    const user_id = req.params.id;
    const { images } = req.body;
    const values = [images, user_id];

    try {
        const response = await client.query(queryUpdateImagesUserId, values);
        res.status(200).json({ response: true, result: response.rows });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }

}

// ============== List Analysts by Email ===============

const searchUserByEmail = async (req, res) => {
    const client = await pool.connect();
    const user_email = req.params.email;
    const values = [user_email];

    try {
        // Realizamos la consulta SQL con EXISTS
        const query = `
            SELECT EXISTS (
                SELECT 1
                FROM users
                WHERE user_email = $1
            ) AS email_exists;
        `;

        const response = await client.query(query, values);

        // Verificamos el resultado y devolvemos true o false
        const emailExists = response.rows[0].email_exists;
        res.status(200).json({ response: true, email_exists: emailExists });
    } catch (error) {
        res.status(400).json({ response: false, error: error.message });
    } finally {
        client.release(true);
    }
};

module.exports = {
    allDataUsers, allDataIncidence, dataFromUserEmail, createIncidence,
    createUser, searchUserEmail, deleteIncidenceId, createIncidenceDaily,
    allDataIncidenceDaily, searchIncidenceDailyEmail, searchAnalystsEmail,
    deleteUserId, deleteDailyId, updateUserId, searchIncidenciasUserId, searchDailyUserId, UpdateImagesUserId, searchUserByEmail
};
