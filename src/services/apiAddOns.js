import { jwtToken } from "./jwtToken";

export async function getAddOns() {
  const response = await fetch(`https://localhost:7069/api/AddOn`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}
