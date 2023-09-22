// ================== GETS =================

const listUsers = `SELECT * FROM users`;
const listIncidence = `SELECT * FROM incidencias`;
const getIncidenceByUserEmail = `SELECT incidencia_id, users.user_id, TO_CHAR(time_start, 'YYYY-MM-DD HH24:MI') AS time_start, TO_CHAR(time_end, 'YYYY-MM-DD HH24:MI') AS time_end FROM incidencias INNER JOIN users ON incidencias.user_id = users.user_id WHERE users.user_email = $1`;

//  ==================== POST =======================

const queryCreateIncidence = `INSERT INTO incidencias (user_id, fault_location, failure, priority_level, user_email, time_start) VALUES ($1, $2, $3, $4, $5, TO_TIMESTAMP($6, 'YYYY-MM-DD HH24:MI')) RETURNING *`;
const queryCreateUser = `INSERT INTO users (name, user_email, images, token) VALUES ($1, $2, $3, $4)`;

// =================== PATCH ======================
const updateIncidencia = `UPDATE incidencias SET user_email = $1, time_start = $2::timestamp, time_end = $3::timestamp WHERE incidencia_id = $4`;

module.exports = {
listUsers,listIncidence, getIncidenceByUserEmail,queryCreateIncidence,queryCreateUser,updateIncidencia
};
