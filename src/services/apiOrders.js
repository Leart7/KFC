import { jwtToken } from "./jwtToken";

export async function getAllOrders(userId) {
  const response = await fetch(
    `https://localhost:7069/api/Order/user/${userId}`,
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

export async function getLastOrder(orderUserId) {
  const response = await fetch(
    `https://localhost:7069/api/Order/${orderUserId}`,
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

export async function insertOrder(newOrder) {
  const response = await fetch(`https://localhost:7069/api/Order`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });

  const data = await response.json();
  return data;
}
