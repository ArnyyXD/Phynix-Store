/**
 * Resizes and compresses an image file using an HTML5 Canvas on the client side.
 * Converts heavy screenshots (e.g. 5-10MB PNGs) down to high-quality ~80-150KB JPEGs
 * so that they stay well below Vercel and Neon database payload limits.
 */
export function compressImage(file, maxWidth = 1280, maxHeight = 720, quality = 0.75) {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith("image/")) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve({
          name: file.name,
          dataUrl,
        });
      };
      img.onerror = () => {
        // Fallback to raw dataUrl if canvas fails
        resolve({
          name: file.name,
          dataUrl: event.target.result,
        });
      };
      img.src = event.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}
