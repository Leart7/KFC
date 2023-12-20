export async function getAddresses(userId) {
  const response = await fetch(`https://localhost:7069/api/Address/${userId}`);
  const data = await response.json();
  return data;
}

export async function insertAddress(newAddress) {
  const response = await fetch(`https://localhost:7069/api/Address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAddress),
  });
  const data = await response.json();
  return data;
}

export async function updateAddress(id, updateAddressObj) {
  const response = await fetch(`https://localhost:7069/api/Address/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateAddressObj),
  });
  const data = await response.json(updateAddressObj);
  return data;
}

export async function deleteAddress(id) {
  const response = await fetch(`https://localhost:7069/api/Address/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
