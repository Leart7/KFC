export async function getLocations() {
  const response = await fetch(`https://localhost:7069/api/Location`);
  let data = await response.json();

  const locations = data.map((item) => {
    return {
      name: item.name,
      location: [+item.latitude, +item.longitude],
      openingHour: item.openingHour,
      closingHour: item.closingHour,
      city: item.city,
    };
  });
  return locations;
}
