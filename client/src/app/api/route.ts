import { NextResponse } from "next/server"


export const GET = async () => {
    try {
        return NextResponse.json({ message: "GET controller" }, {
            status: 200
        })
    } catch (error) {
        console.log(error, "Errors in GET controller")
        NextResponse.json({ message: "Internal server error" }, {
            status: 500
        })
    }
}