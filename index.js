import * as LocalStorage from './js/LocalStorage.js'
import {url,service} from './js/functions.js'
import * as Registration from './js/Registration.js'


$(document).ready(function () {
    const Login_user = document.getElementById("Login_user")
    Login_user.addEventListener('click',function(){
        prompt_login_user()
    })

    const Login_vet = document.getElementById("Login_vet")
    Login_vet.addEventListener('click',function(){
        prompt_login_vet()
    })

    const Registration = document.getElementById("Registration")
    Registration.addEventListener('click',function(){
        prompt_register()
    })
})

function prompt_login_user(){
    let message = `
    <div class="container login">
        <h1>Inicia sesión</h1>
        <h5>O <a href="#" onclick="prompt_register()">crea una nueva cuenta</a></h5>
    </div>
    <br/>       
    <div class="container">
        <small>Continúa cómo:</small>
        <br/>
        <br/>
        <div class="d-flex justify-content-center login gap-3">
            <button class="btn btn-link" type="button">
                <i class="fa-brands fa-google"></i>
            </button>
            <button class="btn btn-link" type="button">
                <i class="fa-brands fa-facebook"></i>
            </button>
        </div>
        <br/>    
        <small>O bien</small>
        <br/>
        <br/>
        <form>
            <div class="mb-3">
                <label for="LoginEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="LoginEmail" aria-describedby="emailHelp">                
            </div>
            <div class="mb-3">
                <label for="LoginPassword" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="LoginPassword">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Mantener mi sesión iniciada</label>
            </div>            
            </form>            
                <div class="text-center p-2 login-footer">
                    <button id="login_user_btn" class="btn btn-dark login" href="#" type="button" ><span>Entrar</span></button>
                </div>            
    </div>`;
    bootbox.dialog({
        title: 'Log in',        
        message:message,
        centerVertical: true,
        callback: function(result) {
        console.log(result);
        }
        });

        let login_user_btn = document.getElementById("login_user_btn")        
        login_user_btn.addEventListener('click',function(){
            LoginWithMail_User()
        })
}

function prompt_login_vet(){
    let message = `
    <div class="container login">
        <h1>Inicia sesión</h1>
        <h5>O <a href="#" onclick="prompt_register()">crea una nueva cuenta</a></h5>
    </div>
    <br/>       
    <div class="container">
        <small>Continúa cómo:</small>
        <br/>
        <br/>
        <div class="d-flex justify-content-center login gap-3">
            <button class="btn btn-link" type="button">
                <i class="fa-brands fa-google"></i>
            </button>
            <button class="btn btn-link" type="button">
                <i class="fa-brands fa-facebook"></i>
            </button>
        </div>
        <br/>    
        <small>O bien</small>
        <br/>
        <br/>
        <form>
            <div class="mb-3">
                <label for="LoginEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="LoginEmail" aria-describedby="emailHelp">                
            </div>
            <div class="mb-3">
                <label for="LoginPassword" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="LoginPassword">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Mantener mi sesión iniciada</label>
            </div>            
            </form>            
                <div class="text-center p-2 login-footer">
                    <button id="login_vet_btn" class="btn btn-dark login" href="#" type="button" ><span>Entrar</span></button>
                </div>            
    </div>`;
    bootbox.dialog({
        title: 'Log in',        
        message:message,
        centerVertical: true,
        callback: function(result) {
        console.log(result);
        }
        });

        let login_vet_btn = document.getElementById("login_vet_btn")
        login_vet_btn.addEventListener('click',function(){
            LoginWithMail_Vet()
        })
}

function prompt_register(){
    let message = `
    <div class="container login">
        <h1>Crea una cuenta</h1>
        <h5>O <a href="#" onclick="prompt_register()">inicia sesión con una cuenta existente</a></h5>
    </div>
    <br/>       
    <div class="container">
        <small>Regístrate con:</small>
        <br/>
        <br/>
        <div class="d-flex justify-content-center login gap-3">
            <button class="btn btn-link" type="button">
                <i class="fa-brands fa-google"></i>
            </button>
            <button class="btn btn-link" type="button">
                <i class="fa-brands fa-facebook"></i>
            </button>
        </div>
        <br/>    
        <small>O bien</small>
        <br/>
        <br/>
        <form class="form-login">
            <div class="mb-3">
                <label for="registration_name" class="form-label">Nombre</label>
                <input type="email" class="form-control" id="registration_name" aria-describedby="emailHelp">                
            </div>
            <div class="mb-3">
                <label for="registration_email" class="form-label">Email</label>
                <input id="registration_email" type="email" class="form-control" aria-describedby="emailHelp">                
            </div>
            <div class="mb-3">
                <label for="registration_password" class="form-label">Contraseña</label>
                <input id="registration_password" type="password" class="form-control" id="LoginPassword">
            </div>
            <div class="d-flex justify-content-center">            
                <input type="radio" class="btn-check" name="options" id="registration_asOwner" autocomplete="off" checked>
                <label class="btn btn-outline-secondary" for="registration_asOwner"><i class="fa-solid fa-user"></i> Usuario</label>

                <input type="radio" class="btn-check" name="options" id="registration_asVet" autocomplete="off">
                <label class="btn btn-outline-secondary" for="registration_asVet"><i class="fa-solid fa-user-doctor"></i> Veterinario</label>
            </div>
            </form>                        
    </div>
    <div class="text-center p-2 login-footer">
                <button id="registration_btn" class="btn btn-success login" href="#" type="button" >Registrarse</button>
            </div>            `;
    bootbox.dialog({
        title: 'Sign in',        
        message:message,
        centerVertical: true,
        callback: function(result) {
        console.log(result);
        }
        });

    let registration_btn = document.getElementById("registration_btn")
        registration_btn.addEventListener('click',function(){
            let registration_name = $("#registration_name").val()
            let registration_email = $("#registration_email").val()
            let registration_password = $("#registration_password").val()
            let registraion_asOwner = document.getElementById("registration_asOwner")
            let registraion_asVet = document.getElementById("registration_asVet")

            if( registraion_asOwner.checked == true ) Registration.registration_owner(registration_name,registration_email,registration_password)
            if( registraion_asVet.checked == true ) Registration.registration_vet(registration_name,registration_email,registration_password)
        })
}

function LoginWithMail_User(){
    let LoginEmail = document.getElementById("LoginEmail");
    let LoginPassword = document.getElementById("LoginPassword");
    let loginParams = {
        email: LoginEmail.value,
        password: LoginPassword.value
    };

    request('getUserByMail',LoginEmail.value,loginParams,PostShowUser,PostErrorRequest);
}

function LoginWithMail_Vet(){
    let LoginEmail = document.getElementById("LoginEmail");
    let LoginPassword = document.getElementById("LoginPassword");
    let loginParams = {
        email: LoginEmail.value,
        password: LoginPassword.value
    };

    request('getVetsByMail',LoginEmail.value,loginParams,PostShowVet,PostErrorRequest);
}

function PostShowUser(response,params){
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
            window.location.href = `${url}/pages/user.html`;
        }
        else bootbox.alert('La contraseña no coincide');

    }
}
function PostShowVet(response,params){
    if(response.length == 0){
        bootbox.alert('No se encontró el vet');
    }    
    else {
        let vet = response[0];
        if (vet.password === params.password) {                  
            LoggedVet(vet)
        }
        else bootbox.alert('La contraseña no coincide');

    }
}

export const LoggedVet = (vet) => {
    document.cookie = 'LoggedVetName = ' + vet.displayName
    document.cookie = 'LoggedVetMail = ' + vet.email
    document.cookie = 'LoggedVetId = ' + vet.idVet
    LocalStorage.Save(`VetData_${vet.idVet}`,vet)
    window.location.href = `${url}/pages/vet.html`
}

function request(endpoint,params,extraParams,callBack,OnError){
    var options = {
        method: "GET",
        mode: "cors",
        cache: "default"
    }

    fetch(`${service}/${endpoint}/${params}`,options)
    .then(response => response.json())
    .then(response => callBack(response,extraParams))
    .catch(error => {if(OnError != null) OnError(error, error)});
}

function PostErrorRequest(response){
    console.log(response);
    bootbox.alert('Se ha producido un error al intentar obtener la información');    
}
