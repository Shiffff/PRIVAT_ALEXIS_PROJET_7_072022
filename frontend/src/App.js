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
const urlUser = `http://localhost:3000/api/auth/user`;


function App() {
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
     setUid(res.data)
    console.log(res)
    })
    .catch((err) => console.log('veillez vous connécté'))
  };
  fetchToken();
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

