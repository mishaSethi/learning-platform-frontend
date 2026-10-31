// Crops a photo to a centred square and shrinks it to size x size as a JPEG,
// so uploads are small (about 20-40 KB) whatever the camera produced.
export function resizeToSquare(file, size = 256) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const sx = (img.width - side) / 2;
      const sy = (img.height - side) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff"; // transparent PNG areas become white
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (blob) =>
          blob
            ? resolve(blob)
            : reject(new Error("Could not process that photo.")),
        "image/jpeg",
        0.85,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That file is not an image we can read."));
    };

    img.src = url;
  });
}
