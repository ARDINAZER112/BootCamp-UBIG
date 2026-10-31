console.log("Dari file eksternal");
// alert("Pop-up");  // hanya di browser
if (typeof document !== "undefined") {
  document.getElementById("hasil").textContent = "Teks ini diubah oleh JavaScript";
}
