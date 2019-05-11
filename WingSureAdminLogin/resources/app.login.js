(function(){
    var AUTH_PATH='http://ec2-18-236-104-250.us-west-2.compute.amazonaws.com:8080/wingsure_login-0.0.1/oauth/token';
    var EL={
        LOGIN_FORM:document.querySelector('form[data-action="login-form"]'),
        LOGIN_BUTTON:document.querySelector('button[data-action="loginpost"]'),
        USERNAME:document.querySelector('input[data-action="username"]'),
        PASSWORD:document.querySelector('input[data-action="password"]')
    };
    
    var formSubmission = function(){
        var loginData = new FormData();
        var xhr = new XMLHttpRequest();
        
        xhr.open('POST',AUTH_PATH,true);
        //xhr.setRequestHeader('Application','WingsureAdmin');
        loginData.append('grant_type','password');
        loginData.append('username',EL.USERNAME.value);
        loginData.append('password',EL.PASSWORD.value);
        xhr.send(loginData);
    };
    
    EL.LOGIN_BUTTON.addEventListener('click',function(e){
        e.preventDefault();
        formSubmission();

    })
    EL.LOGIN_FORM.addEventListener('submit',function(submitEvent){
        
        submitEvent.preventDefault();
        formSubmission();

    });
    console.log(EL.LOGIN_FORM)



})();