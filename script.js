const canvas = document.getElementById("bannerCanvas");
const ctx = canvas.getContext("2d");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

const bgButtons = document.querySelectorAll(".bg-option");
const colorPicker = document.getElementById("colorPicker");
const logoInput = document.getElementById("logoUpload");

let textColor = "#ffffff";
let bg = new Image();
let logo = null;

// তিনটা ব্যাকগ্রাউন্ড ইমেজ
const backgrounds = [
  "ban.webp", 
  "ban2.webp", 
  "ban3.webp"
];

// ডিফল্ট ব্যাকগ্রাউন্ড লোড
bg.crossOrigin = "anonymous";
bg.src = backgrounds[0];
bg.onload = () => drawBanner();

// ব্যাকগ্রাউন্ড পরিবর্তন
bgButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    bg.src = backgrounds[index];
    bg.onload = () => drawBanner();
  });
});

// কালার পরিবর্তন
colorPicker.addEventListener("input", (e) => {
  textColor = e.target.value;
  drawBanner();
});

// লোগো আপলোড
logoInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    logo = null;
    drawBanner();
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    logo = new Image();
    logo.onload = () => drawBanner();
    logo.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// Generate এবং Download
generateBtn.addEventListener("click", drawBanner);
downloadBtn.addEventListener("click", downloadBanner);

function drawBanner() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Overlay gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 500);
  gradient.addColorStop(0, "rgba(0,0,0,0.2)");
  gradient.addColorStop(1, "rgba(0,0,0,0.4)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1500, 500);

  // নাম টেক্সট (বড় ফন্ট, উপরের সাদা বক্সে)
  const username = document.getElementById("username").value || "Your Name";
  ctx.font = "bold 100px Arial";
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.fillText(username, canvas.width / 2, 260);

  // লোগো (ডান পাশে লাল বক্সে)
  if (logo) {
    const logoWidth = 200;
    const logoHeight = 200;
    const logoX = canvas.width - logoWidth - 100;
    const logoY = 150;
    ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
  }
}

function downloadBanner() {
  const link = document.createElement("a");
  link.download = "twitter-banner.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
