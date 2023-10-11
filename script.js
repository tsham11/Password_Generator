document.addEventListener("DOMContentLoaded", (event) => {
  const range = document.getElementById("myRange");
  var output = document.getElementById("val");

  output.innerHTML = range.value; //for slider value

  // slider background color and value
  range.oninput = function () {
    const valueSlider = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.background =
      "linear-gradient(to right, #A4FFAF 0%, #A4FFAF " +
      valueSlider +
      "%, #18171F " +
      valueSlider +
      "%, #18171F 100%)"; //for color
    output.innerHTML = this.value; //for slider value
  };

  //for copying the password
  function copy() {
    const copyText = document.getElementById("psw");
    const copyMessage = document.getElementById("msg");
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.textContent);
    copyMessage.textContent = "Copied";
    // Clear the "copied" message after three seconds
    setTimeout(function () {
      copyMessage.textContent = "";
    }, 2000);
  }

  //to connect checkboxes to bar
  const upperCheckbox = document.getElementById("upper");
  const lowercaseCheckbox = document.getElementById("lowercase");
  const numbersCheckbox = document.getElementById("numbers");
  const symbolsCheckbox = document.getElementById("symbols");
  const bars = document.querySelectorAll(".bar");
  const strengthText = document.getElementById("txt");

  // update the strength indicator.
  function updateStrength() {
    // Count the number of checked checkboxes.
    const checkboxes = [
      upperCheckbox,
      lowercaseCheckbox,
      numbersCheckbox,
      symbolsCheckbox,
    ];
    const numChecked = checkboxes.filter((checkbox) => checkbox.checked).length;

    const coloredBars = []; // track which bars need to be colored.
    let color = ""; // Set a color based on the number of checkboxes checked.

    // Reset the text and clear all bars.
    function reset() {
      strengthText.textContent = "";
      bars.forEach((bar) => {
        bar.style.backgroundColor = "";
        bar.style.border = "";
      });
    }

    switch (numChecked) {
      case 4:
        reset();
        strengthText.textContent = "strong";
        coloredBars.push(0, 1, 2, 3);
        color = "rgba(164, 255, 175, 1)";
        break;
      case 3:
        reset();
        strengthText.textContent = "medium";
        coloredBars.push(0, 1, 2);
        color = "rgba(248, 205, 101, 1)";
        break;
      case 2:
        reset();
        strengthText.textContent = "weak";
        coloredBars.push(0, 1);
        color = "rgba(251, 124, 88, 1)";
        break;
      case 1:
        reset();
        strengthText.textContent = "very weak";
        coloredBars.push(0);
        color = "rgba(246, 74, 74, 1)";
        break;
      default:
        reset();
        break;
    }
    // Color all bars with the selected color
    coloredBars.forEach((index) => {
      bars[index].style.backgroundColor = color;
      bars[index].style.border = color;
    });
  }

  // Listening for changes in checkbox states.
  upperCheckbox.addEventListener("change", updateStrength);
  lowercaseCheckbox.addEventListener("change", updateStrength);
  numbersCheckbox.addEventListener("change", updateStrength);
  symbolsCheckbox.addEventListener("change", updateStrength);

  // call updateStrength to set the initial state.
  updateStrength();

  function generatePassword() {
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$&-*_,.?";

    const passwordLength = parseInt(document.getElementById("myRange").value);
    var password = "";

    const checkboxes = [
      upperCheckbox,
      lowercaseCheckbox,
      numbersCheckbox,
      symbolsCheckbox,
    ];

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        switch (index) {
          case 0:
            password += getRandomCh(upperChars, passwordLength);
            break;
          case 1:
            password += getRandomCh(lowerChars, passwordLength);
            break;
          case 2:
            password += getRandomCh(numberChars, passwordLength);
            break;
          case 3:
            password += getRandomCh(symbolChars, passwordLength);
            break;
          default:
            break;
        }
      }
    });

    // Shuffle the password characters.
    password = password.split("");
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }

    return password.slice(0, passwordLength).join("");
  }

  // Function to get random characters from a given character set.
  function getRandomCh(characters, length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  //  display the generated password.
  const generateButton = document.getElementById("generateButton");
  generateButton.addEventListener("click", () => {
    // const password = generatePassword();
    document.getElementById("psw").textContent = generatePassword();
    document.getElementById("psw").style.opacity = "1";
  });
});
