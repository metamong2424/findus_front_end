import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import RequireAuth from './Auth/RequireAuth'
import LandingPage from './LandingPage'
import Board from '../pages/Board'
import Signup from './Auth/SignUp'
import Login from './Auth/Login'
import Logout from './Auth/Logout'
import NoMatch from './NoMatch'
import Main from '../pages/Main'
import FreeBoard from '../pages/FreeBoard'
import FunBoard from '../pages/FunBoard'
import JobBoard from '../pages/JobBoard'

export default function RoutesSetup() {
  // prettier-ignore
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/freeBoard" 
          element={
            <RequireAuth>
              <FreeBoard />
            </RequireAuth>
          }
        />
        <Route path="/funBoard" 
          element={
            <RequireAuth>
              <FunBoard />
            </RequireAuth>
          }
        />
        <Route path="/jobBoard" 
          element={
            <RequireAuth>
              <JobBoard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="logout"
        element={
          <RequireAuth>
            <Logout />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
