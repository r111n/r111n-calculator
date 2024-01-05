const numberKeys = document.querySelectorAll(".button")
const displayInput = document.querySelector(".input")
const displayOutput = document.querySelector(".output")

let initialInput = ""
let operators = ["+", "-", "*", "/"]

for (let key of numberKeys) {
    const value = key.dataset.key
    key.addEventListener("click", () => {
        if(value === "allClear"){
            initialInput = ""
            displayInput.innerHTML = ""
            displayOutput.innerHTML = ""
        }else if (value === "clear") {
            initialInput = initialInput.slice(0, -1)
            displayInput.innerHTML = showResult(initialInput)
        }else if(value === "=") {
            if(initialInput === ''){
                return
            }
            let result = eval(checkModulo(initialInput))
            displayOutput.innerHTML = showResult(result)
            initialInput = result
        }else{
            if(initialInput === ''){
                if(operators[0] === value || operators[2] === value || operators[3] === value){
                    return
                }
            }
            initialInput += value
            displayInput.innerHTML = initialInput
        }
    })
}


const checkModulo = (input) => {
    let arr = input.split("")
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == "%") {
			arr[i] = "/100"
		}
	}
	return arr.join("");
}

const checkInput = (value) => {
    let end = initialInput.slice(-1)
	if (value == "." && end == ".") {
		return false;
	}
	if (operators.includes(value)) {
		if (operators.includes(end)) {
			return false;
		} else {
			return true;
		}
	}
	return true;
}

const prepInput = () => {
    let arr = initialInput.split("");

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == "*") {
			arr[i] = ` <span class="operator">x</span> `
		} else if (arr[i] == "/") {
			arr[i] = ` <span class="operator">÷</span> `
		} else if (arr[i] == "+") {
			arr[i] = ` <span class="operator">+</span> `
		} else if (arr[i] == "-") {
			arr[i] = ` <span class="operator">-</span> `
		} else if (arr[i] == "(") {
			arr[i] = `<span class="brackets">(</span>`
		} else if (arr[i] == ")") {
			arr[i] = `<span class="brackets">)</span>`
		} else if (arr[i] == "%") {
			arr[i] = `<span class="percent">%</span>`
		}
	}

	return arr.join("");
}

const showResult =  (output) => {

    let resultString = output.toString();
    let decimalIndex = resultString.indexOf(".");

    if (decimalIndex !== -1) {
        let integerPart = resultString.substring(0, decimalIndex);
        let decimalPart = resultString.substring(decimalIndex + 1, decimalIndex + 3);
        resultString = integerPart + "." + decimalPart;
    }

    let arr = resultString.split("");
    if (arr.length > 3) {
        for (let i = arr.length - 3; i > 0; i -= 3) {
            arr.splice(i, 0, ",");
        }
    }
    if(arr[0] < 1){
        const comma = ',';
        const index = arr.indexOf(comma);
        arr.splice(index, 1)
    }

    console.log(arr)

    return arr.join("")
}