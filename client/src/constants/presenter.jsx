export const createSrcDoc = (sketchJs) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="style.css">
        <meta charset="utf-8" />
      </head>
      <body>
        <main>
           <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/addons/p5.sound.min.js"></script>
        </main>
        <script src="https://qmdnzkeynanpnivehrbz.supabase.co/storage/v1/object/public/sketch/proj.js"></script>
      </body>
    </html>`;
};
