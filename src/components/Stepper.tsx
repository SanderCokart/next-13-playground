'use client';
import { useParams, usePathname, useRouter } from 'next/navigation';
import c from 'classnames';
import { useSessionStorage } from '@mantine/hooks';

export default function Stepper() {
    const { name } = useParams();
    const pathname = usePathname();
    const router = useRouter();

    const [activeStep, setActiveStep] = useSessionStorage({
        key: 'activeStep',
        defaultValue: 1,
    });


    const steps: Step[] = [
        { id: 1, path: /(\w*)\/1/ },
        { id: 2, path: /(\w*)\/2/ },
        { id: 3, path: /(\w*)\/3/ },
    ];

    interface Step {
        id: number;
        path: RegExp;
    }


    const ChangeStep = (step: Step) => {
        setActiveStep(step.id);
        return router.push(`/${name}/${step.id}`);
    };

    return (
        <div className="flex gap-8 items-center">
            {steps.map(step => (
                <button onClick={() => ChangeStep(step)} key={step.id} className={c(
                    'w-8 h-8 bg-gray-500 rounded-full cursor-pointer',
                    step.path.test(pathname) && 'bg-green-500'
                )} />
            ))}
        </div>
    )
}
