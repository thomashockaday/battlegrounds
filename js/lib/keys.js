const keys = [];

window.addEventListener("keydown", (e) => {
  const { key } = e;

  if (!keys.includes(key)) {
    keys.push(key);
  }
});

window.addEventListener("keyup", (e) => {
  const { key } = e;

  if (keys.includes(key)) {
    keys.splice(keys.indexOf(key), 1);
  }
});

export default keys;
