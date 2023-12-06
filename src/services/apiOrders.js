import supabase from "./supabase";

export async function getAllOrders(userId) {
  let { data, error } = await supabase
    .from("orders")
    .select("*, product(name, price), orderUser(id, user)")
    .eq("orderUser.user", userId)
    .distinct("orderUser");

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }

  return data;
}

export async function getLastOrder(orderUserId) {
  let { data, error } = await supabase
    .from("orders")
    .select("*, product(name, price)")
    .eq("orderUser", orderUserId);

  if (error) {
    console.error(error);
    throw new Error("Order could not be loaded");
  }

  return data;
}

export async function insertOrder(newOrder) {
  const { data, error } = await supabase
    .from("orders")
    .insert([{ ...newOrder }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Order could not be inserted");
  }

  return data;
}
