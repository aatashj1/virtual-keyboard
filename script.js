const keyboardLayouts = {
  english: [
    "` 1 2 3 4 5 6 7 8 9 0 - =",
    "q w e r t y u i o p [ ] \\",
    "a s d f g h j k l ; '",
    "z x c v b n m , . /",
  ],
  russian: [
    "ё 1 2 3 4 5 6 7 8 9 0 - =",
    "й ц у к е н г ш щ з х ъ \\",
    "ф ы в а п р о л д ж э",
    "я ч с м и т ь б ю .",
  ]
};

let currentLayout = "english";

const textArea = document.createElement("textarea");
document.body.appendChild(textArea);

textArea.style.width = "500px";
textArea.style.height = "100px";
textArea.style.margin = "10px 0 30px 0";
textArea.onkeydown = (e) =>{
  console.log(e);
  let clickedButtonValue = e.key.toLowerCase().replace(" ", "");
  let foundButton = document.querySelector(`[data-label~="${clickedButtonValue}"]`);
  foundButton.dispatchEvent(new Event('mousedown'));
};
textArea.onkeyup = (e) =>{
  let clickedButtonValue = e.key.toLowerCase().replace(" ", "");
  let foundButton = document.querySelector(`[data-label~="${clickedButtonValue}"]`);
  console.log(foundButton);
  foundButton.dispatchEvent(new Event('mouseup'));
};

document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";


function createButton(label, value, size) {
  const button = document.createElement("button");
  button.dataset.label = label.toLowerCase().replace(" ", "");
  button.innerHTML = label;
  button.classList.add("keyboard-button");
  button.style.width = size*50+"px";
  button.style.height = "50px";
  button.style.margin = "5px";
  button.style.borderRadius = "5px";
  button.style.backgroundColor = "#1e3a8a";
  button.style.color = "#fff";
  button.style.fontSize = "24px";
  button.style.cursor = "pointer";
  button.onclick = () => {
    textArea.value += value;
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
  const layout = keyboardLayouts[currentLayout];
  for (let row of layout) {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "center";
    for (let char of row.split(" ")) {
      div.appendChild(createButton(char, char, 1));
    }
    keyboard.appendChild(div);
  }
  initializeTab()
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

function initializeTab(){
 let tabButton = createButton("tab", "  ", 1);
 customGetElementByText("q").before(tabButton);
}

function customGetElementByText(text){
  return [...document.querySelectorAll('.keyboard-button')]
   .find(el => el.textContent === text);
}

