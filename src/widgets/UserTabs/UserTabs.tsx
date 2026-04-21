import { useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserTabs.module.css'
import { useAppDispatch, useAppSelector } from '../../app/providers/store';
import { useGetUsersQuery } from '../../entities/user/api/usersApi';
import { addUsers, selectAllUsers, setSelectedUserId } from '../../entities/user/model/slice/userSlice';

interface UserTabsProps {
    userId?:number;
}


const UserTabs: React.FC<UserTabsProps> = ({userId }) => {
    const dispatch = useAppDispatch();

    const { data: usersFromApi, isLoading} = useGetUsersQuery();

    const users = useAppSelector(selectAllUsers);
    useEffect(() => {
     if (usersFromApi) {
        dispatch(addUsers(usersFromApi))
     }
    }, [usersFromApi, dispatch]);

    useEffect(() => {
        if (userId !== undefined) {
            dispatch(setSelectedUserId(userId))
        }
    }, [userId, dispatch])

    if (isLoading) return <div className={styles.tabsContainer}>
        <div className={styles.skeletonTitle} />
        <div className={styles.userList}>
            {[...Array(7)].map((_, index) => (
                <div key={index} className={styles.userGroup}>
                    <div className={styles.skeletonUserLink} />
                </div>
            ))}
        </div>
    </div>;

    return (
        <div className={styles.tabsContainer}>
            <h3 className={styles.title}>Пользователи:</h3>
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