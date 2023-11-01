// ================== GETS =================

const listUsers = `SELECT * FROM users`;
const listIncidence = `SELECT * FROM incidencias`;
const listIncidenceDaily = `SELECT * FROM daily`;
const getIncidenceByUserEmail = `SELECT incidencia_id, users.user_id, TO_CHAR(time_start, 'YYYY-MM-DD HH24:MI') AS time_start, TO_CHAR(time_end, 'YYYY-MM-DD HH24:MI') AS time_end FROM incidencias INNER JOIN users ON incidencias.user_id = users.user_id WHERE users.user_email = $1`;
const getAllUsersByEmail = `SELECT * FROM users WHERE user_email = $1 `;
const getAllIncidenceDailyByEmail = `SELECT * FROM daily WHERE user_email = $1`;
const getAnalystsByEmail = `SELECT EXISTS (SELECT 1 FROM analysts WHERE user_email = 'correo_electronico_a_buscar') AS email_exists`;
const getSearchUserByEmail = `SELECT EXISTS (SELECT 1 FROM users WHERE user_email = $1) AS email_exists RETURNING *`;

const querySearchIncidenciasUserId = `SELECT * FROM incidencias WHERE user_id = $1`;
const querySearchDailyUserId = `SELECT * FROM daily WHERE user_id = $1`;




//  ==================== POST =======================

const queryCreateIncidence = `INSERT INTO incidencias (user_id, fault_location, failure, priority_level, user_email, name , description ,time_start) VALUES ($1, $2, $3, $4, $5, $6, $7, TO_TIMESTAMP($8, 'YYYY-MM-DD HH24:MI')) RETURNING *`;

const queryCreateIncidenceDaily = `INSERT INTO daily (user_id, failure_daily , location_daily , description_daily, downtime, name, user_email, time_start) VALUES ($1, $2, $3, $4, $5, $6, $7, TO_TIMESTAMP($8, 'YYYY-MM-DD HH24:MI')) RETURNING *`;

const queryCreateUser = `INSERT INTO users (name, user_email, images, token) VALUES ($1, $2, $3, $4) RETURNING *`;

// =================== PATCH ======================
const updateIncidencia = `UPDATE incidencias SET user_email = $1, time_start = $2::timestamp, time_end = $3::timestamp WHERE incidencia_id = $4`;
const queryUpdateUserId = `UPDATE users SET token = $1 WHERE user_id = $2 RETURNING *`;
const queryUpdateImagesUserId = `UPDATE users SET images = $1 WHERE user_id = $2 RETURNING *`;

// =================== DELETE ======================

const queryDeleteIncidenceId = `DELETE FROM incidencias WHERE incidencia_id = $1 RETURNING *`;
const queryDeleteUserId = `DELETE FROM users WHERE user_id = $1 RETURNING *`;
const queryDeleteDailyId = `DELETE FROM daily WHERE user_id = $1 RETURNING *`;


module.exports = {
    listUsers, listIncidence, queryUpdateUserId, getIncidenceByUserEmail, queryCreateIncidence, queryCreateUser, updateIncidencia, getAllUsersByEmail,
    queryDeleteIncidenceId, queryCreateIncidenceDaily, 
    listIncidenceDaily, getAllIncidenceDailyByEmail, getAnalystsByEmail,
    querySearchDailyUserId, queryDeleteUserId, queryDeleteDailyId, querySearchIncidenciasUserId, queryUpdateImagesUserId, getSearchUserByEmail
};
