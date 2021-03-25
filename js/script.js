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

function formValid(){
    var formIsValid = true;

    var passwordConfirm = document.querySelector("#txtPasswordConfirm");
    var divPasswordMismatch = document.querySelector("#divPasswordMismatch");
    var password1 = document.getElementById("txtPassword").value;
    var password2 = document.getElementById("txtPasswordConfirm").value;
    if(password1 != password2){
        divPasswordMismatch.classList.remove("invisible");
        divPasswordMismatch.innerHTML = "Passwords do not match";
        passwordConfirm.classList.add("hasError");
        passwordConfirm.focus();
        formIsValid = false;
    }
    else{
        divPasswordMismatch.classList.add("invisible");
        divPasswordMismatch.innerHTML = "";
        passwordConfirm.classList.remove("hasError");
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