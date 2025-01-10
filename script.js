const bodyContainer = document.querySelector('body');
const imageInput = document.getElementById("image-upload");
const imageContainer = document.getElementById("image-container");

const colorCountInput = document.getElementById("color-count"); 
const downloadButton = document.getElementById("download");
const colorCountLabel = document.getElementById("color-count-label");

imageInput.addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    imageContainer.innerHTML = "";
    imageContainer.appendChild(img);

    colorCountInput.style.display = "inline-block";
    colorCountLabel.style.display = "inline-block";
    downloadButton.style.display = "inline-block";

    colorThief(img);
  };
}

function rgbToHex(r, g, b) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

function isColorDark(color) {
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 128;
}

function changeBackground(colors){
  const [color1, color2, color3] = colors;
  console.log(color1, color2, color3)
  bodyContainer.style.background = `linear-gradient(to right, ${color1}, ${color2}, ${color3})`
}

function colorThief(img) {
  const colorThief = new ColorThief();
  const dominantColor = colorThief.getColor(img);
  const dominantColorHex = rgbToHex(...dominantColor);
  console.log(dominantColorHex);
  downloadButton.style.backgroundColor = `${dominantColorHex}`
  downloadButton.style.color = isColorDark(dominantColorHex) ? "white" : "black";



  const colorCount = parseInt(colorCountInput.value);
  const palette = colorThief.getPalette(img, colorCount);
  const colorPaletteHex = palette.map((color) => rgbToHex(...color));
  console.log(colorPaletteHex);
  changeBackground(colorPaletteHex)


  const paletteContainer = document.getElementById("color-palette");
  paletteContainer.innerHTML = ""; 

  colorPaletteHex.forEach((color) => {
    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.style.backgroundColor = color;

    let r, g, b;
    const hex = color.substring(1);
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    colorBox.style.color = brightness < 128 ? "white" : "black";

    colorBox.innerText = color;

    paletteContainer.appendChild(colorBox);

    colorBox.addEventListener("click", () => {
      compareHexWithNames(colorBox.innerText);
      navigator.clipboard
        .writeText(colorBox.innerText)
        .then(() => {
          const alertMessage = document.createElement("div");
          alertMessage.classList.add("alert");
          alertMessage.innerText = `Copied! ${colorBox.innerText}`;
          document.body.appendChild(alertMessage);

          setTimeout(() => {
            alertMessage.remove();
          }, 1000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });
  });
}

colorCountInput.addEventListener("input", () => {
  const img = imageContainer.querySelector("img");
  if (img) {
    colorThief(img); 
  }
});

function downloadPalette(colorPaletteHex) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const boxWidth = 250;
  const boxHeight = 800;
  const fontSize = 30;
  canvas.width = boxWidth * colorPaletteHex.length;
  canvas.height = boxHeight;

  colorPaletteHex.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(index * boxWidth, 0, boxWidth, boxHeight);

    let r, g, b;
    const hex = color.substring(1);
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    const textColor = brightness < 128 ? "white" : "black";

    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px Arial`;
    const textWidth = ctx.measureText(color).width;
    const xPos = index * boxWidth + (boxWidth - textWidth) / 2;
    const yPos = (boxHeight + fontSize) / 2;

    ctx.fillText(color, xPos, yPos);
  });

  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "color-palette.png";
  link.click();
}

downloadButton.addEventListener("click", () => {
  const colorPaletteHex = Array.from(
    document.querySelectorAll("#color-palette .color-box")
  ).map((box) => box.innerText);
  downloadPalette(colorPaletteHex);
});

function compareHexWithNames(color) {
    const hexWithoutHash = color.substring(1); 
    console.log(hexWithoutHash)
    const match = names.find(([hex]) => hex === hexWithoutHash);

    if (match) {
      console.log(`Color: ${match[1]} (Hex: #${hexWithoutHash})`);
    }
    else{
      console.log('not found')
    }
  }