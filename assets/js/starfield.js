const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let width, height;
let stars = [];
const STAR_COUNT = 500;
const BASE_SPEED = 0.8;

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
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width
    });
  }
}

function getColor(z) {
  const ratio = z / width;

  if (ratio > 0.7) return "rgba(30,50,150,0.8)";
  if (ratio > 0.4) return "rgba(120,160,255,0.9)";
  return "rgba(255,255,255,1)";
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, width, height);

  stars.forEach(star => {

    // 越近速度越快
    star.z -= 0.3 + (1 - star.z / width) * 0.8;

    if (star.z <= 0) {
      star.z = width;
      star.x = (Math.random() - 0.5) * width;
      star.y = (Math.random() - 0.5) * height;
    }

    const scale = 128 / star.z;
    const x = star.x * scale + width / 2;
    const y = star.y * scale + height / 2;

    if (x >= 0 && x <= width && y >= 0 && y <= height) {
      const size = (1 - star.z / width) * 3;
      ctx.fillStyle = getColor(star.z);
      ctx.beginPath();
      // 大小
      ctx.arc(x, y, (1 - star.z / width) * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
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
