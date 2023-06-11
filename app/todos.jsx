import { TodoItem } from '@/components/ServerComponents';
import { cookies } from 'next/headers';

const fetchTodo = async (token) => {
    try {
        const res = await fetch(`${process.env.URL}/api/mytask`, {
            //Enabling SSR (Server Side Rendering)
            cache: "no-cache",
            headers: {
                cookie: `token=${token}`,
            },
        });

        const data = await res.json();

        if (!data) return [];

        return data.tasks;

    } catch (error) {
        return [];
    }
}

const Todos = async () => {
    const token = cookies().get("token")?.value;

    const tasks = await fetchTodo(token);

    return (
        <section className="todosContainer">
            {
                tasks?.map((item) => (
                    <TodoItem title={item.title} description={item.description} id={item._id} key={item._id} completed={item.isCompleted} />
                ))
            }
        </section>
    )
}

export default Todos;