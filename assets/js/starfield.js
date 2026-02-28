const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const STAR_COUNT = 300;

function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * width, // 深度
            size: Math.random() * 2
        });
    }
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#ffffff";

    stars.forEach(star => {
        star.z -= 1;

        if (star.z <= 0) {
            star.z = width;
            star.x = Math.random() * width;
            star.y = Math.random() * height;
        }

        const k = 128 / star.z;
        const px = star.x * k + width / 2;
        const py = star.y * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
            const size = (1 - star.z / width) * 2;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();
