import React from 'react';
import { SelectEvent } from "./index";
import { Eventsdata } from "@/assets";
import Event from "./Event";

const AlltheEvents: React.FC = () => {
    return (
        <div className="h-dvh flex flex-col">
            <div className="sticky top-0 z-10 bg-slate-50">
                <SelectEvent />
            </div>

            <div className="flex-1 overflow-y-auto">

                {Eventsdata.map((event, index) => (
                    <Event
                        key={index}
                        id={event.id}
                        name={event.name}
                        loacation={event.loacation}
                        time={event.time}
                        photourl={event.photourl}
                        madeby={event.madeby}
                    />
                ))}

            </div>
        </div>
    );
};

export default AlltheEvents;