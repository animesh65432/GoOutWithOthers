"use client"
import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Eventsdata } from "../../assets";
import { GroupingforSelectEvents, GroupingforSelectTime } from "@/utils";
import { DateSelector } from "./index"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CreateSheetSide } from "./index"

const SelectEvent: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
    const [selectedTime, setSelectedTime] = useState<string | undefined>();
    const [toggle, setToggle] = useState<boolean>(false);
    const uniqueLocations = GroupingforSelectEvents(Eventsdata);
    const uniqueTimes = GroupingforSelectTime(Eventsdata);
    console.log(uniqueTimes[0], "it's the time")


    return (
        <div className='h-[40%] sticky top-0 '>
            <div className="flex md:gap-0 gap-4">
                <Input placeholder="Search" className="w-[70%] bg-white text-black h-[40px]" />
                <Button className='w-[20%] h-[40px] md:hidden bg-blue-700 hover:bg-blue-800' onClick={() => setToggle((prev) => !prev)}>Create Button</Button>
            </div>
            <div className='flex gap-9 mt-[30px]'>

                <div className='ml-[30px]'>
                    <Select onValueChange={setSelectedLocation}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                            {uniqueLocations.map((event, index) => (
                                <SelectItem key={index} value={event}>{event}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                </div>


                <div>
                    <DateSelector />
                </div>
            </div>
            {
                toggle && <>
                    <CreateSheetSide toggle ontoggle={setToggle} />
                </>
            }
        </div>
    );
};

export default SelectEvent;
