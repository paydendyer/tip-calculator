  let tipSelectBtn = document.getElementById("btns");
  let billInput = document.getElementByClassName("billInput");
  let billEl = document.getElementById("bill");
  let numberPeople = document.getElementById("num-people");
  let btnTip = document.getElementsByClassName("tip-btn");
  let resetBtn = document.getElementById("reset");
  let customInput = document.getElementById("custom");
  let tipAmountTotal = document.getElementById("tip-amount-value");
  let totalAmountPerPerson = document.getElementById("total-value");
  let errorMessage = document.getElementById("error-msg");

  let bill = 0;
  let tip = 0;
  let persons = 0;

  billEl.addEventListener("input", (e) => {
    bill = Number(billEl.value);
    resetBtn.style.opacity = "1";
    document.getElementById("num-people").style.border="1px solid red";
    errorMessage.style.display="block";
    calculate();
  })

  btnTip.forEach((tipButton) => {
    tipButton.addEventListener("click", (event) => {
      tip = Number(tipButton.value);
      let target = event.currentTarget;
      btnTip.forEach(item => {
        if(item != tipButton) {
          item.classList.remove("active-btn")
        }
      });
tipButton.classList.toggle("active-btn");

if(target.classList.contains("active-btn")) {
  customInput.disabled = true;
  customInput.value = "";
  calculate();
}
else {
  customInput.disabled = false;
}
    })
  })
  customInput.addEventListener("input", (event) => {

    customInput.style.backgroundColor = "white";
    tip = Number(customInput.value);
    calculate();
  })

  numberPeople.addEventListener("input", (e) => {
    persons = Number(numberPeople.value);

    if(persons <=0) {
      errorMessage.style.display="block";
    }
    else {
      errorMessage.style.display="none";
      document.getElementById("num-people").style.border="";
      calculate();
    }
  })
  
  resetBtn.addEventListener("click", function() {
    billEl.value=="";
    customInput.value="";
    customInput.disabled = false;
    numberPeople.value = "";

    btnTip.forEach(tipButton => {
      tipButton.classList.remove("active-btn");
    })

    resetBtn.style.opacity = "0";
    document.getElementById("num-people").style.border = "";

    tipAmountTotal.textContent = "$0.00";
    totalAmountPerPerson.textContent = "$0.00";
    errorMessage.style.display = "none";
  })

  function calculate() {
    if(bill >= 0 && persons >= 1){
      let amountTip = (bill * tip) / 100;
      let totalAmount = amountTip + bill;

      tipAmountTotal.textContent = "$" + (amountTip/persons).toFixed(2);
      totalAmountPerPerson = "$" +(totalAmount/persons).toFixed(2);
    }
  }