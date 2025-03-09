import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

export const checkAdmin = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const role = await prisma.roles.findUnique({
      where: {
        user_id: user.id,
      },
    });

    if (role?.rule === 'ADMIN') {
      return true;
    }
  }

  return false;
};
