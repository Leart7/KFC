import supabase from "./supabase";

export async function getLocations() {
  const { data, error } = await supabase.from("locations").select("*");

  if (error) {
    console.error(error);
    throw new Error("Locations could not be loaded");
  }

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
