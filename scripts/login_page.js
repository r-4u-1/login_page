const new_user_btn = document.querySelector("#new_user");
const login_modal = document.querySelector(".container");
const login_form = document.querySelector("#my_form");
const new_user_form = 
`<h1>New user</h1><form action="#" method="post" id="my_from">
<input type="text" placeholder="Choose username" class="field">
<input type="password" placeholder="Choose password" class="field">
<input type="submit" value="Create user" class="btn">
</form> `;
new_user_btn.addEventListener("click", function(){
    login_modal.removeChild(login_form);
    login_modal.innerHTML = new_user_form;
})