
import { Outlet } from 'react-router-dom'

import Navbar from './pages/shared/navbar/Navbar'

function App() {


  return (
    <>
      <div className='' >

        <Navbar className=""/>
        <Outlet />

      </div>
    </>
  )
}

export default App
