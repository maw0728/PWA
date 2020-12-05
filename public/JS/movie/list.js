const note = document.getElementsByClassName("note");

if (note.className === null) {
  note.style.color = "red";
}

note.onclick = () => {
  alert(note.id);
};

// 라이브리로드
document.write(
  '<script src="http://' +
    (location.host || "localhost").split(":")[0] +
    ':35729/livereload.js?snipver=1"></' +
    "script>"
);

const create = document.getElementById("create");

create.onclick = () => {
  location.href = "create";
};
