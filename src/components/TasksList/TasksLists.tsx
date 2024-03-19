import {useEffect} from "react";
import {useGetTasksMutation} from "../../features/auth/authApiSlice";
import {useData} from "../../pages/TaskListPage/hooks/useData";

export default function TasksLists() {
    const {setTasks, tasks} = useData();

    const [getTasks, {isLoading}] = useGetTasksMutation();
    useEffect(() => {
        const fetchData = async () => {
            const result = await getTasks('PENDING');
            setTasks(result)
        }
        fetchData();
    }, []);
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {tasks?.data?.content.map((task: Task) => {
                const {id, title, status, createdAt} = task;
                return <li key={id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-md font-semibold leading-6 text-gray-900">{title}</p>
                            <p className="text-sm leading-6 text-gray-900">{status}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        {createdAt}
                    </div>
                </li>
            })}
        </ul>
    )
}

export type Task = {
    id: number;
    title: string;
    status: string;
    createdAt: string;
}