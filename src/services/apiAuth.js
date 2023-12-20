import { jwtDecode } from "jwt-decode";

export async function signup(signupObj) {
  const response = await fetch(`https://localhost:7069/api/Auth/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupObj),
  });

  const data = await response.json();
  return data;
}

export async function login(loginObj) {
  const response = await fetch("https://localhost:7069/api/Auth/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginObj),
  });
  const data = await response.json();
  return data;
}

const isTokenValid = (token) => {
  try {
    // Decode the token (you might use a library like jsonwebtoken)
    const decodedToken = jwtDecode(token);

    // Check if the token is not expired
    return decodedToken.exp > Math.floor(Date.now() / 1000);
  } catch (error) {
    // Token decoding failed or expired
    return false;
  }
};

export async function getUserByEmail(email) {
  const response = await fetch(`https://localhost:7069/api/Auth/${email}`);
  const data = await response.json();
  return data;
}

export async function getCurrentUser() {
  if (!localStorage.getItem("JwtToken")) return null;

  const token = localStorage.getItem("JwtToken");

  if (token && isTokenValid(token)) {
    const user = jwtDecode(token);

    const email =
      user[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];

    const userData = getUserByEmail(email);

    return userData;
  } else {
    localStorage.removeItem("JwtToken");
  }
}

export async function logout() {
  return null;
}

export async function updateCurrentUser(userId, updateUserObj) {
  const formData = new FormData();

  // Append form data fields
  for (const key in updateUserObj) {
    formData.append(key, updateUserObj[key]);
  }

  const response = await fetch(`https://localhost:7069/api/Auth/${userId}`, {
    method: "PUT",
    body: formData,
  });

  if (response.status === 400 || response.status === 500) {
    throw new Error("Could not update personal data!");
  }

  const data = await response.json();
  return data;
}
