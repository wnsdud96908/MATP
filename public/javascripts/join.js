let idValid = false;
let nickValid = false;
let pwdValid = false;
let nameValid = false;
let birthValid = false;
let phoneValid = true;
let emailValid = false;

//아이디
const joinId = document.querySelector('#join_id');
const idChkBtn = document.querySelector('#idChkBtn');
const idChk = document.querySelector('#idChk');

idChkBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const id = joinId.value;
  const valid = (id) => {
    return /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/.test(id);
  };

  if (!valid(id)) {
    return (
      (idChk.innerHTML = `<span id="idChk" style="color:red">&nbsp;사용 할 수 없는 아이디입니다.</span>`),
      (idValid = false),
      alert('잘못된 ID 입니다.')
    );
  } else {
    return await axios
      .post('/auth/idChk/join', {
        id: id,
      })
      .then((request) => {
        const { joined, message } = request.data;
        if (joined === '') {
          idChk.innerHTML = `<span id="idChk" style="color:red">&nbsp;${message}</span>`;
          idValid = false;
        } else if (joined) {
          idChk.innerHTML = `<span id="idChk" style="color:red">&nbsp;${message}</span>`;
          idValid = false;
        } else {
          idChk.innerHTML = `<span id="idChk" style="color:green">&nbsp;${message}</span>`;
          idValid = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

//닉네임
const joinNick = document.querySelector('#join_nick');
const nickChkBtn = document.querySelector('#nickChkBtn');
const nickChk = document.querySelector('#nickChk');

nickChkBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const nick = joinNick.value;
  const valid = (nick) => {
    return /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/.test(nick);
  };

  if (!valid(nick)) {
    return (
      (nickChk.innerHTML = `<span id="nickChk" style="color:red">&nbsp;사용 할 수 없는 닉네임입니다.</span>`),
      (nickValid = false),
      alert('잘못된 닉네임 입니다.')
    );
  } else {
    return await axios
      .post('/auth/nickChk/join', {
        nick: nick,
      })
      .then((request) => {
        const { joined, message } = request.data;
        if (joined) {
          nickChk.innerHTML = `<span id="nickChk" style="color:red">&nbsp;${message}</span>`;
          nickValid = false;
        } else {
          nickChk.innerHTML = `<span id="nickChk" style="color:green">&nbsp;${message}</span>`;
          nickValid = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

//비밀번호
const password_chk = document.querySelector('#password_chk');
const join_password = document.querySelector('#join_password');
const pwChk = document.querySelector('#pwChk');

function checkUserPassword() {
  let password = join_password.value;
  let chkPassword = password_chk.value;

  if (password === '' || chkPassword === '') {
    pwChk.innerHTML = "<span id='pwChk' style=color:white>&nbsp;</span>";
    pwdValid = false;
  } else if (chkPassword !== '' && password !== chkPassword) {
    pwChk.innerHTML =
      "<span id='pwChk' style=color:red>&nbsp;비밀번호가 일치하지 않습니다.</span>";
    pwdValid = false;
  } else {
    pwChk.innerHTML = "<span id='pwChk' style=color:white>&nbsp;</span>";
    pwdValid = true;
  }
}

password_chk.addEventListener('input', checkUserPassword);

//이름
const joinName = document.querySelector('#join_name');

joinName.addEventListener('blur', (event) => {
  event.preventDefault();
  const name = joinName.value;
  const valid = (name) => {
    return /^[ㄱ-힣-_.]{3,12}$/.test(name);
  };

  if (!valid(name)) {
    nameValid = false;
  } else {
    nameValid = true;
  }
});

//생년월일
const joinBirth = document.querySelector('#join_birthday');

joinBirth.addEventListener('blur', (event) => {
  event.preventDefault();
  const birth = joinBirth.value;
  const valid = (birthDay) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(birthDay);
  };

  if (!valid(birth)) {
    birthValid = false;
  } else {
    birthValid = true;
  }
});

//전화번호
const joinPhone = document.querySelector('#join_phone');
const phoneChkBtn = document.querySelector('#phoneChkBtn');

const timer = document.querySelector('#timer');

let cnt = 0;
let stop = false;

phoneChkBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const phone = joinPhone.value;
  const num =
    phone.substr(0, 3) + '-' + phone.substr(3, 4) + '-' + phone.substr(7, 4);
  const valid = (phone) => {
    return /^\d{3}-\d{4}-\d{4}$/.test(phone);
  };

  function setTime() {
    if (!stop && 0 <= cnt && cnt < 60) {
      let limit = 60 - cnt;
      timer.innerText = `인증번호 유효시간 ${limit}`;
      cnt += 1;
    } else if (cnt === 60 || stop) {
      stop = true;
      timer.innerText = '';
      cnt = 0;
      clearInterval(setInterval(setTime, 1000));
    }
  }

  // 010-####-#### 만들기
  if (!valid(num)) {
    phoneValid = false;
    alert('사용 할 수 없는 전화번호입니다.');
  } else {
    return await axios
      .post('/auth/phoneChk/join', {
        phone: phone,
      })
      .then((request) => {
        const { joined, message, already } = request.data;

        if (joined) {
          phoneValid = false;
          alert(message);
        } else {
          alert(message);
        }

        if (already === 'true') {
          setInterval(setTime, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

const authChkBtn = document.querySelector('#authChkBtn');
const authInput = document.querySelector('#authInput');

authChkBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const phone = joinPhone.value;
  const authNum = authInput.value;

  return await axios
    .post('/auth/authChk/join', {
      authNum: authNum,
      phone: phone,
    })
    .then((request) => {
      const { joined, message } = request.data;

      if (joined) {
        phoneValid = false;
        alert(message);
      } else {
        phoneValid = true;
        stop = true;
        timer.innerText = '';
        alert(message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

//이메일
const joinEmail = document.querySelector('#join_email');
const emailChkBtn = document.querySelector('#emailChkBtn');
const emailChk = document.querySelector('#emailChk');

emailChkBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = joinEmail.value;
  const valid = (email) => {
    return /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/.test(email);
  };

  if (!valid(email)) {
    return (
      (emailChk.innerHTML = `<span id="emailChk" style="color:red">&nbsp;사용 할 수 없는 이메일입니다.</span>`),
      (emailValid = false),
      alert('잘못된 이메일 입니다.')
    );
  } else {
    return await axios
      .post('/auth/emailChk/join', {
        email: email,
      })
      .then((request) => {
        const { joined, message } = request.data;
        if (joined) {
          emailChk.innerHTML = `<span id="emailChk" style="color:red">&nbsp;${message}</span>`;
          emailValid = false;
        } else {
          emailChk.innerHTML = `<span id="emailChk" style="color:green">&nbsp;${message}</span>`;
          emailValid = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

let gender;
function getGender(event) {
  gender = event.target.value;
  return gender;
}

const joinBtn = document.querySelector('#join_btn');

joinBtn.addEventListener('click', async (event) => {
  const joinRegion = document.querySelector('#join_region');
  const id = joinId.value;
  const nick = joinNick.value;
  const password = join_password.value;
  const name = joinName.value;
  const birth = joinBirth.value;
  const phone = joinPhone.value;
  const email = joinEmail.value;
  const region = joinRegion.value;

  if (!idValid) {
    return alert('ID 중복확인을 해주세요.');
  }
  if (!nickValid) {
    return alert('닉네임 중복확인을 해주세요.');
  }
  if (!pwdValid) {
    return alert('비밀번호가 일치하지 않습니다.');
  }
  if (!nameValid) {
    return alert('이름을 입력해주세요.');
  }
  if (!birthValid) {
    return alert('생년월일을 입력해주세요');
  }
  // if(!phoneValid){
  //     return alert("전화번호 인증을 받아야합니다.");
  // }
  if (!emailValid) {
    return alert('이메일 중복확인을 해주세요.');
  }
  event.preventDefault();
  if (
    idValid &&
    nickValid &&
    pwdValid &&
    nameValid &&
    birthValid &&
    emailValid
  ) {
    return await axios
      .post('/auth/join', {
        id: id,
        nick: nick,
        pwd: password,
        name: name,
        birthday: birth,
        phone: phone,
        email: email,
        addr: region,
        gender: gender,
      })
      .then((res) => {
        location.href = '/';
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

const cancleBtn = document.querySelector('#cancel_btn');

cancleBtn.addEventListener('click', (event) => {
  location.href = '/';
});
