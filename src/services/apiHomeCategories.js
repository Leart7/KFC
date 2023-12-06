import supabase from "./supabase";

export async function getHomeCategories() {
  let { data, error } = await supabase.from("homeCategories").select("*");

  if (error) {
    console.error(error);
    throw new Error("There was an error getting homeCategories");
  }

  return data;
}
