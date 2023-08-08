const idBtn = document.querySelector("#idBtn");
const pwBtn = document.querySelector("#pwBtn");

idBtn.addEventListener("click", (event) => {
    location.href = "/auth/searchId";
});

pwBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const id = document.querySelector("#id").value;

    await axios.post("/auth/searchPw", {email: email, id: id})
    .then((request) => {
        const {pw} = request.data;
        console.log(pw);
        if(email === ""){
            alert("이메일을 입력해주세요.");
        } else if (id === ""){
            alert("이름을 입력해주세요.");
        } else if (email && id){
            if(pw){
                location.href = `/auth/searchInform/password/${pw}`;
            }
            if(!pw && message){
                alert(message);
            }
        }
    })
    .catch((error) => console.error(error));
})