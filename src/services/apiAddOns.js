import supabase from "./supabase";

export async function getAddOns() {
  let { data, error } = await supabase.from("addOns").select("*");

  if (error) {
    console.error(error);
    throw new Error("Add ons could not be loaded");
  }

  return data;
}
