export async function getProduct(id) {
  const response = await fetch(`https://localhost:7069/api/Product/${id}`);
  const data = await response.json();
  return data;
}

export async function getProducts() {
  const response = await fetch(`https://localhost:7069/api/Product`);
  const data = await response.json();
  return data;
}
