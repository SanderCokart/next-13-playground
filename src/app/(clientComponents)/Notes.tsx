'use client';
import CreateNoteForm, {Note} from '@/app/(clientComponents)/CreateNoteForm';
import {useSessionStorage} from '@mantine/hooks';
import Skeleton from 'react-loading-skeleton';
import useStallLoading from '@/hooks/useStallLoading';

export default function Notes() {
    const loaded = useStallLoading(2000);
    const [notes] = useSessionStorage<Note[]>({
        key:                     'notes',
        defaultValue:            [],
        getInitialValueInEffect: true
    });

    return (
        <main>
            <h2 className="capitalize text-center">notes</h2>
            <CreateNoteForm/>

            <ul className="my-4 grid gap-2">
                {(loaded && notes.length) && notes.map((note) => (
                    <li key={note.id} className="">
                        <figure className="flex flex-col gap-2 bg-slate-700 p-3">
                            <h3 className="capitalize">{note.title}</h3>
                            <p>{note.content}</p>
                        </figure>
                    </li>
                ))}

                {(loaded && !notes.length) && (
                    <li>
                        <figure className="flex flex-col gap-2 bg-slate-700 p-3">
                            <h3 className="capitalize">No notes stored</h3>
                        </figure>
                    </li>
                )}

                {(!loaded) && [...Array(3)].map((key, index) => (
                    <li key={index}>
                        <figure className="flex flex-col gap-2 bg-slate-700 p-3">
                            <Skeleton height={40}/>
                            <Skeleton count={3}/>
                        </figure>
                    </li>
                ))}
            </ul>
        </main>
    );
}