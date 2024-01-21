function getUser() {}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    return alert("이름을 입력하세요.");
  }
  try {
    // await axios.post("/user", { name });
    console.log({ name });
  } catch (error) {
    console.error(error);
  }
  e.target.username.value = "";
});
