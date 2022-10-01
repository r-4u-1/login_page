const newUserBtn = document.getElementById("new_user");
const loginBtn = document.getElementById("login_btn");
const loginModal = document.getElementsByClassName("container");
const loginForm = document.getElementById("my_form");
const newUserForm = 
`<h1>New user</h1><form action="#" method="post" id="my_from">
<input type="text" placeholder="Choose username" class="field">
<input type="password" placeholder="Choose password" class="field">
<input type="submit" value="Create user" class="btn">
</form> `;

let fredrik = {
    username: "fredrik",
    password: "12345",
    loggedIn: "false"
}
window.localStorage.setItem('fredrik', JSON.stringify(fredrik));

let jsonFredde13 = JSON.parse(window.localStorage.getItem('fredrik'));
console.log(jsonFredde13);

newUserBtn.addEventListener("click", function(){
    loginModal.removeChild(loginForm);
    loginModal.innerHTML = newUserForm;
})

loginBtn.addEventListener("click", function(){
    let inputUsername= document.getElementById("username").value;
    let inputPassword= document.getElementById("password").value;
    console.log(`the inputUsername is: ${inputUsername}`);
    let foundUser = window.localStorage.getItem(inputUsername);
    if (foundUser == null){
        console.log(`No user with that user name ${inputUsername}`);
    }
    else if (foundUser){
        console.log("Found the user!")
    }
})