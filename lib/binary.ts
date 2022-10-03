type TestDirection = "GT" | "LT";

async function binarySearch(
  test: (value: number) => Promise<boolean>,
  direction: TestDirection,
  opts?: {
    initial?: number;
    lower?: number;
    upper?: number;
    epsilon?: number;
  }
) {
  let current = opts?.initial ?? 1000000;
  let epsilon = opts?.epsilon ?? 10000;
  let lower = opts?.lower ?? 0;
  let upper = opts?.upper ?? Infinity;

  function roundEpsilon(n: number) {
    return Math.round(n / epsilon) * epsilon;
  }

  let n = 0;
  while (upper - lower > epsilon) {
    await new Promise((r) => setTimeout(r, 100));

    let result = await test(current);
    if (direction == "LT") result = !result;

    if (result) {
      upper = current;
      current = roundEpsilon((upper + lower) / 2);
    } else {
      lower = current;
      current = roundEpsilon((Math.min(upper, 2 * current) + lower) / 2);
    }

    n += 1;
    process.stderr.write(
      "round: " + n + "\tbounds: [" + lower + ", " + upper + "]\n"
    );
  }

  return { upper, lower, n };
}

export { binarySearch, TestDirection };
