
let btn = document.querySelector("#buttons")
let screen = document.querySelector("#screen")

let listOfOperations = ['+','-','/','*'];
let forbiddenStart = ['/','*','.'];
let screenSize = 0;
let flag = 0;
let dotFlag = 0;
let leftNumber = 0;
let rightNumber = 0;
let leadingZeroLeft = 0;
let leadingZeroRight = 0;
let dotLeft = 0;
let dotRight = 0;

var operation ="";
var previous = 0;


function replaceIndexFromLast (ind,char)
{
    screen.textContent = screen.textContent.slice(0, screen.textContent.length - ind) + char;


}


function Initialize()
{
    screen.textContent = ""
    flag = 0;
    dotFlag = 0;
    leftNumber = 0;
    rightNumber = 0;
    leadingZeroLeft = 0;
    leadingZeroRight = 0;
    operation ="";
    previous = 0;
    dotLeft = 0;
    dotRight = 0;
}


function isOperation(ch)
{
    for(let op in listOfOperations)
    {
        if(ch == listOfOperations[op]){return true;}
    }
    return false;
}

function applyOperation(op , num)
{
    switch(op)
    {
        case "+":
            return leftNumber+num;    
        case "*":
            return leftNumber*num;
        case "/":
            if(num==0)
            {
                alert("Can't Divide By Zero !!!");
            }
            else{
                return leftNumber/num;    
            }
        case "-":
            return leftNumber-num;
    }

}

btn.addEventListener("click", function(event){

    if(event.target.tagName=="BUTTON")
    {

        const buttonText = event.target.textContent;


        if(buttonText == "Clear")
        {
            Initialize();
        }
        else if (buttonText =="=")
        {
            if(operation =="")
            {
                screen.textContent = leftNumber.toString();
                dotLeft=0;
            }
            else{

                leftNumber = applyOperation(operation,rightNumber);
                screen.textContent = leftNumber.toString();
            }
            if(screen.textContent == "0")
            {
                leadingZeroLeft =1;
            }
            operation="";
        }
        else if (buttonText ==".")
        {
            if(operation =="")
                {
                    if(!dotLeft &&(leadingZeroLeft || leftNumber!=0 ))
                    {
                        screen.textContent +=".";
                        dotLeft = 1;
                    }
                }
                else{
                    if(!dotRight &&(leadingZeroRight || rightNumber!=0 ))
                    {
                        screen.textContent +=".";
                        dotRight = 1;
                    }
                }
                previous =1;
                leadingZeroLeft = 0;
                leadingZeroRight = 0;

        }
        else if (buttonText=='0')
        {
            if(operation=="")
            {
                if(!leadingZeroLeft)
                {
                    if(leftNumber == 0)
                    {
                        leadingZeroLeft = 1;

                    }
                    screen.textContent +="0";
                }
                let leftString = screen.textContent;
                leftNumber = parseFloat(leftString);
            }
            else{
                if(!leadingZeroRight)
                {
                    if(rightNumber == 0)
                    {
                        leadingZeroRight = 1;

                    }
                    screen.textContent +="0";
                }
                let rightString = screen.textContent.split(operation)[1];
                rightNumber = parseFloat(rightString);
            }
        }
        else if (screenSize !=0 || !forbiddenStart.includes(buttonText))
        {
            if(isOperation(buttonText)){
                if(previous){
                    
                    replaceIndexFromLast(2,buttonText+" ")                
                }
                else{
                    if(flag)
                    {
                        leftNumber = applyOperation(operation,rightNumber);
                        screen.textContent = leftNumber.toString();
                        screen.textContent += " " + buttonText +" ";     
                    }
                    else
                    {
                        screen.textContent += " " + buttonText +" ";
                        flag = 1;
                    }
                    previous =0;
                }
                operation = buttonText;

            }
            else{
                
                if(operation =="")
                {
                    if(leadingZeroLeft)
                    {
                        screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
                        leadingZeroLeft = 0;
                    }
                    screen.textContent +=buttonText;
                    let leftString = screen.textContent;
                    leftNumber = parseFloat(leftString);
                }
                else{
                    if(leadingZeroRight)
                    {
                        replaceIndexFromLast(1,"");                
                        leadingZeroRight = 0;
                    }
                    screen.textContent +=buttonText;
                    let rightString = screen.textContent.split(operation)[1];
                    rightNumber = parseFloat(rightString);
                }
                
                previous=0;
            }
            screenSize++;
            
        }
        

    }
});