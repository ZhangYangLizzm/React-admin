import { useEffect } from 'react'
import './App.css'
import BaseRouter from './router/router'
import { fetchAuthData } from './store/AuthListSlice'
import { useAppDispatch } from './store/hooks'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchAuthData())
    
  }, [dispatch])
  return (
    <div id="app">
      <BaseRouter />
    </div>
  )
}

export default App
