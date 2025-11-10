const canvas = document.getElementById("bannerCanvas");
const ctx = canvas.getContext("2d");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

let bg = new Image();
bg.crossOrigin = "anonymous";
bg.src = "ban.webp"; // তোমার template image এখানে দাও

bg.onload = () => {
  drawBanner(); // পেজ লোডের সময়ই প্রথমবার ব্যানার দেখাবে
};

generateBtn.addEventListener("click", drawBanner);
downloadBtn.addEventListener("click", downloadBanner);

function drawBanner() {
  // ব্যাকগ্রাউন্ড আঁকা
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Gradient overlay (optional)
  const gradient = ctx.createLinearGradient(0, 0, 0, 500);
  gradient.addColorStop(0, "rgba(0,0,0,0.2)");
  gradient.addColorStop(1, "rgba(0,0,0,0.4)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1500, 500);

  // টেক্সট ইনফো
  const username = document.getElementById("username").value || "Your Name";
  const handle = document.getElementById("handle").value || "@handle";

  ctx.font = "bold 70px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(username, canvas.width / 2, 250);

  ctx.font = "40px Arial";
  ctx.fillStyle = "#ddd";
  ctx.fillText(handle, canvas.width / 2, 320);
}

function downloadBanner() {
  const link = document.createElement("a");
  link.download = "twitter-banner.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
