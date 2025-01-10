# TonetroveV2 - Image to Color Palette Generator 🎨

Welcome to **TonetroveV2**! The next evolution of the Image to Color Palette Generator tool. Upload an image, extract its color palette, create vibrant gradients, and generate downloadable color palettes—all with a simple and interactive interface.

## 🚀 Features

- **Image Upload**: Upload an image to generate a color palette.
- **Adjustable Color Count**: Choose the number of colors for your palette.
- **Interactive Color Swatches**: View and copy hex codes from color swatches.
- **Dynamic Background**: Your palette will create a unique background gradient.
- **Downloadable PNG**: Save the generated color palette as a PNG image.
- **Easy Copy**: Copy hex codes to your clipboard with a single click.

## 💻 How to Use

1. **Upload Your Image**: Click the upload button to select an image file.
2. **Adjust Palette Size**: Use the slider to adjust the number of colors you want in your palette.
3. **View Color Palette**: The colors are automatically extracted from the image and displayed in the color palette.
4. **Copy Color Codes**: Click on a color swatch to copy its hex code.
5. **Download the Palette**: Click "Download" to save your color palette as a PNG image.

## 🎨 How It Works

- **Image Upload**: The tool allows you to upload an image from your local device.
- **Color Extraction**: The dominant colors of the image are extracted using the **ColorThief** library.
- **Dynamic Gradient**: A color gradient background is generated using the extracted colors.
- **Clickable Color Boxes**: Color swatches show their hex codes, and clicking on them copies the code to your clipboard.
- **Palette Download**: The tool generates a downloadable PNG of the color palette with all the extracted colors.

## 🔧 Technologies Used

- **HTML**: Structure and content of the page.
- **CSS**: Styling and layout, with a minimalistic and interactive design.
- **JavaScript**: Dynamic behavior, image processing, and color extraction logic.
- **ColorThief**: A JavaScript library to extract dominant colors from the image.
- **Canvas**: For generating downloadable images of the color palette.

## 🧰 Dependencies

- [ColorThief](https://github.com/lokesh/color-thief): To extract the dominant colors from the uploaded image.
  
## ⚙️ Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/tonetroveV2.git
   cd tonetroveV2
   ```

2. **Open in Browser**:
   Simply open `index.html` in a modern browser to begin using the tool.

## 💾 Download Color Palette

Once you’ve created a color palette, click the **Download** button to save it as a PNG file. The palette will include the color swatches with their corresponding hex codes.

## 💬 Contributing

Found a bug or have ideas for new features? Feel free to fork the repository, make your changes, and submit a pull request. Contributions are always welcome!

