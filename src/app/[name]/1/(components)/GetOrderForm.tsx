'use client';

import { useSessionStorage } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GetOrderForm() {
    const router = useRouter();
    const { name } = useParams();

    const [trackSession, setTrackSession] = useSessionStorage<string>({
        key: 'track',
    });

    const [zipcodeSession, setZipcodeSession] = useSessionStorage<string>({
        key: 'zipcode',
    });

    const [activeStepSession, setActiveStepSession] = useSessionStorage<number>({
        key: 'activeStep',
    });

    const [form, setForm] = useState({
        zipcode: '',
        track: ''
    });

    useEffect(() => {
        if (zipcodeSession && trackSession)
            setForm({
                zipcode: zipcodeSession,
                track: trackSession
            });
    }, [zipcodeSession, trackSession]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTrackSession(form.track);
        setZipcodeSession(form.zipcode);
        setActiveStepSession(2);

        router.push(`${name}/2?track=${form.track}`);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.currentTarget.name]: e.currentTarget.value.trim().toUpperCase()
        });
    }

    const handleReset = () => {
        setTrackSession('');
        setZipcodeSession('');
        setForm({
            zipcode: '',
            track: ''
        });
    }

    return (
        <form onReset={handleReset} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <label htmlFor="track" className="flex flex-col gap-1">
                Track
                <input value={form.track} onChange={handleChange} type="search" placeholder="0000 0000 0000 0000 0000" name="track" id="track" />
            </label>
            <label htmlFor="zipcode" className="flex flex-col gap-1">
                zipcode
                <input value={form.zipcode} onChange={handleChange} type="search" placeholder="1234 AB" name="zipcode" id="zipcode" />
            </label>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Submit</button>
            <button type="reset">reset</button>
        </form>
    )
}