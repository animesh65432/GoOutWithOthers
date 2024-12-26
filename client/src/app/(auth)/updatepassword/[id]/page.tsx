"use client"
import React from "react";
import { UpdatePassword } from "@/components";
import { useParams } from 'next/navigation'



const UpdatePasswordPage: React.FC = () => {
    const params = useParams()
    const id = params.id as string
    return (
        <>
            <UpdatePassword id={id} />
        </>
    );
};

export default UpdatePasswordPage;
