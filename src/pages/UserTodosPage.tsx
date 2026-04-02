import React from "react";
import { useParams } from "react-router-dom";
import UserTabs from "../widgets/UserTabs/UserTabs";
import styles from "./pages.module.css";
import { useGetTodosByUserIdQuery } from "../entities/todo/api/todosApi";
import { selectUserById } from "../entities/user/model/slice/userSlice";
import { useAppSelector } from "../app/providers/store";
import type { Todo } from "../entities/todo/model/types";
import { ItemList } from "../shared/ui/ItemList/ItemList";

const UserTodosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : 0;
  const { data: todos, isLoading, error } = useGetTodosByUserIdQuery(userId);

const user = useAppSelector(state => selectUserById(state, userId))

const renderTodoItem = (todo: Todo) => (
<div
              key={todo.id}
              className={`${styles.todoItem} ${
                todo.completed ? styles.completed : ""
              }`}
            >
              <input type="checkbox" checked={todo.completed} readOnly />
              <span className={styles.title}>{todo.title}</span>
            </div>
)

  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Загрузка...</div>
      </div>
    );
  if (error || !todos)
    return (
      <div className={styles.container}>
        <div className={styles.error}>Что то пошло не так</div>
      </div>
    );

  return (
    <>
      <UserTabs userId={id ? parseInt(id) : undefined} />
      <div className={styles.container}>
        <h1 className={styles.title}>Задачи пользователя: {user?.name}</h1>
        <div className={styles.todoList}>
          {<ItemList<Todo> 
          items={todos}
          renderItem={renderTodoItem}
          keyExtractor={(todo) => todo.id}
          />}
        </div>
      </div>
    </>
  );
};

export default UserTodosPage;
