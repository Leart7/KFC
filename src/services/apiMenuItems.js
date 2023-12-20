export async function getMenuItems() {
  const response = await fetch(`https://localhost:7069/api/MenuAddOn`);
  const data = await response.json();

  return data;
}
