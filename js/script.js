function showTextBox(){
    var ddQuestion = document.getElementById("ddQuestion");
    var divAnswer = document.getElementById("divAnswer");

    if(ddQuestion.value != ""){
        divAnswer.classList.remove("invisible");
    }
    else{
        divAnswer.classList.add("invisible");
    }
}

function checkPassword(str)
{
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(str);
}

function formValid(){
    var formIsValid = true;

    var txtPassword = document.querySelector("#txtPassword");
    var divInvalidPassword = document.querySelector("#divInvalidPassword");
    var txtPasswordConfirm = document.querySelector("#txtPasswordConfirm");
    var divPasswordMismatch = document.querySelector("#divPasswordMismatch");
    var password1 = document.getElementById("txtPassword").value;
    var password2 = document.getElementById("txtPasswordConfirm").value;

    if(!checkPassword(password1)){
        divInvalidPassword.classList.remove("invisible");
        divInvalidPassword.innerHTML = "Password must contain a small letter, a capital letter, and a number and be longer than 6 characters";
        txtPassword.classList.add("hasError");
        txtPassword.focus();
        formIsValid = false;
    }
    else{
        divInvalidPassword.classList.add("invisible");
        divInvalidPassword.innerHTML = "";
        txtPassword.classList.remove("hasError");
    }


    if(password1 != password2){
        divPasswordMismatch.classList.remove("invisible");
        divPasswordMismatch.innerHTML = "Passwords do not match";
        txtPasswordConfirm.classList.add("hasError");
        txtPasswordConfirm.focus();
        formIsValid = false;
    }
    else{
        divPasswordMismatch.classList.add("invisible");
        divPasswordMismatch.innerHTML = "";
        txtPasswordConfirm.classList.remove("hasError");
    }
    var elements = document.getElementsByTagName("input");
    var error = document.getElementById("syntaxError");
    var invalidChars = ['&', '<', '>','#', '\'', '\"', '!', '~','-','{','}','(',')','`'];
    for(let i = 0; i < elements.length; i++){
        for(let j = 0; j < invalidChars.length; j++) {
            if (elements[i].value.indexOf(invalidChars[j]) != -1) {
                elements[i].classList.add("hasError");
                //alert("Highlighted fields contain invalid characters");
                error.classList.remove("invisible");
                formIsValid = false;
            }
        }
    }
    return formIsValid;
}