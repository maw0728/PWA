const name = document.getElementById("name");
const file = document.getElementById("movie");
const create = document.getElementById("create");

create.onclick = () => {
  if (name.value === "") {
    alert("영화제목을입력해주세요");
  } else if (file.value === "") {
    alert("영화파일을선택해세요");
  } else if (name.value !== "") {
    create.setAttribute("type", "submit");
  }
};
