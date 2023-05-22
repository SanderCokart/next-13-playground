'use client';
import {FormProvider, useForm} from 'react-hook-form';
import {useSessionStorage, useHotkeys} from '@mantine/hooks';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import c from 'classnames';

export interface Note {
    id: string;
    title: string;
    content: string;
}

function FormError({ error }: { error: undefined | string }) {
    return (
        <span className={c(
            'text-red-500',
            { ['opacity-0 select-none']: error === undefined }
        )}>
            {error ?? 'No errors detected'}
        </span>
    );
}

export default function CreateNoteForm() {
    const createNoteForm = useForm<Note>({
            defaultValues: {
                id:      '',
                title:   '',
                content: ''
            },
            resolver:      yupResolver(yup.object({
                title:   yup.string()
                             .required('Title is required')
                             .max(50, 'Title must be 50 characters or less'),
                content: yup.string()
                             .required('Content is required')
                             .max(500, 'Content must be 500 characters or less')
            }))
        }),
        { handleSubmit, register, setFocus, reset, formState: { errors } } = createNoteForm,

        [notes, setNotes] = useSessionStorage<Note[]>({
            key:          'notes',
            defaultValue: []
        }),

        onSubmitCreateNote = handleSubmit(async (note) => {
            note.id = Date.now().toString();
            setNotes([...notes, note]);
            setFocus('title');
            reset();
        });

    useHotkeys([['ctrl+Enter', () => onSubmitCreateNote()]], [], true);

    return (
        <FormProvider {...createNoteForm}>
            <form noValidate onSubmit={onSubmitCreateNote}>
                <div className="grid gap-2">
                    <div className="flex flex-col gap-2">
                        <label className="sr-only" htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            className="p-3 rounded"
                            placeholder="Title"
                            required
                            {...register('title')}/>
                        <FormError error={errors.title?.message}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="sr-only" htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            className="p-3 rounded"
                            placeholder="Content"
                            required
                            {...register('content')}/>
                        <FormError error={errors.content?.message}/>
                    </div>

                    <button
                        type="submit"
                        className="p-3 justify-self-start rounded bg-slate-700">
                        Create Note
                    </button>
                </div>


            </form>
        </FormProvider>
    );
}