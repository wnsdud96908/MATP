const idBtn = document.querySelector("#idBtn");
const pwBtn = document.querySelector("#pwBtn");
const goToBack = document.querySelector("#goToBack");

const popupWidth = 400;
const popupHeight = 400;
const popupX = (window.screen.width / 2) - (popupWidth / 2);
const popupY = (window.screen.height / 2) - (popupHeight / 2);

pwBtn.addEventListener("click", (event) => {
    location.href = "/auth/searchPw";
});

idBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const name = document.querySelector("#name").value;
    await axios.post("/auth/searchId", {email: email, name: name})
    .then((request) => {
        const {id, message} = request.data;
        if(email === ""){
            alert("이메일을 입력해주세요.");
        } else if (name === ""){
            alert("이름을 입력해주세요.");
        } else if (email && name){
            if(id){
                location.href = `/auth/searchInform/id/${id}`;
            }
            if(!id && message){
                alert(message);
            }
        }
    })
    .catch((error) => console.error(error));
})