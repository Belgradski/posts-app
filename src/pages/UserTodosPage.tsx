import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";
import UserTabs from "../widgets/UserTabs/UserTabs";
import styles from "./pages.module.css"

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const UserTodosPage: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [todos, setTodos] = useState<Todo[]>([])
    const[isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`);
                if (!response.ok) throw new Error('Ошибка загрузки');
                const data = await response.json();
                setTodos(data)
            } 
            catch(err) {
                setError(err instanceof Error ? err.message : "Неизвестная ошибка")
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchTodos()
    },[id])

    if (isLoading) return <div className={styles.loader}>Загрузка...</div>;
    if (error) return <div className={styles.error}>Что то пошло не так: {error}</div>

    return (
        <MainLayout>
            <UserTabs userId={id ? parseInt(id) : undefined}/>
            <div className={styles.container}>
                <h1 className={styles.title}>Задачи пользователя: {id}</h1>
                <div className={styles.todoList}>
                    {todos.map((todo) => (
                        <div key={todo.id}
                        className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
                            <input 
                            type="checkbox"
                            checked={todo.completed}
                            readOnly
                            />
                            <span className={styles.title}>{todo.title}</span>

                        </div>
                    ))}

                </div>

            </div>
        </MainLayout>
    )

}

export default UserTodosPage;