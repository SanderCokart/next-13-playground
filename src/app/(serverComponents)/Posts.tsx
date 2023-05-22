interface Post {
    id: number;
    title: string;
    body: string;
}

export default async function Posts() {
    const posts: Post[] = await new Promise((resolve) => {
        const data = fetch('https://jsonplaceholder.typicode.com/posts', {
            cache: 'no-cache'
        }).then(res => {
            return res.json();
        });

        setTimeout(() => {
            resolve(data);
        }, 3000);
    });

    return (
        <aside>
            <h2 className="capitalize text-center">posts</h2>
            <ul>
                {posts.map((post: any) => (
                    <li key={post.id} className="p-3">
                        <figure className="flex flex-col gap-2 bg-slate-700 p-3">
                            <h3 className="line-clamp-1">{post.title}</h3>
                            <figcaption className="line-clamp-2">{post.body}</figcaption>
                        </figure>
                    </li>
                ))}
            </ul>
        </aside>
    );
}