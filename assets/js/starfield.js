window.addEventListener("load", () => {

  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
  }

  let centerX;
  let centerY;

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let stars = [];
  let specialStar = null;

  function createStar() {
    return {
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width,
      color: Math.random() > 0.9 ? "#a8c8ff" : "#ffffff"
    };
  }

  for (let i = 0; i < 400; i++) {
    stars.push(createStar());
  }

  function draw() {

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star, i) => {

      star.z -= 2;

      if (star.z <= 0) {
        stars[i] = createStar();
        stars[i].z = canvas.width;
      }

      let k = 128.0 / star.z;
      let x = star.x * k + centerX;
      let y = star.y * k + centerY;

      if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {

        let size = (1 - star.z / canvas.width) * 3;

        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    if (specialStar) {

      specialStar.life--;

      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "#66ccff";

      ctx.beginPath();
      ctx.arc(specialStar.x, specialStar.y, specialStar.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      specialStar.y -= 0.5;

      if (specialStar.life <= 0) {
        specialStar = null;
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  // Secret code
  let inputBuffer = "";
  const secretCode = "vd2026";

  document.addEventListener("keydown", (e) => {

    inputBuffer += e.key.toLowerCase();

    if (inputBuffer.length > secretCode.length) {
      inputBuffer = inputBuffer.slice(-secretCode.length);
    }

    if (inputBuffer === secretCode) {

      specialStar = {
        x: centerX,
        y: centerY,
        size: 15,
        life: 480
      };

      inputBuffer = "";
    }
  });

});
