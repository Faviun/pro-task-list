import {useEffect, useState} from "react";

export const useData = () => {
    const [isLoad, setIsLoad] = useState(false);
    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState<any>();

    useEffect(() => {
        console.log('Component did mount');
    }, []);

    useEffect(() => {
        console.log('isLoad state did changed');
    }, [isLoad]);

    useEffect(() => {
        console.log('data state did changed');
    }, [data]);

    useEffect(() => {
        console.log('tasks state did changed');
    }, [tasks]);


    return {isLoad, setIsLoad, data, setData, tasks, setTasks}
}
