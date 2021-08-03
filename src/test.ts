const foo = (x: number, acc: number, n: number): number => {
  if (n < 0) {
    return acc;
  } else {
    return foo(x + 1, acc + x * x, n - 1);
  }
};

const f = async (n: number) => {
  const start = new Date().getTime();
  const result = foo(0, 0, n);
  const end = new Date().getTime();
  console.log(n, " started ", start, " ended ", end, " elased ", end - start);
  return result;
};

const g = async () => {
  console.log("g start");
  for (let i = 0; i < 10; ++i) {
    f(1000 * i).then((x: number) => console.log(i, " -> ", x));
    console.log("started");
  }
  console.log("g done");
};

g();
console.log("main start");
for (let i = 0; i < 4; ++i) {
  f(100 * i).then((x: number) => console.log(i, " -> ", x));
  console.log("started");
}
console.log("main done");
