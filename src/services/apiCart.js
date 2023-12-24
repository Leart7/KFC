import { jwtToken } from "./jwtToken";

export async function getCart(userId) {
  const response = await fetch(
    `https://localhost:7069/api/Cart?userId=${userId}`,
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

export async function insertCart(cartObj) {
  const response = await fetch(`https://localhost:7069/api/Cart`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(cartObj),
  });

  const data = await response.json();
  return data;
}

export async function updateCart(id, updateCartObj) {
  const url = `https://localhost:7069/api/Cart/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateCartObj),
  });

  const data = await response.json();
  console.log(data);
  return data;
}

export async function deleteCart(id) {
  const response = await fetch(`https://localhost:7069/api/Cart/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "Application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function deleteAllCartItems(userId) {
  const response = await fetch(
    `https://localhost:7069/api/Cart/delete-all?userId=${userId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  return data;
}
