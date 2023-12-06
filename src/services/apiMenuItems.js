import supabase from "./supabase";

export async function getMenuItems() {
  let { data, error } = await supabase.from("menuItems").select("*");

  if (error) {
    console.error(error);
    throw new Error("Menu items could not be loaded");
  }

  return data;
}
