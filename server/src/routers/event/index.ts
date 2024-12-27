import { Router } from "express"
import controllers from "../../controllers"
import middleware from "../../middleware"
import upload from "../../service/cloudinary"

const eventrouter = Router()


eventrouter.get("/Get", middleware, controllers.events.GetEvents)
    .post("/create", upload.single("photourl"), controllers.events.createevents)
    .put("/edit", middleware, upload.single("photourl"), controllers.events.editevents)
    .delete("/delete", middleware, controllers.events.deleteevent)
    .post("/join", middleware, controllers.events.joinevent)
    .delete("/leave", middleware, controllers.events.leaveevent)


export default eventrouter
