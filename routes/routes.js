const express = require("express")
const router = express.Router();
const middleware = require("../middleware/middleware")


const {
allDataUsers, allDataIncidence, dataFromUserEmail, createIncidence, createUser, searchUserEmail,
 deleteIncidenceId, createIncidenceDaily, allDataIncidenceDaily,
  searchIncidenceDailyEmail, searchAnalystsEmail, deleteUserId, deleteDailyId, updateUserId, searchIncidenciasUserId, searchDailyUserId, UpdateImagesUserId, searchUserByEmail

} = require("../controllers/controllers")
 

//Routes USERS
router.get("/users", allDataUsers);
router.get("/users/:email",searchUserEmail);
router.get("/users/exist/:email",searchUserByEmail);
router.post("/users" , createUser);
router.delete('/users/delete/:id', deleteUserId);
router.patch('/users/update/:id', updateUserId);
router.patch('/users/updateImages/:id', UpdateImagesUserId);




//Routes INCIDENCE
router.get('/incidence/user/:id', searchIncidenciasUserId);
router.get("/incidence" , allDataIncidence);
router.get("/incidence/:email", dataFromUserEmail);
router.post("/incidence/", createIncidence);
router.delete('/incidence/delete/:id', deleteIncidenceId);

//Routes INCIDENCE DAILY
router.get('/incidenceDaily/user/:id', searchDailyUserId);
router.get("/incidenceDaily" , allDataIncidenceDaily);
router.get("/incidenceDaily/:email", searchIncidenceDailyEmail);
router.post("/incidenceDaily/", createIncidenceDaily);
router.delete('/incidenceDaily/delete/:id', deleteDailyId);


//Routes ANALYSTS
router.get("/analysts/:email",searchAnalystsEmail);








module.exports = router;