import './css/app.css';
import {Route, Routes} from "react-router-dom";
import SignIn from './components/log/SignInForm';
import SignUp from './components/log/SignUpForm';
import Home from './pages/Home';

function App() {
  

  return(
    <>
    <Routes>
      <Route path="/SignIn" element={<SignIn /> } />
      <Route path="/SignUp" element={<SignUp/> } />
      <Route path="/" element={<Home/> } />

      <Route path="/" element={<SignIn />} />
    </Routes>
  </>
  )
}

export default App;
