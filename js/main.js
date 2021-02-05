//get id 
function getId(id) {
    return document.getElementById(id);
}

// generate pin event
let count = 3;// for try left
getId('pin-generate').addEventListener('click', () => {
    const sixDigitPin = getGeneratedPin(6); // store 6 digit generated pin 
    getId('match-msg').style.display = 'block';//show pin generated success message
    setMessage('✅ New Pin Generated !');// set message for generate success
    getId('generated-pin').value = sixDigitPin;// showing generated pin
    count = 3; // set count value
    getId('timing-count').style.display = 'block';//show  trying left section
    getId('count-left').innerText = count;// show trying left
    getId('user-pin').value = '';//clear user pin field
})

// pin matching event
getId('match-pin').addEventListener('click', () => {
    if (count >= 1) {
        count = count - 1;//decrees trying left
        getId('count-left').innerText = count;
        handlePinMatch();//pin matching if you have trying left option
    } else {
        // executed when you don't have trying left option
        getId('user-pin').value = '';//clear user pin 
        getId('generated-pin').value = '';//clear generated pin
        tryLeftHide();// hide try left 
        setMessage('❌ Pin disabled ! Generated new pin and try again.');// show disable message
    }
})

//get  Generate pin 
function getGeneratedPin(n) {
    const minNum = Math.pow(10, n), //set minimum number for pin
        pinNum = Math.round(Math.random() * minNum) + minNum, // create random pin number larger one from "n" number
        pinStr = "" + pinNum; // convert pin number to string
    return pinStr.substring(1); // remove larger one number from pin number and return 
}

// pin matching handler
function handlePinMatch() {
    const generatedPin = getId('generated-pin').value; // catch generated pin
    const userPin = getId('user-pin').value; // catch user pin

    if (generatedPin == '') {
        // generate pin is empty.
        getId('match-msg').style.display = 'block'; // show message section
        setMessage("❌ No pin generated, Please generate a pin.");// set message
        tryLeftHide();// hide try left
    }
    else if (generatedPin === userPin) {
        // generated pin and user pin is match
        setMessage('✅ Pin Matched... Secret door is opening for you'); // set message
        tryLeftHide(); // hide try left
        getId('generated-pin').value = '';//clear generated pin
        getId('user-pin').value = ''; // clear user pin
    }
    else if (count == 0) {
        // you have not trying left option
        getId('user-pin').value = ''; // clear user value
        getId('generated-pin').value = '';// clear generated value
        tryLeftHide(); // hide try left
        setMessage('❌ Pin disabled ! Generated new pin and try again.'); // set message
    }
    else if (userPin == '') {
        // user pin is empty
        setMessage("❌ Your pin is empty, Please input a pin."); // set message

    }
    else {
        getId('user-pin').value = '';//clear user value
        // user pin is not match
        setMessage("❌ Pin Didn't Match, Please try again");// set message
    }
}

// hide try left section 
function tryLeftHide() {
    getId('timing-count').style.display = 'none';// hide try left
}

//set message 
function setMessage(message) {
    getId('match-msg').innerHTML = message;
}

//showing value in input field when click  button
function inputBtnHandle(event) {
    const inputValue = event.target.innerText;//catch button inner value
    if (isNaN(inputValue)) {
        // not a digit  
        // clear button handel
        if (inputValue === 'C') {
            getId('user-pin').value = '';// clear user pin
        }
    } else {
        // digit
        const userPinId = getId('user-pin');//catch user pin id
        // for maximum 6 digit
        if (userPinId.value.length < 6) {
            getId('user-pin').value += inputValue;// catch user pin and add new user pin
        }

    }

}

// remove last one value in input field
function backspace() {
    const userPinId = getId('user-pin')// catch user pin id
    let userPin = userPinId.value; //catch user pin
    userPinId.value =
        userPin.substr(0, userPin.length - 1); // remove last number and set again
}

// remove catch data
function removeCatch() {
    getId('user-pin').value = '';//clear user pin
    getId('generated-pin').value = '';//clear generated pin
    tryLeftHide();//hide try left
}
