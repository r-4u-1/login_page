const newUserBtn = document.getElementById("new_user");
const loginBtn = document.getElementById("login_btn");
const loginModal = document.querySelector(".container");
const loginForm = document.getElementById("my_form");
const inputUsernameElement= document.getElementById("username");
const inputPasswordElement= document.getElementById("password");
const validUserNameChars = "qwertyuiopåasdfghjklöäzxcvbnmQWERTYUIOPÅASDFGHJKLÖÄZXCVBNM";
const validPasswordChars = "qwertyuiopåasdfghjklöäzxcvbnmQWERTYUIOPÅASDFGHJKLÖÄZXCVBNM1234567890";

const newUserForm = 
`<h1>New user</h1><div id="my_form">
<input type="text" placeholder="Choose username" id="c_username" class="field">
<input type="password" placeholder="Choose password" id="c_password" class="field">
<input type="submit" value="Create user" id="createBtn" class="btn">
</div> `;
const logoutOption = 
    `<div class="navbar_options">
    <a href="" id="log_out">Logout</a>
    </div>` 

const fredrik = {
    username: "fredrik",
    password: "12345"
}
const benicio = {
    username: "benicio",
    password: "456"
}
const arnold = {
    username: "arnold",
    password: "789"
}
const users = [fredrik, benicio, arnold];

let logOutBtn;
let currentUser = window.localStorage.getItem('current_user');

for (const user of users){
    window.localStorage.setItem(user.username, JSON.stringify(user));
}

if (currentUser){ 
    //If we have a current in memory then we display the logged in view for the user   
    let cu =  JSON.parse(currentUser);
    changeNavBarToLoggedInUserOption(logoutOption);    
    changeLoginModalToLoggedInUser(cu, loginModal);

    logOutBtn = document.getElementById("log_out");
    logOutBtn.addEventListener("click", logOutUser);
}

function changeLoginModalToLoggedInUser(currentUser, loginM=loginModal, loginF=loginForm){
    /**
     * Changes the login modal to the welcome user view
     */
    loginM.removeChild(loginF);    
    const loggedInUserH1 = `<h1>Welcome ${currentUser.username}</h1>`;
    loginM.innerHTML = loggedInUserH1;
}

function changeNavBarToLoggedInUserOption(logoutO=logoutOption){
    /**
     * Changes the nav bar to have to options for logged in users
     */
    const nav = document.querySelector("nav");
    const nav_option = document.querySelector(".navbar_options");    
    nav.removeChild(nav_option);    
    nav.innerHTML = logoutO;
}

function logOutUser(loginF=loginForm){
    /**
     * Logs out user by removing them from local storage memory and displaying the login modal
     */
    window.localStorage.removeItem("current_user");
    loginModal.innerHTML = loginF;    
}

loginBtn.addEventListener("click", function(){
    let inputUsername= inputUsernameElement.value;
    let inputPassword= inputPasswordElement.value;
    console.log(`the inputUsername is: ${inputUsername}`);

    let foundUser = window.localStorage.getItem(inputUsername);
    if (!foundUser){
        inputUsernameElement.style.border = "thick solid #f70a02ce"
        alert(`username: ${inputUsername} is not found.`);
        return
    }
    let userObject = JSON.parse(foundUser);
    let correctPass = userObject.password == inputPassword;

    if (!correctPass){
        inputPasswordElement.style.border = "thick solid #f70a02ce"
        alert(`password: ${inputPassword} is incorrect.`);
        return
    }

    window.localStorage.setItem('current_user', JSON.stringify(userObject));

    changeLoginModalToLoggedInUser(userObject)
    changeNavBarToLoggedInUserOption()

    logOutBtn = document.getElementById("log_out"); 
    logOutBtn.addEventListener("click", logOutUser);
});

newUserBtn.addEventListener("click", function(){
    loginModal.removeChild(loginForm);
    loginModal.innerHTML = newUserForm;
    const creatBtn = document.getElementById("createBtn");

    creatBtn.addEventListener("click", function(){
        const cUsername = document.getElementById("c_username").value;
        const cPassword = document.getElementById("c_password").value;
        let saveUsername;
        let savePassword;
        for(const char of cUsername){
            if (validUserNameChars.includes(char)){
                saveUsername = true;
                continue;
            } 
            else {
                saveUsername = false
                alert(`username: ${cUsername} is not valid. Only the following characters are allowed: ${validUserNameChars}`);
                break;
            }
        }
        for(const char of cPassword){
            if (validPasswordChars.includes(char)){
                savePassword = true;
                continue;
            } 
            else {
                savePassword = false;
                alert(`password: ${cPassword} is not valid. Only the following characters are allowed: ${validPasswordChars}`);
                break;
            } 
        }
        if (saveUsername && savePassword){
            const newUser = {
                username: cUsername,
                password: cPassword
            }
            window.localStorage.setItem(newUser.username, JSON.stringify(newUser));
            window.localStorage.setItem('current_user', JSON.stringify(newUser));
            const newUserForm = document.getElementById("my_form");
            changeLoginModalToLoggedInUser(newUser, loginModal, newUserForm);
            changeNavBarToLoggedInUserOption();
            logOutBtn = document.getElementById("log_out"); 
            logOutBtn.addEventListener("click", logOutUser);
        }
    });
});