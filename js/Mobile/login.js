import * as LocalStorage from '../LocalStorage.js'
import {url,request} from '../functions.js'

const login_btn = document.getElementById('login-btn') 

$(document).ready(function () {
    login_btn.addEventListener('click',function(){
        logInWithMail_User()
    })
})

const logInWithMail_User = () => {
    let LoginEmail = document.getElementById("userEmail");
    let LoginPassword = document.getElementById("userPassword");
    let loginParams = {
        email: LoginEmail.value,
        password: LoginPassword.value
    };

    request('getUserByMail',LoginEmail.value,loginParams,PostShowUser,PostErrorRequest);
}
const PostShowUser = (response,params) =>{
    console.log(response)
    if(response.length == 0){
        bootbox.alert('No se encontró el usuario');
    }    
    else {
        let user = response;
        if (user.password === params.password) {                 
         document.cookie = 'LoggedUserName = ' + user.username;         
         document.cookie = 'LoggedUserMail = ' + user.email;
         document.cookie = 'LoggedUserId = ' + user.id;
         LocalStorage.Save('LoggedUser',user)
            window.location.href = `user.html`;
        }
        else bootbox.alert('La contraseña no coincide');

    }
}
const PostErrorRequest = (response) => {
    console.log(response);
    bootbox.alert('Se ha producido un error al intentar obtener la información');    
}