import { createuser, loginuser, forgetpassword, updatepassword } from "./users"
import { GetEvents, createevents, editevents, deleteevent, joinevent, leaveevent } from "./events"

const controllers = {
    user: { createuser, loginuser, forgetpassword, updatepassword },
    events: { GetEvents, createevents, editevents, deleteevent, joinevent, leaveevent }
}

export default controllers