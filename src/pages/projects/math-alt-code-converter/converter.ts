const tokens = {
    pi: "&pi;",
    deg: "&deg;",
    "*": "&times;",
    int: "&int;",
    sqrt: "&Sqrt;",
    cbrt: "&#8731;",
    frthrt: "&#8732;",
    ">=": "&geq;",
    "<=": "&leq;",
    "(+-)": "&pm;",
    inf: "&infin;",
    "->": "&rarr;",
    sum: "&sum;",
    delta: "&Delta;",
    part: "&part;",
};

const fractions = {
    "1/2": "½",
    "1/3": "⅓",
    "2/3": "⅔",
    "1/4": "¼",
    "3/4": "¾",
    "1/5": "⅕",
    "2/5": "⅖",
    "3/5": "⅗",
    "4/5": "⅘",
    "1/6": "⅙",
    "5/6": "⅚",
    "1/7": "⅐",
    "1/8": "⅛",
    "3/8": "⅜",
    "5/8": "⅝",
    "7/8": "⅞",
    "1/9": "⅑",
    "1/10": "⅒",
};

const superscripts = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
    "+": "⁺",
    "-": "⁻",
    "=": "⁼",
    "(": "⁽",
    ")": "⁾",
    a: "ᵃ",
    b: "ᵇ",
    c: "ᶜ",
    d: "ᵈ",
    e: "ᵉ",
    f: "ᶠ",
    g: "ᵍ",
    h: "ʰ",
    i: "ⁱ",
    j: "ʲ",
    k: "ᵏ",
    l: "ˡ",
    m: "ᵐ",
    n: "ⁿ",
    o: "ᵒ",
    p: "ᵖ",
    r: "ʳ",
    s: "ˢ",
    t: "ᵗ",
    u: "ᵘ",
    v: "ᵛ",
    w: "ʷ",
    x: "ˣ",
    y: "ʸ",
    z: "ᶻ",
    " ": " ",
};

function parser(expression: string): string {
    let finalStr = "";
    let index = 0;

    charLooper: while (index < expression.length) {
        const char = expression.charAt(index);
        if (char === '"') {
            let end = expression.indexOf('"', index + 1);
            if (end === -1) end = expression.length;

            let subStr = expression.substring(index + 1, end);
            finalStr += subStr;
            index += subStr.length + 2;
            continue;
        }

        const validChars = Object.entries(tokens).map(([key, _]) => key[0]);

        if (validChars.includes(char)) {
            for (const [key, value] of Object.entries(tokens)) {
                if (expression.substring(index).startsWith(key)) {
                    finalStr += value;
                    index += key.length;
                    continue charLooper;
                }
            }
        }

        for (const [key, value] of Object.entries(fractions)) {
            if (expression.startsWith(key, index)) {
                finalStr += value;
                index += key.length;
                continue charLooper;
            }
        }

        if (char === "^") {
            const nextChar = expression.charAt(index + 1);
            if (nextChar === "(") {
                let end = expression.indexOf(")", index + 2);
                if (end === -1) end = expression.length;

                let rawSubStr = expression.substring(index + 2, end);
                let subStr = "";
                for (const c of rawSubStr) {
                    if (!Object.keys(superscripts).includes(c)) {
                        finalStr += "^(" + rawSubStr + ")";
                        index += rawSubStr.length + 3;
                        continue charLooper;
                    }
                    subStr += (superscripts as any)[c];
                }
                finalStr += subStr;
                index += rawSubStr.length + 3;
                continue;
            } else {
                const superscript = (superscripts as any)[nextChar];
                if (superscript) {
                    finalStr += superscript;
                    index += 2;
                    continue;
                }
            }
        }

        finalStr += char;
        index++;
    }

    return finalStr;
}

function submitInit() {
    const expressionForm = document.getElementById("expression-form");
    const submitButton = document.getElementById("submit");
    submitButton!.addEventListener("click", (e) => {
        e.preventDefault();
        const expressionString = new FormData(
            expressionForm as HTMLFormElement
        ).get("expression") as string;
        const value = parser(expressionString);
        document.getElementById("answer")!.innerHTML = value;
    });
}

export default submitInit;