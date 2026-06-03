const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const customTipInput = document.getElementById("custom_tip");
const tipButtons = document.querySelectorAll('.tip-buttons button');
const errorMessage = document.querySelector(".error_text");

const tipAmountElement = document.querySelector('.tip_amount');
const totalAmountElement = document.querySelector('.total_amount');

const resetBtn = document.querySelector('.reset-btn');

errorMessage.innerText = '';
let tipAmount = 0;

const calculate = () => {
    const billAmount = Number(billInput.value);
    const numberOfPeople = Number(peopleInput.value);
    const tip = Number(customTipInput.value) || tipAmount;

    if (billAmount <= 0 || tip <= 0) {
        return;
    }

    if (numberOfPeople <= 0) {
        errorMessage.innerText = "Can’t be zero";
        return;
    }

    errorMessage.innerText = "";

    if (customTipInput.value > 0) {
        removeActiveClass();
    }

    const totalTip = billAmount * (tip / 100);



    tipAmountElement.innerText = `$${(totalTip / numberOfPeople).toFixed(2)}`;
    totalAmountElement.innerText = `$${((billAmount + totalTip) / numberOfPeople).toFixed(2)}`;

    resetBtn.disabled = false;
}



[billInput, peopleInput, customTipInput].forEach((input) => {
    input.addEventListener('input', calculate)
})

const removeActiveClass = () => {
    tipButtons.forEach((button) => button.classList.remove("active"));
}

tipButtons.forEach((button) => {
    button.addEventListener('click', () => {
        removeActiveClass();
        button.classList.add("active");
        customTipInput.value = "";
        tipAmount = Number(button.textContent.replace("%", ""));
        calculate()
    })
})


function resetCalculator() {
    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";
    removeActiveClass();
    tipAmountElement.innerText = "$0.00";
    totalAmountElement.innerText = "$0.00";
    resetBtn.disabled = true;
    tipAmount = 0;
}

resetBtn.addEventListener('click', () => {
    resetCalculator();
})

resetCalculator();
