import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { format } from 'date-fns';
import Image from 'next/image';

type props = {
    id: number
    name: string
    loacation: string
    time: Date
    photourl: string
    madeby: string
}

const Event: React.FC<props> = ({ name, loacation, time, photourl, madeby }) => {
    return (
        <>
            <Card >
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{loacation}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image src={photourl} width={500} height={500} alt='' />
                </CardContent>
                <CardFooter>
                    <p>{format(time, 'EEE, MMM d')}</p>
                    <p>{madeby}</p>
                </CardFooter>
            </Card>
        </>

    )
}

export default Event