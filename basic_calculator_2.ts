function isDigit(char: string): boolean {
  let low = "0".charCodeAt(0);
  let max = "9".charCodeAt(0);
  let code = char.charCodeAt(0);
  return code <= max && code >= low;
}
function toNumber(char: string): number {
  return char.charCodeAt(0) - "0".charCodeAt(0);
}
function calculate(s: string): number {
  let calc = 0;
  let tail = 0;
  let currentNum = 0;
  let lastSign = "+";
  for (let index = 0; index < s.length; index++) {
    let char: string = s.charAt(index);
    if (isDigit(char)) {
      let num = toNumber(char);
      currentNum = currentNum * 10 + num;
    }
    if ((!isDigit(char) && char != " ") || index == s.length - 1) {
      if (lastSign == "+") {
        calc = calc + currentNum;
        tail = currentNum;
      } else if (lastSign == "-") {
        calc = calc - currentNum;
        tail = -currentNum;
      } else if (lastSign == "*") {
        calc = calc - tail + tail * currentNum;
        tail = tail * currentNum;
      }
      currentNum = 0;
      lastSign = char;
    }
  }
  return calc;
}

describe("Basic Calculator 2", () => {
  it("Happy Path", () => {
    expect(calculate("12+2-3*4+6")).toStrictEqual(8);
  });
});
