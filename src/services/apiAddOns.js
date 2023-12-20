export async function getAddOns() {
  const response = await fetch(`https://localhost:7069/api/AddOn`);
  const data = await response.json();

  return data;
}
