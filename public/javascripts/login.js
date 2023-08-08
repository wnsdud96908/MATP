const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", async (event) => {
    const id = document.querySelector("#login-id").value;
    const password = document.querySelector("#login-password").value;
    event.preventDefault();
    return await axios
        .post("/auth/login", {id: id, password: password})
        .then((request) => {
            const {message} = request.data;
            if(message){
                return alert(message);
            } else {
                location.href = "/";
            }
        })
        .catch((error) => {
            console.error(error);
        })
});

const searchId = document.querySelector("#searchId");
const searchPw = document.querySelector("#searchPw");

const popupWidth = 400;
const popupHeight = 400;
const popupX = (window.screen.width / 2) - (popupWidth / 2);
const popupY = (window.screen.height / 2) - (popupHeight / 2);


searchId.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("searchId", "아이디찾기", `status=no, width=${popupWidth}, height=${popupHeight}, left=${popupX}, top=${popupY}`);
});

searchPw.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("searchPw", "비밀번호찾기", `status=no, width=${popupWidth}, height=${popupHeight}, left=${popupX}, top=${popupY}`);
});