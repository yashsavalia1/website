const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const encryptedKey = 337221116666;
const privatekey = 331319;



loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const user = loginForm.IDNum.value;

    if (user * privatekey === encryptedKey) {
        console.log("logged in");
        Redirect();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

function Redirect() {
    window.location = "./snake/";
}