import './css/app.css';
import axios from 'axios';
import { Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Error from './utils/error'
import Layout from './pages/Layout'
import AuthGuard from './helpers/AuthGuard';
import Profil from './pages/Profil';
import ConnexionPage from './components/log';
import { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';
import MenuHome from "./components/menuHome";
import { useDispatch } from 'react-redux';
import { setUserData } from './feature/user.slice';
import { setUsersData } from './feature/users.slice';
const urlUser = `http://localhost:3000/api/user/auth`;
const urlUsers = `http://localhost:3000/api/user/users`;




function App() {
  const dispatch = useDispatch()
  const [uid, setUid] = useState({});

  useEffect(() => {
    const fetchToken = async() => {
    await axios ({
      method: "get",
      url: urlUser,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((res) =>{
      dispatch(setUserData(res.data));
      setUid(res.data)
    })
    .catch((err) => console.log('veillez vous connécté'))
  };
  const getallusers = async() => {
    await axios ({
method: "get",
url: urlUsers,
})
.then((res) =>{
dispatch(setUsersData(res.data));
})
.catch((err) => console.log('err'))
};


  fetchToken();
  getallusers();

  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div className='app'>
      <UidContext.Provider value={uid}>
      <Routes>
          <Route element={<AuthGuard><MenuHome /><Layout  /></AuthGuard>}>
            <Route path="/" element={<Home />}/>
            <Route path="/profil" element={<Profil/> }/>
            <Route path="*" element={<Error/>} /></Route>
          <Route path="/connexion" element={<ConnexionPage /> } />
      </Routes>
      </UidContext.Provider>
      </div>
  )
}




export default App;

