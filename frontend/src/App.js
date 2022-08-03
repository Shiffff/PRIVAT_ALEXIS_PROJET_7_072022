import './css/app.css';
import { Route, Routes} from "react-router-dom";
import SignIn from './components/log/SignInForm';
import SignUp from './components/log/SignUpForm';
import Home from './pages/Home';
import Error from './utils/error'
import Layout from './pages/Layout'
import AuthGuard from './helpers/AuthGuard';

function App() {
  

  return(
    <div className='app'>
      <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={
              <AuthGuard>
            <Home/> 
            </AuthGuard>
            }/>
            <Route path="*" element={<Error/>} />
          </Route>
          <Route path="/SignIn" element={<SignIn /> } />
          <Route path="/SignUp" element={<SignUp/> } />
      </Routes>
      </div>
  )
}

export default App;


