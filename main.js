const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const customeTipInput = document.getElementById("custom_tip");
const tipButtons = document.querySelectorAll('.tip-buttons button');
const errorMessage = document.querySelector(".error_text");

const tip_amount = document.querySelector('.tip_amount');
const total_amount = document.querySelector('.total_amount');

const resetBtn = document.querySelector('.reset-btn');

let tipAmount = 0;
errorMessage.innerText = '';

function removeActiveClass() {
    tipButtons.forEach((button) => button.classList.remove('active'));
}


tipButtons.forEach((tipButton) => {
    tipButton.addEventListener('click', (event) => {
        //console.log(event.target.innerText.replace("%", ""));
        removeActiveClass();
        event.target.classList.add('active');
        tipAmount = event.target.innerText.replace("%", "");
    })
})

const billCalcuationLogic = (billAmount, numberOfPeople, tipAmount) => {
    console.log("Bill amount ", billAmount);
    console.log("Number of People ", numberOfPeople);
    console.log("custome tip ", tipAmount);

    const totalTip = billAmount * (tipAmount / 100);
    const tipPerPerson = totalTip / numberOfPeople;
    //console.log(tipPerPerson);
    tip_amount.innerText = `$${tipPerPerson.toFixed(2)}`;

    const totalPerPerson = (billAmount + totalTip) / numberOfPeople;
    //console.log(totalPerPerson);
    total_amount.innerText = `$${totalPerPerson.toFixed(2)}`;
    resetBtn.disabled = false;
}

resetBtn.addEventListener('click', () => {
    billInput.value = 0;
    removeActiveClass();
    peopleInput.value = 0;
    customeTipInput.value = "";
    tip_amount.innerText = `$0`;
    total_amount.innerText = `$0`;
    resetBtn.disabled = true;
})

function checkInputValidation(billAmount, numberOfPeople, customeTip) {
    if (billAmount <= 0) {
        alert("Bill amount can't be negative");
    } else if (numberOfPeople <= 0) {
        alert("Number of people can't be negative");
    } else if (customeTip <= 0) {
        alert("Custome Tip amount can't be negative");
    }

    if (customeTip > 1) {
        removeActiveClass();
    }



    if (numberOfPeople <= 0) {
        errorMessage.innerText = 'Can’t be zero';
    }

}

const inputChangeHandler = () => {
    const billAmount = Number(billInput.value) || 1;
    const numberOfPeople = Number(peopleInput.value) || 1;
    let customeTip = Number(customeTipInput.value) || 1;

    checkInputValidation(billAmount, numberOfPeople, customeTip);



    // console.log("Bill amount ", billAmount);
    // console.log("Number of People ", numberOfPeople);
    // console.log("custome tip ", customeTip);

    if (customeTip === 1) {
        customeTip = tipAmount;
    }

    billCalcuationLogic(billAmount, numberOfPeople, customeTip)
}

billInput.addEventListener('change', inputChangeHandler)
peopleInput.addEventListener('change', inputChangeHandler)
customeTipInput.addEventListener('change', inputChangeHandler)
