import React from "react";
import PostCard from "../../entities/post/ui/PostCard";
import styles from './PostList.module.css'

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "Как приготовить суп",
    content:"Суп-пюре из кабачков с плавленным сыром – очень вкусный, простой и незатейливый в приготовлении кремовый суп, который придется по вкусу и детям, и взрослым.",
    author: 'Данилл Колбасенко',
    date: '03-05-2025'
  },
  {
    id: 2,
    title: "Как слетать на луну",
    content:"это сложная миссия, требующая сверхмощной ракеты (типа SLS NASA), трех-четырех дней полета, транслюнарной инъекции (выход из гравитации Земли), выхода на орбиту Луны и использования спускаемого аппарата для посадки.",
    author: 'Наталья Иброгимовна',
    date: '05-06-2025'
  },
  {
    id: 3,
    title: "Как телепортироваться",
    content:"Телепортация человека в физическом мире на данный момент невозможна и считается научной фантастикой, хотя квантовая телепортация фотонов уже осуществляется на практике.",
    author: 'Наталья Иброгимовна',
    date: '09-03-2025'
  },
  
];

const PostList: React.FC = () => {
    return (
        <div className={styles.container}>
            {MOCK_POSTS.map((post) => (
              <React.Fragment key={post.id}>
                <PostCard 
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                date={post.date}
                />
                </React.Fragment>
            ))}
        </div>

    );
}
export default PostList;