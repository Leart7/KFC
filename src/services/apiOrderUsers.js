import { jwtToken } from "./jwtToken";

export async function getLastOrderUser(userId) {
  const response = await fetch(
    `https://localhost:7069/api/OrderUser/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
}

export async function insertOrderuser(userId) {
  const response = await fetch(`https://localhost:7069/api/OrderUser`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });
  const data = await response.json();
  return data;
}
