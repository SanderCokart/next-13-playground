'use client';

import Stepper from "@/components/Stepper";
import { useSessionStorage } from "@mantine/hooks";
import { log } from "console";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const stepRoutes = [
    { stepId: 1, route: /^(.*)\/1/ },
    { stepId: 2, route: /^(.*)\/2/ },
    { stepId: 3, route: /^(.*)\/3/ },
]

export default function NameLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { name } = useParams();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);

    const [activeStep, setActiveStep] = useSessionStorage<number>({
        key: 'activeStep',
    });

    const [track, setTrack] = useSessionStorage({
        key: 'track',
    });
    const [zipcode, setZipcode] = useSessionStorage({
        key: 'zipcode',
    });



    // useEffect(() => {
    //     const route = stepRoutes.find(route => route.route.test(pathname));
    //     console.log(route);
    //     const initialStep = route?.stepId ?? 1;


    //     console.log('initialStep', initialStep);
    //     setActiveStep(initialStep);

    //     const params = new URLSearchParams(searchParams.toString());
    //     track && params.set('track', track);
    //     router.push(`${name}/${initialStep}?${params.toString()}`);

    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 1000);
    // }, []);

    // wait for session storage to be loaded
    // redirect to correct step and append track to url
    // set loading to false

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        track && newSearchParams.set('track', track);
        zipcode && newSearchParams.set('zipcode', zipcode);

        if (!loading) {
            //when there is a track in the searchParams but not in session storage
            //remove the track from the searchParams

            (newSearchParams.has('track') && !track) && newSearchParams.delete('track');
            (newSearchParams.has('zipcode') && !zipcode) && newSearchParams.delete('zipcode');

            //if there is no track or zipcode in the searchParams at this point go to step 1
            const determinedStep = !newSearchParams.has('track') || !newSearchParams.has('zipcode') ? 1 : activeStep;

            router.push(`/${name}/${determinedStep}?${newSearchParams.toString()}`);
        }


        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [loading, activeStep, track]);


    return (
        <div style={{ border: 'solid 1px white', padding: '8px' }}>
            {loading ? (
                <div className="w-full h-64 animate-pulse bg-slate-800"></div>
            ) : (
                <>
                    <Stepper />
                    {children}
                </>
            )}
        </div>
    )
}