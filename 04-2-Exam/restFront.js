async function getUser() {
  try {
    const res = await axios.get("/users");
    const users = res.data;
    const list = document.getElementById("list");
    list.innerHTML = "";
    Object.keys(users).map((key) => {
      const userDiv = document.createElement("div");
      const span = document.createElement("span");
      const edit = document.createElement("button");
      span.textContent = users[key];
      edit.textContent = "수정";
      edit.addEventListener("click", async () => {
        const editName = prompt("수정할 이름을 입력해주세요.");
        if (!editName) {
          return alert("이름을 반드시 입력하여야 합니다.");
        }
        try {
          await axios.put("/user/" + key, { name: editName });
          getUser();
        } catch (error) {
          console.error(error);
        }
      });
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        try {
          await axios.delete("/user/" + key);
          getUser();
        } catch (error) {
          console.error(error);
        }
      });
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
    });
  } catch (error) {
    console.error(error);
  }
}

window.onload = getUser;

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    alert("이름을 입력해주세요.");
  }
  try {
    await axios.post("/user", { name });
    getUser();
    e.target.username.value = "";
  } catch (error) {
    console.error(error);
  }
});
