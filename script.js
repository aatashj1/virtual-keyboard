const keyboardLayouts = {
  eng: ["`1234567890-=",
    "qwertyuiop[]\\",
    "asdfghjkl;'",
    "zxcvbnm,./",
    " "].map((row) => row.split("")),
  ru: ["ё1234567890-=",
    "йцукенгшщзхъ\\",
    "фывапролджэ",
    "ячсмитьбю.",
    " "].map((row) => row.split("")),
  special: ["~!@#$%^&*()_+", "QWERTYUIOP{}|", "ASDFGHJKL:\"", "ZXCVBNM<>?", " "].map((row) => row.split(""))
};

let buttons = [];

let currentLayout = "eng";

const textArea = document.createElement("textarea");
document.body.appendChild(textArea);

textArea.style.width = "500px";
textArea.style.height = "100px";
textArea.style.margin = "10px 0 30px 0";
textArea.onkeydown = (e) => {
  console.log(e);
  let foundButton;
  if (e.key === "Shift" || e.key === "Alt" || e.key === "Meta") {
    let clickedButtonValue = e.code;
    foundButton = document.querySelector(`[data-shift~="${clickedButtonValue}"]`);
  } else {
    let clickedButtonValue = e.key.toLowerCase().replace(" ", "");
    foundButton = document.querySelector(`[data-label~="${clickedButtonValue}"]`);
  }
  if (e.code === "Space" && e.altKey) {
    currentLayout = currentLayout === "ru" ? "eng" : "ru";
    buttons.forEach((button) => {
      button.innerHTML = button.dataset[currentLayout];
    });
  }
  foundButton.dispatchEvent(new Event('mousedown'));

};
textArea.onkeyup = (e) => {
  let clickedButtonValue = e.key.toLowerCase().replace(" ", "");
  let foundButton;
  if (e.key === "Shift" || e.key === "Alt" || e.key === "Meta") {
    let clickedButtonValue = e.code;
    foundButton = document.querySelector(`[data-shift~="${clickedButtonValue}"]`);
  } else {
    foundButton = document.querySelector(`[data-label~="${clickedButtonValue}"]`);
    console.log(foundButton);
  }
  foundButton.dispatchEvent(new Event('mouseup'));
};

document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";


function createButton(label, ruValue, engValue, shiftValue, size) {
  const button = document.createElement("button");
  button.dataset.label = label.toLowerCase().replace(" ", "");
  if(label ==="option"){button.dataset.label = "AltLeft" }
  if(label ==="command"){button.dataset.label = "MetaLeft" }

  button.dataset.ru = ruValue;
  button.dataset.eng = engValue;
  button.dataset.shift = shiftValue;
  button.innerHTML = label;
  button.classList.add("keyboard-button");
  if (label === " ") {
    size = 4;
  }
  button.style.width = size * 50 + "px";
  button.style.height = "50px";
  button.style.margin = "5px";
  button.style.borderRadius = "5px";
  button.style.backgroundColor = "#1e3a8a";
  button.style.color = "#fff";
  button.style.fontSize = "24px";
  button.style.cursor = "pointer";
  button.onclick = () => {
    textArea.value += button.dataset[currentLayout];
  };
  button.addEventListener("mousedown", () => {
    button.style.backgroundColor = "lightblue";
    button.style.color = "#000";
  });
  button.addEventListener("mouseup", () => {
    button.style.backgroundColor = "#1e3a8a";
    button.style.color = "white";
  });

  return button;
}

function createKeyboard() {
  const keyboard = document.createElement("div");
  document.body.appendChild(keyboard);
  for (let charRow = 0; charRow < keyboardLayouts.eng.length; charRow++) {
    let chars = keyboardLayouts.eng[charRow];
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "center";
    for (let i = 0; i < chars.length; i++) {
      let charButton = createButton(chars[i], keyboardLayouts.ru[charRow][i], keyboardLayouts.eng[charRow][i], keyboardLayouts.special[charRow][i], 1);
      div.appendChild(charButton);
      buttons.push(charButton);
    }
    keyboard.appendChild(div);
  }
  initializeTab();
  initializeCapsLock();
  initializeShift();
  initializeFn();
  initializeControl();
  initializeOption();
  initializeCommand();
}

createKeyboard();

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.code) {
    currentLayout = currentLayout === "english" ? "russian" : "english";
    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = "";
    createKeyboard();
  }
});


document.addEventListener("keydown", (event) => {

  if (event.code === "ArrowUp") {
  } else if (event.code === "ArrowDown") {

  } else if (event.code === "ArrowLeft") {

  } else if (event.code === "ArrowRight") {

  } else if (event.code === "Enter") {
    textArea.value += "\n";
  } else if (event.code === "Tab") {
    textArea.value += "  ";
  } else if (event.code === "Backspace") {
    textArea.value = textArea.value.slice(0, -1);
  } else if (event.code === "Delete") {
    textArea.value = textArea.value.slice(0, -1);
  }
});

function initializeTab() {
  let tabButton = createButton("Tab", "Tab", "Tab", "Tab", 1);
  customGetElementByText("q").before(tabButton);
}

function initializeCapsLock() {
  let capsButton = createButton("Caps Lock", "Caps Lock", "Caps Lock", "Caps Lock", 3);
  capsButton.addEventListener("mousedown", (event) => {
    buttons.forEach(button => {
      button.innerText = button.innerText.toUpperCase();
    })
  });
  capsButton.addEventListener("mouseup", (event) => {
    buttons.forEach(button => {
      button.innerText = button.innerText.toLowerCase();
    })
  });
  customGetElementByText("a").before(capsButton);
}

function initializeShift() {
  let shiftLeftButton = createButton("Shift", "ShiftLeft", "ShiftLeft", "ShiftLeft", 3);
  customGetElementByText("z").before(shiftLeftButton);
  shiftLeftButton.addEventListener("mousedown", (event) => {
    buttons.forEach(button => {
      button.innerText = button.dataset.shift;
    })
  });
  shiftLeftButton.addEventListener("mouseup", (event) => {
    buttons.forEach(button => {
      button.innerText = button.dataset[currentLayout];
    })
  });
  shiftLeftButton.onclick = () => {
  };

  let shiftRightButton = createButton("Shift", "ShiftRight", "ShiftRight", "ShiftRight", 3);
  customGetElementByText("/").after(shiftRightButton);
  shiftRightButton.addEventListener("mousedown", (event) => {
    buttons.forEach(button => {
      button.innerText = button.dataset.shift;
    })
  });
  shiftRightButton.addEventListener("mouseup", (event) => {
    buttons.forEach(button => {
      button.innerText = button.dataset[currentLayout];
    })
  });
  shiftRightButton.onclick = () => {
  };
}

function initializeOption() {
  let optionLeftButton = createButton("option", "AltLeft", "AltLeft", "AltLeft", 2);
  customGetElementByText(" ").before(optionLeftButton);
  optionLeftButton.onclick = () => {
  };

  let optionRightButton = createButton("option", "AltRight", "AltRight", "AltRight", 2);
  customGetElementByText(" ").after(optionRightButton);
  optionRightButton.onclick = () => {
  };
}

function initializeControl() {
  let controlLeftButton = createButton("Control", "ControlLeft", "ControlLeft", "ControlLeft", 2);
  customGetElementByText(" ").before(controlLeftButton);
  controlLeftButton.onclick = () => {
  };

}

function initializeCommand() {
  let commandLeftButton = createButton("command", "MetaLeft", "MetaLeft", "MetaLeft", 3);
  customGetElementByText(" ").before(commandLeftButton);
  commandLeftButton.onclick = () => {
  };

  let commandRightButton = createButton("command", "MetaRight", "MetaRight", "MetaRight", 3);
  customGetElementByText(" ").after(commandRightButton);
  commandRightButton.onclick = () => {
  };
}
function initializeFn(){
  let fnButton = createButton("Fn", "Fn", "Fn", "Fn", 1);
  customGetElementByText(" ").before(fnButton);
  fnButton.onclick = () => {
  };
}

function customGetElementByText(text) {
  return [...document.querySelectorAll('.keyboard-button')]
   .find(el => el.textContent === text);
}

