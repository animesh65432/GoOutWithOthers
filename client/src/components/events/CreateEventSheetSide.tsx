'use client';
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

type Props = {
    ontoggle: (state: boolean) => void; // Function to handle visibility toggle
    toggle: boolean
};

const CreateSheetSide: React.FC<Props> = ({ ontoggle, toggle }) => {
    console.log(toggle)

    return (
        <Sheet open={toggle} onOpenChange={ontoggle}>

            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" placeholder="Enter your name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" placeholder="Enter your username" className="col-span-3" />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <button
                            className="px-4 py-2 bg-blue-700 text-white rounded"

                        >
                            Save Changes
                        </button>
                    </SheetClose>
                    <SheetClose asChild>
                        <button
                            className="px-4 py-2 bg-gray-300 rounded"

                        >
                            Cancel
                        </button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default CreateSheetSide;
