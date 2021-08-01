const f = async (n: number) => {
  const start = new Date().getTime();
  let x = 0;
  for (let i = 0; i < n; ++i) {
    x += i * i;
  }
  const end = new Date().getTime();
  console.log(n, " started ", start, " ended ", end, " elased ", end - start);
  return x;
};

const g = async () => {
  console.log("g start");
  for (let i = 0; i < 10; ++i) {
    f(10000000000 * i).then((x: number) => console.log(i, " -> ", x));
    console.log("started");
  }
  console.log("g done");
};

g();
console.log("main start");
for (let i = 0; i < 4; ++i) {
  f(10000000000 * i).then((x: number) => console.log(i, " -> ", x));
  console.log("started");
}
console.log("main done");
