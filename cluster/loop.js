export function loop(req, res) {
  let sum = 0;
  let n = 100000;

  for (let i = 0; i < n; i++) {
    sum += i;
  }

  return res.json({ message: sum });
}
