let idState = 0
let passwordState=0
let nickState=0

const idCheck = document.getElementById("id-overlap-check");
idCheck.onclick = async () => {
  let idsCheck;
  try {
    idsCheck = await axios.post("/register/idCheck", {
      ids: document.getElementById("id").value,
    });
    if (idsCheck.data.check == true) {
      alert("중복된아이디");
      idState=1
    } else if (idsCheck.data.check ==false){
      alert('사용가능한아이디입니다')
      idState=2
    }
  } catch (error) {
    console.log(error);
  }
};

const nickCheck = document.getElementById("nick-overlap-check");
nickCheck.onclick = async () => {
  let nicksCheck;
  try {
    nicksCheck = await axios.post("/register/nickCheck", {
      nicks: document.getElementById("nick").value,
    });
    if (nicksCheck.data.check == true) {
      alert("중복된닉네임");
      nickState=1
    }else if (nicksCheck.data.check ==false){
      alert('사용가능한닉네임입니다')
      nickState=2 
    }
  } catch (error) {
    console.log(error);
  }
};

const password = document.getElementById('password');
const passwordCheck = document.getElementById('password-check');

passwordCheck.onkeyup=()=>{
  const passValue = password.value
  const checkValue = passwordCheck.value
  if (passValue === checkValue) {
    passwordCheck.style.outlineColor ='black'
    passwordState=2
  } else {
    passwordCheck.style.outlineColor ='red'
    passwordState=1
  }
}


const sumbit = document.getElementById('submit')

sumbit.onclick= ()=>{
  const a= idState
  const b= passwordState
  const c=nickState
  if (a===0) {
    alert('id를입력해주세요')
  }else if(a===1){
    alert('중복된 아이디 입니다 다른아이디를 입력해주세요')
  } else if(b===0){
    alert('비밀번호를 입력해주세요')
  } else if (b===1){
    alert('비밀번호가 일치하지 않습니다 다시 확이해주세요')
  }else if (c===0){
    alert('닉네임을 입력해주세요')
  }else if(a===1){
    alert('중복된 닉네임 입니다 다른닉네임을 입력해주세요')
  } else if(a===2 &&b===2&&c===2){
    sumbit.setAttribute('type','submit')
  }
}

const cancel = document.getElementById('cancel')

cancel.onclick= ()=>{
  window.location.href='/'
}