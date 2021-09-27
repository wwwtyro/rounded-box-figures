// vite.config.js
const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  root: "./src",
  base: "/rounded-box-figures/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        faces: resolve(__dirname, "src/faces/index.html"),
        grid: resolve(__dirname, "src/grid/index.html"),
        gridbox: resolve(__dirname, "src/grid-box/index.html"),
        sizedbox: resolve(__dirname, "src/sized-box/index.html"),
        roundedbox: resolve(__dirname, "src/rounded-box/index.html"),
        roundedbox2d: resolve(__dirname, "src/rounded-box-2d/index.html"),
        efficientbox: resolve(__dirname, "src/efficient-box/index.html"),
        efficientgrid: resolve(__dirname, "src/efficient-grid/index.html"),
        normals: resolve(__dirname, "src/normals/index.html"),
      },
    },
  },
});
