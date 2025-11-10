const canvas = document.getElementById("bannerCanvas");
const ctx = canvas.getContext("2d");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

generateBtn.addEventListener("click", generateBanner);
downloadBtn.addEventListener("click", downloadBanner);

function generateBanner() {
  const bg = new Image();
  // এখানে তোমার artist-এর বানানো ব্যানার ব্যাকগ্রাউন্ড দাও 👇
  bg.src = "https://yourdomain.com/twitter-banner-bg.png"; 
  bg.crossOrigin = "anonymous";

  bg.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    // optional gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(0,0,0,0.2)");
    gradient.addColorStop(1, "rgba(0,0,0,0.4)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1500, 500);

    // নাম
    const username = document.getElementById("username").value || "Your Name";
    ctx.font = "bold 70px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(username, 400, 250);

    // হ্যান্ডেল
    const handle = document.getElementById("handle").value || "@yourhandle";
    ctx.font = "40px Arial";
    ctx.fillStyle = "#cfcfcf";
    ctx.fillText(handle, 400, 320);
  };
}

function downloadBanner() {
  const link = document.createElement("a");
  link.download = "twitter-banner.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
