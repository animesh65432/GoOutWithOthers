import db from "../../db";
import { Request, Response } from "express"
import handlerResponse from "../../handlerresponse";
import { StatusCodes } from "http-status-codes"
import cloudinary from "../../service/cloudinary";

const GetEvents = async (res: Response) => {
    try {

        const events = await db.events.findMany({
            include: {
                users: {
                    include: {
                        user: {
                            select: {
                                username: true
                            }
                        }
                    }
                }
            }
        })
        handlerResponse(res, StatusCodes.OK, "Events fecth sucessfully", true, events)
        return
    } catch (error) {
        console.log(error, "Errors in GetEvents controller")
        handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", false)
    }
}


const createevents = async (req: Request, res: Response) => {
    try {

        const { name, loacation, time } = req.body
        const photourl = req.file?.path;

        console.log(photourl)

        console.log(photourl)

        if (!photourl) {
            handlerResponse(res, StatusCodes.BAD_REQUEST, "File upload failed", false)
            return
        }


        const newevent = await db.events.create({
            data: {
                name,
                madebyId: req.user.id,
                photourl,
                loacation,
                time
            },
        });


        await db.eventsOnUsers.create({
            data: {
                eventId: newevent.id,
                userId: req.user.id,
            },
        });




        handlerResponse(res, StatusCodes.OK, "Event created successfully", true)
        return
    } catch (error) {
        console.log(error, "Errors in createevents controller")
        handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", false)
        return

    }
}

const editevents = async (req: Request, res: Response) => {
    try {
        const { name, eventId, location, time } = req.body;

        const photourl = req.file?.path

        const event = await db.events.findFirst({
            where: { id: eventId },
        });

        if (!event) {
            return handlerResponse(res, StatusCodes.BAD_REQUEST, "Event not found", false);
        }


        if (event.madebyId !== req.user.id) {
            return handlerResponse(res, StatusCodes.UNAUTHORIZED, "Unauthorized", false);
        }


        const updateData: any = {};
        if (photourl) updateData.photourl = photourl
        if (name) updateData.name = name;
        if (location) updateData.location = location;
        if (time) updateData.time = time;


        await db.events.update({
            where: {
                id: event.id,
            },
            data: updateData,
        });

        return handlerResponse(res, StatusCodes.OK, "Event updated successfully", true);
    } catch (error) {
        console.error("Error updating event:", error);
        return handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong", false);
    }
};


const deleteevent = async (req: Request, res: Response) => {
    try {

        const { eventId } = req.body


        const event = await db.events.findFirst({
            where: { id: eventId },
        });


        if (!event) {
            handlerResponse(res, StatusCodes.BAD_REQUEST, "Event not found", false);
            return
        }


        if (event.madebyId !== req.user.id) {
            handlerResponse(res, StatusCodes.UNAUTHORIZED, "Unauthorized", false);
            return
        }

        await db.events.delete({
            where: {
                id: event.id
            }
        })

        handlerResponse(res, StatusCodes.OK, "Event deleted successfully", true)
        return
    } catch (error) {
        console.log(error, "Errors in deleteevent controller")
        handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", false)

    }
}

const joinevent = async (req: Request, res: Response) => {
    try {

        const { eventId } = req.body

        const event = await db.events.findFirst({
            where: { id: eventId },
        })


        if (!event) {
            handlerResponse(res, StatusCodes.BAD_REQUEST, "Event not found", false);
            return
        }
        await db.eventsOnUsers.create({
            data: {
                userId: req.user.id,
                eventId
            }
        })

        handlerResponse(res, StatusCodes.OK, "Event joined successfully", true)
        return
    } catch (error) {

        console.log(error)
        handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", false)

    }
}

const leaveevent = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.body;


        const event = await db.events.findFirst({
            where: { id: eventId },
        });

        if (!event) {
            handlerResponse(res, StatusCodes.BAD_REQUEST, "Event not found", false);
            return;
        }


        await db.eventsOnUsers.delete({
            where: {
                userId_eventId: {
                    userId: req.user.id,
                    eventId: eventId,
                },
            },
        });


        handlerResponse(res, StatusCodes.OK, "Left the event successfully", true);
        return

    } catch (error) {
        console.error("Error leaving event:", error);
        handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong", false);
        return
    }
};

export { GetEvents, createevents, editevents, deleteevent, joinevent, leaveevent }