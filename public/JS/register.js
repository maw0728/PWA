const idCheck = document.getElementById("id-overlap-check");
idCheck.onclick = async () => {
  let idsCheck;
  try {
    idsCheck = await axios.post("/register/idCheck", {
      ids: document.getElementById("id").value,
    });
    if (idsCheck.data.check == true) {
      alert("중복된아이디");
    } else if (idsCheck.data.check ==false){
      alert('사용가능한아이디입니다')
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
    }else if (nicksCheck.data.check ==false){
      alert('사용가능한닉네임입니다')
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
  console.log('a'+passValue);
  console.log('b'+checkValue);
  if (passValue === checkValue) {
    passwordCheck.style.outlineColor ='black'
  } else {
    passwordCheck.style.outlineColor ='red'
  }
}