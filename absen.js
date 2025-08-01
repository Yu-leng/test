let video = document.getElementById('video');
let statusText = document.getElementById('status');
let referenceDescriptor = null;

// Load model2 face-api
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      statusText.innerText = "Arahkan wajah ke kamera untuk merekam wajah...";
    })
    .catch(err => {
      statusText.innerText = "Gagal mengakses kamera.";
      console.error(err);
    });
}

// Rekam wajah pertama sebagai referensi user
video.addEventListener('play', async () => {
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(video, displaySize);

  // Tunggu wajah dikenali pertama kali
  const detectWajahAwal = async () => {
    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      referenceDescriptor = detection.descriptor;
      statusText.innerText = "Wajah tersimpan! Sekarang kamu bisa absen.";
    } else {
      requestAnimationFrame(detectWajahAwal);
    }
  };
  detectWajahAwal();
});

// Fungsi absen sekarang
async function absenSekarang() {
  if (!referenceDescriptor) {
    statusText.innerText = "Belum terdeteksi wajah referensi.";
    return;
  }

  const detection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (detection) {
    const distance = faceapi.euclideanDistance(referenceDescriptor, detection.descriptor);
    console.log("Distance: ", distance);

    if (distance < 0.6) {
      const now = new Date().toLocaleString();
      localStorage.setItem("absen", now);
      statusText.innerText = `✅ Absen berhasil: ${now}`;
    } else {
      statusText.innerText = "❌ Wajah tidak cocok, coba lagi.";
    }
  } else {
    statusText.innerText = "❌ Tidak ada wajah terdeteksi.";
  }
}