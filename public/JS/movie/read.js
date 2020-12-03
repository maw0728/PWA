// 라이브리로드
// document.write(
//   '<script src="http://' +
//     (location.host || "localhost").split(":")[0] +
//     ':35729/livereload.js?snipver=1"></' +
//     "script>"
// );

const updates = document.getElementById("update");
const deletes = document.getElementById("delete");

updates.onclick = () => {
  location.href = "/movie/update/" + updates.className;
};
deletes.onclick = () => {
  location.href = "/movie/delete/{{movie.id}}" + updates.className;
};
