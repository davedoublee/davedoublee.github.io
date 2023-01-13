const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const w = canvas.width = document.body.offsetWidth;
const h = canvas.height = document.body.offsetHeight;
const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

ctx.fillStyle = '#252934';
ctx.fillRect(0, 0, w, h);

function matrix () {
  ctx.fillStyle = '#25293444';
  ctx.fillRect(0, 0, w, h);
  
  ctx.fillStyle = '#5555';
  ctx.font = '15pt monospace';
  
  ypos.forEach((y, ind) => {
    const text = String.fromCharCode(Math.random() * 128);
    const x = ind * 20;
    ctx.fillText(text, x, y);
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    else ypos[ind] = y + 5;
  });
}

setInterval(matrix, 50);