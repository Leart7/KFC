import supabase from "./supabase";

export async function getAddresses(userId) {
  let { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user", userId)
    .order("active", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Addresses could not be loaded");
  }

  return data;
}

export async function insertAddress(newAddress) {
  const { data, error } = await supabase
    .from("addresses")
    .insert([{ ...newAddress }])
    .single();

  if (error) {
    console.error(error);
    throw new Error("Address could not be inserted");
  }

  return data;
}

export async function updateAddress(id, active) {
  const { data, error } = await supabase
    .from("addresses")
    .update({ active: active })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Address could not be updated");
  }

  return data;
}

export async function deleteAddress(id) {
  const { data, error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Addresses could not be loaded");
  }

  return data;
}
