import Supabase from "./Supabase";

export async function getSettings() {
  const { data, error } = await Supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await Supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
