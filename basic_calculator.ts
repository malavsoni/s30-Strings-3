function isDigit(char: string): boolean {
  let low = "0".charCodeAt(0);
  let max = "9".charCodeAt(0);
  let code = char.charCodeAt(0);
  return code <= max && code >= low;
}
function toNumber(char: string): number {
  return char.charCodeAt(0) - "0".charCodeAt(0);
}
function calculate_with_parenthesis(s: string): number {
  const openBrace = Number.MAX_SAFE_INTEGER;
  const multiplication = Number.MIN_SAFE_INTEGER
  const 
  let calc = 0;
  let num = 0;
  let stack: (number | null)[] = [];
  let lastSign = "+";
  console.log("idx  char  num  lastSign Stack");
  for (let index = 0; index < s.length; index++) {
    let char = s.charAt(index);
    console.log(
      index + " " + char + "  " + num + "  " + lastSign + "  " + stack
    );
    if (isDigit(char)) {
      num = num * 10 + toNumber(char);
      if (index == s.length - 1) {
        if (lastSign == "+") {
          stack.push(num);
        } else if (lastSign == "-") {
          stack.push(-num);
        }
      }
    }
    if ((isDigit(char) == false && char != " ") || index == s.length - 1) {
      if (char == "(") {
        if (lastSign == "+") {
          stack.push(1);
        } else if (lastSign == "-") {
          stack.push(-1);
        }
        stack.push(openBrace);
        lastSign = "+";
        num = 0;
      } else if (char == ")") {
        if (lastSign == "+") {
          stack.push(num);
        } else if (lastSign == "-") {
          stack.push(-num);
        }
        let temp = 0;
        while (stack[stack.length - 1] != openBrace) {
          temp = temp + (stack.pop() ?? 0);
        }
        stack.pop();
        temp = temp * (stack.pop() ?? 1);
        stack.push(temp);
        num = 0;
        lastSign = "+";
      } else if (char == "+" || char == "-") {
        if (lastSign == "+") {
          stack.push(num);
        } else if (lastSign == "-") {
          stack.push(-num);
        }
        lastSign = char;
        num = 0;
      }
    }
  }

  while (stack.length > 0) {
    calc = calc + (stack.pop() ?? 0);
  }

  return calc;
}

describe("Basic Calculator", () => {
  it("Happy Path", () => {
    expect(calculate_with_parenthesis("(1-(4+5-2)+6)+(1+2)")).toStrictEqual(3);
  });

  it("Edge Case", () => {
    expect(calculate_with_parenthesis("(2*(4+5-2)+6)+(1+2)")).toStrictEqual(3);
  });
});
