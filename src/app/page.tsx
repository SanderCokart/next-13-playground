import Posts from '@/app/(serverComponents)/Posts';
import {Suspense} from 'react';
import Skeleton from 'react-loading-skeleton';
import Notes from '@/app/(clientComponents)/Notes';
import ClientSkeletonProvider from '@/providers/ClientSkeletonProvider';
import ServerSkeletonProvider from '@/providers/ServerSkeletonProvider';

const Home = () => {
    return (
        <main>
            <h1 className="capitalize text-center">home</h1>
            <div className="grid grid-cols-3 gap-4">
                <div>

                </div>
                <div>
                    <ClientSkeletonProvider>
                        <Notes/>
                    </ClientSkeletonProvider>
                </div>
                <div className="bg-slate-800 rounded">
                    <ServerSkeletonProvider>
                        <Suspense fallback={<Loading/>}>
                            {/* @ts-expect-error Async Server Component */}
                            <Posts/>
                        </Suspense>
                    </ServerSkeletonProvider>
                </div>
            </div>
        </main>
    );
};

const Loading = () => {
    return (
        <aside>
            <h2 className="capitalize text-center">Posts</h2>
            <ul>
                {[...Array(10)].map((post: any) => (
                    <li key={post} className="p-3">
                        <figure className="flex flex-col gap-2 bg-slate-700 p-3">
                            <Skeleton height={40}/>
                            <Skeleton count={2}/>
                        </figure>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Home;