import { supabase } from "@/supabase/config.js";
import { onMounted, ref } from "vue";

const getInfo = () => {
  const name = ref("");
  const bio = ref("");
  const email = ref("");
  const phone = ref(0);

  onMounted(async () => {
    const user = supabase.auth.user();

    const { data } = await supabase
      .from("users")
      .select("*")
      .filter("id", "eq", user.id);

    if (data.length > 0) {
      name.value = data[0].name;
      bio.value = data[0].bio;
      email.value = data[0].email;
      phone.value = data[0].phone;
    }
  });

  return { name, bio, email, phone };
};

export default getInfo;
