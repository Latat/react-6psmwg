import React, { useMemo, useState } from 'react';
import './style.css';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import './styles/App.css';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/myModal/MyModal';
import { usePosts } from './components/hooks/usePosts';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JS', body: 'programming language' },
    { id: 2, title: 'HTML', body: 'markup language' },
    { id: 3, title: 'SVG', body: 'vector graph language' },
    { id: 4, title: 'CSS', body: 'styles language' },
  ]);

  //const [selectedSort, setSelectedSort] = useState('')
  //const [searchQuery, setSearchQuery] = useState('')

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    //callback - функция обратного вызова (передаём её в компонент в свойствах и вызываем оттуда)
    setPosts([...posts, newPost]);
    setModal(false);
  };

  async function fetchPosts() {
    console.log('!');
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    console.log(response.data);
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <button onClick={fetchPosts}>Get posts</button>
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Posts list 1"
      />
    </div>
  );
}

export default App;
