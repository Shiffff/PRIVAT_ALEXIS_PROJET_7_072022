import { useState } from 'react' ;
const urlLoginUser = `http://localhost:3000/api/user/login`; 



export default function SignUpForm() {
    const [user, setUser] = useState({
        email:'',
        password:''
    });

        function checkEmail(){        
            const emailRegExp = new RegExp('^[=.a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$', 'g');
            const testemail = emailRegExp.test(user.email);
    
                if(testemail === false){
                document.querySelector('.errorMessageEmail').innerHTML = "Email invalide"
                return false  
                }else{
                document.querySelector('.errorMessageEmail').innerHTML = ""
                return true
                }    
        }

    function handleChange(e) {
        const { name, value } = e.target;
        setUser({...user, [name]: value })
    }

        function handleCheckSubmit(e) {
            e.preventDefault();
            console.log('user', user)
            checkEmail()
            function sendNewUser(){
                let options = {         // utilisation de la méthode post vers l'API pour lui confirmé l'action
                    method: "POST",
                    body: JSON.stringify(user),
                    withCredentials: true,
                    headers: {
                      "content-type": "application/json",
                    },
                  };
                  fetch(urlLoginUser, options)        // récupération de la reponse de l'api (ID commande généré)
                  .then((res) => {
                    if(res.status < 400){
                        res.json().then((data) => {console.log('data',data)
                        window.localStorage.setItem('token', data.token);
                        window.location = "/";
                        
                        });
                       
                    }else{
                        document.querySelector('.errorMessageFetch').innerHTML = "Paires identifiant mot de passe invalide"
                    }
                  })
    
                  .catch((err) => {
                    document.querySelector('.errorMessageFetch').innerHTML = "Site en maintenance"
                  })
            }
            sendNewUser()
        }
    return (
        <div className="CenterForm">
        <form onSubmit={(e) => handleCheckSubmit(e)}>
                <label htmlFor="email">Email *</label>
                <br/>
                <input placeholder="jean.dupont@exemple.fr" type="text" name="email" id="email" value={user.email} onChange={(e) => handleChange(e)}/>
                <br/>
                <div className="errorMessageEmail errormsg"></div>
                <br/>
                <label htmlFor="text">Mot de passe *</label>
                <br/>
                <input type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={(e) => handleChange(e)} />
                <br/>
                <div className="errorMessagePassword errormsg"></div>
                <br/>
                <input type="submit" className="submitLogin" value="Se connecter" />
                <br/>
                <div className="errorMessageFetch errormsg"></div>
            </form>
        </div>
        )
};
