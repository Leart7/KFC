export async function getCategories() {
  const response = await fetch(`https://localhost:7069/api/Category`);
  const data = await response.json();

  return data;
}
