import { useState } from "react";
export default function SignInForm() {
    const [user, setUser] = useState({
        name:'',
        firstName:'',
        email:'',
        password:'',
        passwordCheck:''   
    });
   

    function handleChange(e){
        const {name, value} = e.target;
        setUser({...user, [name]: value })
        checkNewPassword() 
    }
    function checkPassword(){
        if (user.password !== user.passwordCheck){
            document.querySelector('.errorMessagePasswordCheck').innerHTML = 'Mots de passe différents'
            return false
        }else{
            return true
        }
    }
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
    function checkName(){
    const NameRegExp = new RegExp( "^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$", 'g')
    const testName = NameRegExp.test(user.name);
    if(testName === false){
        document.querySelector('.errorMessageName').innerHTML = "Nom invalide"
        return false  
        }else{
        document.querySelector('.errorMessageName').innerHTML = ""
        return true
        }    
    }
    function checkFirstName(){
    const NameRegExp = new RegExp( "^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$", 'g')
    const testFirstName = NameRegExp.test(user.firstName);
    if(testFirstName === false){
        document.querySelector('.errorMessageFirstName').innerHTML = "Prénom invalide"
        return false  
        }else{
        document.querySelector('.errorMessageFirstName').innerHTML = ""
        return true
        }    
    }
    function checkNewPassword(){
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if(strongRegex.test(user.password) && user.password.length > 3) {
        document.querySelector('.errorMessagePassword').innerHTML = "<span style='color:green'>Mot de passe robuste</span>"

        return true
    } else if(mediumRegex.test(user.password)&& user.password.length > 3) {
        document.querySelector('.errorMessagePassword').innerHTML = "<span style='color:orange'>Mot de passe moyen</span>"
        return true
    } else if(user.password.length < 1){document.querySelector('.errorMessagePassword').innerHTML = ""
    return false
    }else{document.querySelector('.errorMessagePassword').innerHTML = "<span style='color:red'>Mot de passe trop faible</span>"
    return false  
    }
    }
  function lastCheckpassword(){
    if(user.password.length < 1){document.querySelector('.errorMessagePassword').innerHTML = "Mot de passe invalide"
    return false
  }}
    

    function handleUsersSubmit(e) {
        e.preventDefault();
        console.log('user', user)
        document.querySelector('.errorMessageFirstName').innerHTML = ''
        document.querySelector('.errorMessagePasswordCheck').innerHTML = ''
        document.querySelector('.errorMessageEmail').innerHTML = ''
        checkPassword()
        checkEmail()
        checkName()
        checkFirstName()
        lastCheckpassword()

        function sendNewUser(){
            let options = {         // utilisation de la méthode post vers l'API pour lui confirmé l'action
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                  "content-type": "application/json",
                },
              };
              fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/signup`, options)        // récupération de la reponse de l'api (ID commande généré)
              .then((res) => {
                if(res.status < 400){
                    document.querySelector('.errorMessageFetch').innerHTML = "<span style='color:green'>Inscription validée </br> veuillez vous connecter</span>"
                    
                }else{
                    document.querySelector('.errorMessageFetch').innerHTML = "Email invalide"
                }
              })

              .catch((err) => {
                document.querySelector('.errorMessageFetch').innerHTML = "Site en maintenance"
              })

        }


        



        if(checkPassword() && checkEmail() && checkNewPassword() && checkName() && checkFirstName() === true){   
                sendNewUser()
        }
    }
    return (
        <div className="CenterForm">
            <form onSubmit={(e) => handleUsersSubmit(e)}>
                <label htmlFor="name">Nom *</label>
                <br/>
                <input placeholder="Jean" type="text" name="name" id="name" value={user.name} onChange={(e) => handleChange(e)} />
                <br/>
                <div className="errorMessageName errormsg"></div>
                <br/>
                <label htmlFor="firstName">Prénom *</label>
                <br/>
                <input placeholder="Dupont" type="text" name="firstName" id="firstName" value={user.firstName} onChange={(e) => handleChange(e)}/>
                <br/>
                <div className="errorMessageFirstName errormsg"></div>
                <br/>
                <label htmlFor="email">Email *</label>
                <br/>
                <input placeholder="jean.dupont@exemple.fr" type="text" name="email" id="email" value={user.email} onChange={(e) => handleChange(e)}/>
                <br/>
                <div className="errorMessageEmail errormsg"></div>
                <br/>
                <label htmlFor="text">Mot de passe *</label>
                <br/>
                <input placeholder="" type="password" name="password" autoComplete="off" id="password" value={user.password} onChange={(e) => handleChange(e)}/>
                <br/>
                <div className="errorMessagePassword "></div>
                <br/>
                <label htmlFor="text">Confirmation du mot de passe *</label>
                <br/>
                <input placeholder="" type="password" name="passwordCheck" autoComplete="off" id="passwordCheck" value={user.passwordCheck} onChange={(e) => handleChange(e)} />
                <br/>
                <div className="errorMessagePasswordCheck errormsg"></div>
                <br/>
                <input type="submit" className="submitLogin" value="S'inscrire" />
                <br/>
                <div className="errorMessageFetch"></div>
            </form>
        </div>
        )
};