
import { Outlet } from 'react-router-dom'

import Navbar from './pages/shared/navbar/Navbar'

function App() {


  return (
    <>
      <div >

        <Navbar className='container mx-auto' />
        <Outlet />

      </div>
    </>
  )
}

export default App
