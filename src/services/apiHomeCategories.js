export async function getHomeCategories() {
  const response = await fetch(`https://localhost:7069/api/HomeCategory`);
  const data = await response.json();
  return data;
}
