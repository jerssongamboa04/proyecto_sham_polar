const express = require("express")
const router = express.Router();
const middleware = require("../middleware/middleware")


const {
allDataUsers, allDataIncidence, dataFromUserEmail, createIncidence, createUser

} = require("../controllers/controllers")
 

//Routes USERS
router.get("/users", allDataUsers);
router.post("/users" , createUser);

//Routes INCIDENCE
router.get("/incidence" , allDataIncidence);
router.get("/incidence/:email", dataFromUserEmail);
router.post("/incidence/", createIncidence);


module.exports = router;