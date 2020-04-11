const electron = require("electron");
const { ipcRenderer } = electron;

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const { path } = document.querySelector("input").files[0];
  ipcRenderer.send("video:submit", path);
});

ipcRenderer.on("video:duration", (e, data) => {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = Math.ceil(data);
});
