const name = document.getElementById("name");
const file = document.getElementById("movie");
const update = document.getElementById("update");

update.onclick = () => {
  if (name.value === "") {
    alert("영화제목을입력해주세요");
  } else if (name.value !== "") {
    update.setAttribute("type", "submit");
  }
};
