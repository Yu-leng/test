function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;

  // Login dummy (bisa diganti dengan real backend)
 if (email === "admin@pudra.my.id" && pass === "123456") {
  localStorage.setItem("isLoggedIn", "true"); // simpan status login
  window.location.href = "dashboard.html";
} else {
    alert("Invalid credentials");
  }
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("login.php", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid login");
      }
    });
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("login.php", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" }
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data));

        if (data.role === "admin") {
          window.location.href = "dashboard-admin.html";
        } else {
          window.location.href = "dashboard-user.html";
        } 
          window.location.href = "home.html";
      } else {
        alert("Login gagal. Cek username/password!");
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      alert("Terjadi kesalahan saat login.");
    });
});