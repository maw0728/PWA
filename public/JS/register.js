const idCheck = document.getElementById("id-overlap-check");
idCheck.onclick = async () => {
  let idsCheck;
  try {
    idsCheck = await axios.post("/register/idCheck", {
      ids: document.getElementById("id").value,
    });
    if (idsCheck.data.check == true) {
      alert("중복된아이디");
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
    }
  } catch (error) {
    console.log(error);
  }
};
