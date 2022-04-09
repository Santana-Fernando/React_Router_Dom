import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Posts } from '../../Components/Posts';
import { CounterProvider } from '../../context/CounterProvider';
import { PostsProvider } from '../../context/PostsProvider';
import './styles.css'

function App() {

  return (
    <PostsProvider>
      <CounterProvider>
      <div>
        <Posts/>
      </div>
      </CounterProvider>
    </PostsProvider>
  )
}

export default App;

