import supabase from "./supabase";

export async function getLastOrderUser(userId) {
  let { data, error } = await supabase
    .from("ordersUsers")
    .select("*")
    .eq("user", userId)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("OrderUser could not be fetched");
  }

  return data[0];
}

export async function insertOrderUser(newOrderUser) {
  const { data, error } = await supabase
    .from("ordersUsers")
    .insert([{ ...newOrderUser }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("OrderUser could not be inserted");
  }

  return data;
}
