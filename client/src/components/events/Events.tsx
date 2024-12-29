import React from 'react'
import { AlltheEvents, Eventsmenu } from "../events"

const Events: React.FC = () => {
    return (
        <div className='h-dvh grid grid-cols-12 w-full'>
            <div className="md:col-span-2 hidden md:block"><Eventsmenu /></div>
            <div className='md:col-span-10 col-span-12 bg-slate-50'><AlltheEvents /></div>
        </div>
    )
}

export default Events