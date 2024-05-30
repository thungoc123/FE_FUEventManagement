import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

// import * as React from 'react';
import { Button } from '@relume_io/relume-ui';
import { Login1 } from './components/Test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   {/* <Button>Buy Now</Button> */}
    <Login1 />
    </>
  )
}

export default App
