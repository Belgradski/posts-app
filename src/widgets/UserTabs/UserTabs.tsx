import {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserTabs.module.css'

interface UserTabsProps {
    userId?:number;
}

interface User {
    id: number;
    name: string;
}

const UserTabs: React.FC<UserTabsProps> = ({userId}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setUsers(data);
            }
            catch(error) {
                console.log('Ошибка загрузки пользователей', error)
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (isLoading) return <div className={styles.loader}>Загрузка пользователей...</div>;

    return (
        <div className={styles.tabsContainer}>
            <h3 className={styles.title}>Пользователи</h3>
            <div className={styles.userList}>
                {users.map((user) => (
                    <div key={user.id} className={styles.userGroup}>
                        <NavLink to={`/users/${user.id}/posts`}
                        className={({isActive}) => `${styles.userLink} ${isActive ? styles.active : ''}`}>
                            {user.name}
                        </NavLink>

                        {userId === user.id && (
                            <div className={styles.subTabs}>
                                <NavLink to={`/users/${user.id}/posts`}
                                className={({isActive}) => `${styles.subLink} ${isActive ? styles.active : ''}`}
                                >
                                    📝Посты
                                </NavLink>

                                <NavLink to={`/users/${user.id}/albums`}
                                className={({isActive}) => `${styles.subLink} ${isActive ? styles.active : ''}`}
                                >
                                   📸Альбомы
                                </NavLink>

                                <NavLink to={`/users/${user.id}/todos`}
                                className={({isActive}) => `${styles.subLink} ${isActive ? styles.active : ''}`}>
                                    ✅Задачи
                                </NavLink>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )

}

export default UserTabs;