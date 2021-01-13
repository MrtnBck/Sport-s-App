//MODULES
const express   =   require("express");
const multer    =   require('multer');
//FILES
const routes    =   express.Router();
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
//INSTANCES
const uploadConfig  =   require("./config/upload");
const upload = multer(uploadConfig);

routes.get ("/status", (req, res) => {
    res.send({status: 200});
    
})

//Event
routes.get("/event/:eventId", EventController.getEventById); 
routes.post("/event", upload.single("thumbnail"), EventController.createEvent); //lementi a thumbnailt aztán az EventControllert meghívja


//User
routes.post("/user/register", UserController.createUser);
routes.get("/user/:user_id", UserController.getUserById );

module.exports = routes;