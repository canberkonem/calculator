const buttons = [
    {
        name:"clear",
        type:"key",
        formula: false,
        symbol:"C"
    },{
        name:"delete",
        type:"key",
        formula: false,
        symbol:"DEL"
    },{
        name:"percent",
        type:"number",
        formula:"/100",
        symbol:"%"
    },{
        name:"divide",
        type:"operator",
        formula: "/",
        symbol:"÷"
    },{
        name:"7",
        type:"number",
        formula: 7,
        symbol:7
    },{
        name:"8",
        type:"number",
        formula: 8,
        symbol:8
    },{
        name:"9",
        type:"number",
        formula:9,
        symbol:9
    },{
        name:"multiply",
        type:"operator",
        formula: "*",
        symbol:"×"
    },{
        name:"4",
        type:"number",
        formula:4,
        symbol:4
    },{
        name:"5",
        type:"number",
        formula:5,
        symbol:5
    },{
        name:"6",
        type:"number",
        formula:6,
        symbol:6
    },{
        name:"substract",
        type:"operator",
        formula: "-",
        symbol:"-"
    },{
        name:"1",
        type:"number",
        formula:1,
        symbol:1
    },{
        name:"2",
        type:"number",
        formula:2,
        symbol:2
    },{
        name:"3",
        type:"number",
        formula:3,
        symbol:3
    },{
        name:"addition",
        type:"operator",
        formula: "+",
        symbol:"+"
    },{
        name:"0",
        type:"number",
        formula:0,
        symbol:0
    },{
        name:"dot",
        type:"number",
        formula: ".",
        symbol:"."
    },{
        name:"equal",
        type:"equal",
        formula: "=",
        symbol:"="
    }

]

const operationDisplay = document.querySelector(".operation-display")
const resultDisplay = document.querySelector(".result-display")
const inputButtons = document.querySelector(".input-container")


function createButtons(){
    let addedButtons = 0;
    buttons.forEach((button) => {
        if(addedButtons % 4 === 0){
            inputButtons.innerHTML += `<div class="row"></div>`
        }
        const row = document.querySelector(".row:last-child")
        row.innerHTML += `<div id="${button.name}" class="${button.type}">${button.symbol}</div>`
        addedButtons++
    })
}

createButtons()


inputButtons.addEventListener("click", event=>{
    const targetBtn = event.target;
    
    buttons.forEach(button =>{
        if(targetBtn.id == button.name) calculator(button)
    })
})

let storeData = {
    operation:[],
    result:[]
}
    

function calculator(button){
    if(button.type == "number"){
        if(button.name == "0" && operationDisplay.innerHTML=="0")
        return;
        storeData.operation.push(button.symbol)
        storeData.result.push(button.formula)
    }else if(button.type == "operator"){
        storeData.operation.push(button.symbol)
        storeData.result.push(button.formula)
    }else if(button.type == "key"){
        if(button.name == "clear"){
            storeData.operation = []
            storeData.result = []
            resultDisplayUpdate(0)
        }else if(button.name=="delete"){
            storeData.operation.pop()
            storeData.result.pop()
        }

    }else if(button.type == "equal"){
        let result_joined = storeData.result.join("")

        let result
        try{
            result = eval(result_joined)
        } catch (error){
            if(error instanceof SyntaxError){
                result = "Syntax Error!";
                resultDisplayUpdate(result)
                return
            }
        }
        result = formatResult(result)
        resultDisplayUpdate(result)

        storeData.operation=[]
        storeData.result=[]

        storeData.operation.push(result)
        storeData.result.push(result)
        return
    } 
    operationDisplayUpdate(storeData.operation.join(""))

}

function operationDisplayUpdate(data){
    operationDisplay.innerHTML= data
}

function resultDisplayUpdate(data){
    resultDisplay.innerHTML = data
}

function formatResult(result){
    const max_output_number_length = 10
    const output_precision = 5

    if(digitCounter(result) > max_output_number_length){
        if (isFloat(result)){
            const result_int = parseInt(result);
            const result_int_length = digitCounter(result_int)
            
            if(result_int> max_output_number_length){
                return result.toPrecision(output_precision)
            }else{
                const num_of_digits_after_point = max_output_number_length- result_int_length;
                return result.toFixed(num_of_digits_after_point)
            }
        }else{
            return result.toPrecision(output_precision)
        }
    }else{
        return result;
    }

}

function digitCounter(number){
    return number.toString().length
}

function isFloat(number){
    return number%1 != 0;
}