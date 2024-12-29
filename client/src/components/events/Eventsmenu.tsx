'use client';
import React, { useState } from 'react';
import { CreateSheetSide } from "./index"

const Eventsmenu: React.FC = () => {
    const [toggle, setToggle] = useState<boolean>(false);

    console.log(toggle)

    return (
        <div className="bg-white text-black font-bold flex flex-col gap-2 h-dvh sticky top-0">
            <div className="hover:text-blue-700 hover:bg-blue-100 h-[50px] flex justify-center items-center">
                Events
            </div>
            <div
                className="hover:text-blue-700 hover:bg-blue-100 h-[50px] flex justify-center items-center" onClick={() => setToggle((prev) => !prev)}
            >
                Create Event
            </div>
            {toggle && (
                <CreateSheetSide ontoggle={setToggle} toggle={toggle} />
            )}
        </div>
    );
};

export default Eventsmenu;
