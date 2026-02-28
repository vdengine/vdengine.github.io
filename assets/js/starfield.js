const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let width, height;
let stars = [];
const STAR_COUNT = 400;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      depth: Math.random(), // 0 ~ 1
    });
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(0, 0, width, height);

  stars.forEach(star => {

    // 越靠近（depth 越小）速度越快
    const speed = 0.5 + (1 - star.depth) * 2;

    star.depth -= 0.003 * speed;

    if (star.depth <= 0) {
      star.depth = 1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    }

    const size = (1 - star.depth) * 3;

    // 深度顏色
    let color;
    if (star.depth > 0.7) {
      color = "rgba(20,40,120,0.8)";
    } else if (star.depth > 0.4) {
      color = "rgba(120,160,255,0.9)";
    } else {
      color = "rgba(255,255,255,1)";
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resize();
  createStars();
});

resize();
createStars();
animate();
