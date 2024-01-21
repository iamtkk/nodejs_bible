const a = true;
if (a) {
  const m1 = await import("./func.mjs");
  console.log(m1);
  // const m2 = await import("./var.mjs");
  const m2 = import("./var.mjs").then((result) => result);
  // console.log(m2);
  m2.then((result) => console.log(result));
}

console.log("성공");
