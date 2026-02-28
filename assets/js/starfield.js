const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let width, height;
let stars = [];
const STAR_COUNT = 400;
const BASE_SPEED = 0.5;

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
      z: Math.random() * width
    });
  }
}

function getStarColor(z) {
  const depth = z / width;

  if (depth > 0.7) return "rgba(20,40,120,0.8)";
  if (depth > 0.4) return "rgba(120,160,255,0.9)";
  return "rgba(255,255,255,1)";
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(0, 0, width, height);

  stars.forEach(star => {
    const speed = BASE_SPEED + (1 - star.z / width) * 2;
    star.z -= speed;

    if (star.z <= 0) {
      star.z = width;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    }

    const size = (1 - star.z / width) * 3;

    ctx.fillStyle = getStarColor(star.z);
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
