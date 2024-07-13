function pinGenerate() {
  let pin;
  do {
    pin = Math.floor(Math.random() * 10000);
    console.log(pin);
  } while (pin < 1000); // Ensures pin is always 4 digits
  return pin;
}

let pinGlobalAccess;

document.getElementById("generate_pin_btn").addEventListener("click", () => {
  const pin = pinGenerate();
  const displayPin = document.getElementById("generate_pin_field");
  displayPin.value = pin;
  pinGlobalAccess = pin;
});

document.getElementById("operating_btn").addEventListener("click", (e) => {
  const btn = e.target.innerText;
  const typedField = document.getElementById("typed_field");

  if (btn.length === 1 && btn !== "<" && btn !== "C") {
    if (typedField.value.length < 4) {
      typedField.value += btn;
    }
  } else if (btn === "<") {
    typedField.value = typedField.value.slice(0, -1);
  } else if (btn === "C") {
    typedField.value = "";
  }
});

document.getElementById("submit_btn").addEventListener("click", () => {
  const displayPin = document.getElementById("generate_pin_field");
  const typedPin = document.getElementById("typed_field").value;

  const msgSuccess = document.getElementById("msg_success");
  const msgDeny = document.getElementById("msg_deny");
  const failureChance = document.getElementById("failure_chance");

  if (failureChance.innerText == 0) {
    location.reload(true);
  }
  console.log(pinGlobalAccess);
  if (
    pinGlobalAccess == typedPin &&
    displayPin.value !== "" &&
    typedPin !== ""
  ) {
    msgSuccess.style.display = "block";
    msgDeny.style.display = "none";
  } else {
    msgDeny.style.display = "block";
    msgSuccess.style.display = "none";
    if (+failureChance.innerText > 0) {
      failureChance.innerText = +failureChance.innerText - 1;
    }
  }
});
