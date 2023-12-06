import supabase from "./supabase";

export async function getCart(userId) {
  let { data, error } = await supabase
    .from("carts")
    .select("*, product(name, price, id, image, menu)")
    .eq("user", userId);

  if (error) {
    console.error(error);
    throw new Error("Cart products could not be loaded");
  }

  return data;
}

export async function insertCart(newCart) {
  const { data, error } = await supabase
    .from("carts")
    .insert([{ ...newCart }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Products could not be added to cart");
  }

  return data;
}

export async function updateCart(id, quantity, comments, addOns, menuAddOns) {
  const { data, error } = await supabase
    .from("carts")
    .update({
      quantity: quantity,
      comments: comments,
      addOns: addOns,
      menuAddOns: menuAddOns,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Couldnt update cart item");
  }

  return data;
}

export async function deleteCart(id, userId) {
  const { data, error } = await supabase
    .from("carts")
    .delete()
    .eq("id", id)
    .eq("user", userId);

  if (error) {
    console.error(error);
    throw new Error("Couldnt delete cart item");
  }

  return data;
}
