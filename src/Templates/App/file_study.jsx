//-------------------------------------------------------- Padrão Compound Components e React.Children + React.cloneElement --------------------------------------------------------------
/*
import React,{ Suspense, useState } from "react"
//import Lazy from "./lazy_component"

const loadComponent = () =>  import("./lazy_component")
const Lazy = React.lazy(loadComponent);

function App() {
  const [show, setShow] = useState(false)
  return (
    <div>
      <Suspense fallback={<p>Carregando...</p>}>
        {show && <Lazy />}
      </Suspense>
      <p>
        <button  onClick={() => setShow((s) => !s)}>Show {show ? 'On' : 'Of'}</button>
      </p>
    </div>
  )
}

export default App
*/

//-------------------------------------------------------- Padrão Compound Components e React.Children + React.cloneElement --------------------------------------------------------------
/*
import React,{ Children, cloneElement, useEffect, useState } from "react"

const s = {
  style: {
    fontSize: '60px'
  }
}

const TurnOnOff = ({children}) => {
  const [isOn, setIsOn] = useState(false)
  const onTurn = () => setIsOn(s => !s)

  return Children.map(children, (child) => {
    const newChild = cloneElement(child, {
      isOn,
      onTurn 
    })

    return newChild
  })
}

const TurnedOn = ({ isOn, children}) => isOn ? children : null
const TurnedOff = ({ isOn, children}) => isOn ? null : children

const TurnButton = ({ isOn, onTurn, ...props }) => {
  return <button onClick={onTurn} {...props}>Turn {isOn ? 'OFF' : 'ON' }</button>
}

const P = ({ children }) => <p { ...s}>{children}</p>

function App() {
  return (
    <TurnOnOff>
      <TurnedOn>
        <P>On</P>
      </TurnedOn>
      <TurnedOff>
        <P>Off</P>
      </TurnedOff>
      <TurnButton />
    </TurnOnOff>
  )
}

export default App
*/
//-------------------------------------------------------- ErrorBoundary--------------------------------------------------------------
/*
import React,{ useEffect, useState } from "react"

const s = {
  style: {
    fontSize: '60px'
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você também pode registrar o erro em um serviço de relatórios de erro
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI alternativa
      return <h1>Deu um palzinho.</h1>;
    }

    return this.props.children; 
  }
}

const ItWillThrowError = () => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if(counter > 3) {
      throw new Error('Que chato!!')
    }
  }, [counter])

  return (
    <div>
      <button {...s} onClick={() => setCounter((s) => s + 1)}>
        Increment {counter}
      </button>
    </div>
  )
}

function App() {
  return (
    <div>
      <ErrorBoundary>
        <ItWillThrowError />
      </ErrorBoundary>
    </div>
  )
}

export default App

*/
//-------------------------------------------------------- outher new hook --------------------------------------------------------------
/*
import { useDebugValue, useEffect, useState } from "react";

const useMediaQuery = (queryValue, initialValue = false) => {
  const [match, setMatch] = useState(initialValue)

  useDebugValue('tamanho ' + queryValue, (name) => {
    return name  + ' modificado'
  })

  useEffect(() => {
    let isMounted = true
    const matchMedia = window.matchMedia(queryValue)

    const handleChange = () => {
      if (!isMounted) return;
      setMatch(!!matchMedia.matches)
    }

    matchMedia.addEventListener('change', handleChange);
    setMatch(!!matchMedia.matches)

    return () => {
      isMounted = false;
      matchMedia.removeEventListener('change', handleChange);
    }
  }, [queryValue])

  return match
  
}

export default function App() {
  const huge = useMediaQuery('(min-width: 980px)')
  const big = useMediaQuery('(max-width: 979px) and (min-width: 768px)')
  const medium = useMediaQuery('(max-width: 767px) and (min-width: 322px)')
  const small = useMediaQuery('(max-width: 321px)')


  let background = huge ? 'green' : big ? 'yellow' : medium ? 'gray' : small ? 'red' : null

  return (
    <div style={{background: background}}>
      <h1>oi</h1>
    </div>
  )
}
*/

//-------------------------------------------------------- UseLayoutEffect --------------------------------------------------------------
/*
import { useCallback, useEffect, useState, useRef, useLayoutEffect, forwardRef, useImperativeHandle } from "react";

export const DisplayCounted = forwardRef(function DisplayCounted({counted}, ref) {
  const [rand, setRand] = useState('0.24')
  const divRef = useRef();

  const handleClick = () => {
    setRand(Math.random().toFixed(2))
  }

  useImperativeHandle(ref, () => ({
    handleClick,
    divRef: divRef.current
  }))

  return (
    <div ref={divRef} style={{ height: '200px', width: '200px', overflowY: 'scroll' }}>
      {counted.map(p => {
        return (
          <p onClick={handleClick} key={p}>{p} +++ {rand}</p>
        )
      })}
    </div>
  )
})

function App() {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4])
  const divRef = useRef();

  useLayoutEffect(() => {
    const now = Date.now()
    while (Date.now() < now + 500);
    divRef.current.divRef.scrollTop = divRef.current.divRef.scrollHeight
  })

  const handleClick = () => {
    setCounted((c) => [...c, +c.slice(-1) + 1])
    divRef.current.handleClick()
    console.log(divRef.current)
  }

  return (
    <div> 
      <button onClick={handleClick}>Count {counted.slice(-1)}</button>
      <DisplayCounted counted={counted} ref={divRef} />
    </div>
  )
}

export default App;
*/

//-------------------------------------------------------- UseLayoutEffect --------------------------------------------------------------
/*
import { useCallback, useEffect, useState, useRef, useLayoutEffect } from "react";

function App() {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4])
  const divRef = useRef();

  useLayoutEffect(() => {
    const now = Date.now()
    while (Date.now() < now + 500);
    divRef.current.scrollTop = divRef.current.scrollHeight
  })

  const handleClick = () => {
    setCounted((c) => [...c, +c.slice(-1) + 1])
  }

  return (
    <div> 
      <button onClick={handleClick}>Count {counted.slice(-1)}</button>
      <div ref={divRef} style={{ height: '200px', width: '200px', overflowY: 'scroll' }}>
        {counted.map(p => {
          return (
            <p key={p}>{p}</p>
          )
        })}
      </div>
    </div>
  )
}

export default App;
*/

//-------------------------------------------------------- useAsync --------------------------------------------------------------
/*
import { useCallback, useEffect, useState } from "react";

const useAsync = (asyncFunction, shouldRun) => {
  const [state, setState] = useState({
    result: null,
    error: null,
    status: 'idle'
  })
  

  const run = useCallback(async () => {
    setState({
      result: null,
      error: null,
      status: 'idle'
    })

    await new Promise((r) => setTimeout(r, 2000))
    setState({
      result: null,
      error: null,
      status: 'pending'
    })

    return asyncFunction()
      .then(response => {
        setState({
          result: response,
          error: null,
          status: 'settled'
        })
      })
      .catch(err => {
        setState({
          result: null,
          error: err,
          status: 'error'
        })
      })
  }, [asyncFunction])

  useEffect(() => {
    if(shouldRun) {
      run()
    }
  }, [run, shouldRun])


  return [run, state.result, state.error, state.status ]
}

const fetchData = async () => {
  //throw new Error('Que chato')
  await new Promise((r) => setTimeout(r, 2000))
  const data = await fetch('https://jsonplaceholder.typicode.com/posts/')
  const json = await data.json()
  return json
}

function App() {
  const [reFetchData, result, error, status] = useAsync(fetchData, true)

  function handleClick() {
    reFetchData()
  }

  // useEffect(() => {
  //   reFetchData()
  // }, [reFetchData])

  if(status === 'idle') {
    return (
      <div>
        <h1>Nada executando</h1>
      </div>
    )
  } else if(status === 'pending') {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  } else if(status === 'settled') {
    return (
      <div>
        <pre onClick={() => handleClick()}>{JSON.stringify(result, null, 2)}</pre>
      </div>
    )

  } else {
    return (
      <div>
        <h1>{<pre>{JSON.stringify(error.message, null, 2)}</pre>}</h1>
      </div>
    )
  }

}

export default App;

*/

//-------------------------------------------------------- criando o meu segundo hook --------------------------------------------------------------
/*
import React, { useEffect, useState, useRef } from 'react'

const isEqualsObjects = (objA, objB) => {
  return JSON.stringify(objA) == JSON.stringify(objB)
}

const useFetch = (url, options) => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const urlRef = useRef(url)
  const optionsRef = useRef(options)

  useEffect(() => {
    let changed = false

    if(!isEqualsObjects(url, urlRef.current)) {
      urlRef.current = url
      changed = true
    }

    if(!isEqualsObjects(options, optionsRef.current)) {
      optionsRef.current = options
      changed = true
    }

    if(changed) {
      setShouldLoad(s => !s)
    }
  }, [url, options])


  useEffect(() => {
    let wait = false
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true)

    const fetchData = async () => {

      //await new Promise(r => setTimeout(r, 3000))

      try {
        await fetch(urlRef.current, { signal, ...optionsRef.current })
        .then(response => response.json())
        .then(json => {
          if(!wait) {
            setResult(json)
            setLoading(false)
          }
        })
        
      } catch (error) {
        setLoading(false)
        console.warn(error.message) 
      }
    }

    fetchData()
    return () => {
      wait = true
      controller.abort()
    }
  }, [shouldLoad])

  return [result, loading]
}

function App() {
  const [postId, setPostId] = useState('')
  const [result, loading] = useFetch('https://jsonplaceholder.typicode.com/todos/' + postId, {
    headers: {
      abc: 2
    }
  });

  const handleClick = (id) => {
    setPostId(id)
  }  
  
  if(loading) return <p>Loading...</p>
  if(!loading && result) {
    console.log("Mostrando result ", result) 
    if(result.id) return <div onClick={() => handleClick("")}><p key={result.id} onClick={() => handleClick(result.id)}>{result.title}</p></div>

    return <div>{result.map(r => <p key={r.id} onClick={() => handleClick(r.id)}>{r.title}</p>)}</div>
  }

  return (
    <div>
      <h1>Oi</h1>
    </div>

  )
}

export default App;

*/

//-------------------------------------------------------- context + UseReducer --------------------------------------------------------------
/*
import React from 'react'
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

*/
//-------------------------------------------------------- criando o meu próprio Hook --------------------------------------------------------------
/*
import React, { useEffect, useRef, useState } from 'react'

const useTime = (cb, delay = 1000) => {
  const saveCb = useRef();

  useEffect(() => {
    saveCb.current = cb;
  }, [cb])

  useEffect(() => {
    const interval = setInterval(() => {
      saveCb.current(); //setCounter((c) => c + 1)
    }, delay)

    return () => clearInterval(interval)
  }, [delay])
}

function App() {
  const [counter, setCounter] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [incrementor, setIncrementor] = useState(0);


  useTime(() => setCounter((c) => c + 1), delay)

  return (
    <div>
      <h1>contador {counter}</h1>
      <h1>Delay: {delay}</h1>
      <button onClick={() => {
        setDelay((d) => d + incrementor)
      }} >
        +{incrementor}
      </button>
      <button onClick={() => {
        setDelay((d) => d - incrementor)
      }} >
       -{incrementor}
      </button>

      <input 
        type="number"
        value={incrementor}
        onChange={(e) => setIncrementor(Number(e.target.value))}
      />
    </div>
  )
}

export default App; 
*/

//-------------------------------------------------------- useContext + useReducer --------------------------------------------------------------
/*
import React, { createContext, useContext, useReducer, useRef } from 'react'
import P from 'prop-types'
import './App.css'

//data.js
const globalState = {
  title: 'Fernando',
  body: 'O body do contexto',
  conter: 0
}

export const actions = {
  CHANGE_TITLE: 'CHANGE_TITLE'
}

//reducer.js
export const reducer = (state, action) => {
  
  switch (action.type) {
    case actions.CHANGE_TITLE: {
      console.log("Mudar título")

      return {...state, title: action.payload}
    }
  }
  
  return {...state}
}

//AppContext
export const Context = createContext();
export const AppContext = ({children}) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const changeTitle = (payload) => {
    dispatch({ type: actions.CHANGE_TITLE, payload: payload })
  }

  return <Context.Provider value={{ state, changeTitle }}>{children}</Context.Provider>
}

AppContext.prototype = {
  children: P.node
}

//H1 / index.jsx
export const H1 = () => {
  const context = useContext(Context);
  const inputRef = useRef();
  
  return (
    <>
      <h1 onClick={() => context.changeTitle(inputRef.current.value)} >
        {context.state.title}
      </h1>
      <input type="text" ref={inputRef}/>
    </>
  )
}

function App() {
  return (
    <AppContext>
      <div>
        <H1/>
      </div>
    </AppContext>
  )
}

export default App;
*/



//-------------------------------------------------------- useReducer --------------------------------------------------------------
/*
  import React, { useReducer } from 'react'
import './App.css'

const globalState = {
  title: 'Fernando',
  body: 'O body do contexto',
  conter: 0
}

const reducer = (state, action) => {
  
  switch(action.type) {
    case 'muda':
      return { ...state, title: action.payload }  
    
    case 'inverter':
      const {title} = state;
      return { ...state, title: title.split('').reverse().join('') }  
  }
  return {...state}
}

function App() {
  const [state, dispatch] = useReducer(reducer, globalState)
  const {title, body, conter} = state

  return (
    <div>
      <h1>{title} {conter}</h1>
      <button onClick={() => dispatch({ type: 'muda', payload: new Date().toLocaleDateString('pt-BR')  })}>muda</button>
      <button onClick={() => dispatch({ type: 'inverter' })}>inverter</button>
    </div>
  )
}

export default App;
*/

//-------------------------------------------------------- useContext --------------------------------------------------------------
/*
import React, { useContext, useState } from 'react'
import './App.css'
import Body from './Components/Body/Body';
import { AppContext } from './context/AppContext';

function App() {

  return (
    <AppContext>
      <Body></Body>
    </AppContext>
  )
}

export default App;
*/

//-------------------------------------------------------- useRef --------------------------------------------------------------
/*

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import P from 'prop-types'
import logo from './logo.svg'
import './App.css'


const Post = ({ post, handleClick }) => {


  console.log("filho renderizou")
  return (
    <div className='posts' key={post.id}>
      <h1 onClick={() => handleClick(post.title)}>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

Post.prototype = {
  post: P.shape({
    id: P.number,
    title: P.string,
    body: P.string
  }),
  handleClick: P.func
}


function App() {
  const [posts, setPosts] = useState([])
  const [value, setValue] = useState('')
  const input = useRef(null);
  const contador = useRef(0);
  
  const handleClick = (value) => {
    setValue(value)
  }
  
  console.log("Pai renderizou")

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => setPosts(json))
  }, [])

  useEffect(() => {
    input.current.focus()
  }, [value])

  useEffect(() => {
    contador.current++;
  })

  return (
    <div className='App'>
      <h1>Renderizou: {contador.current}</h1>
      <input ref={input} value={value} onChange={(e) => {setValue(e.target.value)}}/>
      {useMemo(() => posts.length > 0 && posts.map(p =><Post key={p.id} post={p} handleClick={handleClick}/>), [posts])}
      {posts.length == 0 && (<h1>Carregando...</h1>)}
    </div>
  )
}

export default App;
*/


//-------------------------------------------------------- useMemo --------------------------------------------------------------
/*


const Post = ({ post }) => {
  console.log("filho renderizou")
  return (
    <div className='posts' key={post.id}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

Post.prototype = {
  post: P.shape({
    id: P.number,
    title: P.string,
    body: P.string
  })
}

function App() {
  const [posts, setPosts] = useState([])
  const [value, setValue] = useState('')

  console.log("Pai renderizou")

  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setPosts(json))
    }, 5000)
  }, [])

  return (
    <div className='App'>
      <input value={value} onChange={(e) => {setValue(e.target.value)}}/>
      {useMemo(() => posts.length > 0 && posts.map(p =><Post key={p.id} post={p}/>), [posts])}
      {posts.length == 0 && (<h1>Carregando...</h1>)}
    </div>
  )
}

*/
//-------------------------------------------------------- useCallback --------------------------------------------------------------

/*
import React, { useState, useEffect, useCallback } from 'react'
import P from 'prop-types'
import logo from './logo.svg'
import './App.css'

const Button = React.memo(function Button({incrementButton}) {
  console.log('Filho renderizou')
  return <button onClick={() => incrementButton(420)}>+</button>
})

Button.protoTypes = {
  incrementButton: P.func
}

function App() {
  const [counter, setCounter] = useState(0)

  const incremment = useCallback((num) => {
    setCounter((c) => c + num)
  }, [])

  console.log('Pai renderizou')

  return (
    <div className="App">
      <h1>Contador: {counter}</h1>
      <Button incrementButton={incremment}/>
    </div>
  );
}

export default App;

 */

//--------------------------------------------------------useState e UseEffect --------------------------------------------------------------

/*
const eventLn = () => {
  console.log('olá mundo')
}
function App() {
  const [counter, setCounter] = useState(0)

  //componentDidUpdate
  // useEffect(() => {
  //   console.log('componentDidUpdate') 
  // })

  //componentDidMounth
  useEffect(() => {
    document.querySelector('h1')?.addEventListener('click', eventLn)

    return () => {
      document.querySelector('h1')?.removeEventListener('click', eventLn)
    }
  }, [])

  //com parametros
  // useEffect(() => {
  //   console.log('componentDidMounth com parametros ' + counter)
  //   //setCounter(counter + 1) == loop infinito, só pode sem dependência
  // }, [counter])
  

  return (
    <div className="App">
      <h1>Contador: {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
}

export default App;


*/