import bcrypt from "bcryptjs";
import { db } from "~/lib/db.server";

type LoginData = {
  email: string;
  password: string;
};

export const registerUser = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;

    const user = await db.user.findUnique({ where: { email: email } });

    if (user) {
      return {
        success: false,
        message: "User Already Exists",
      };
    }

    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    if (name.trim().length === 0) {
      return {
        success: false,
        message: "Name must be alteast one character long",
      };
    }

    if (password.trim().length < 5) {
      return {
        success: false,
        message: "Name must be alteast 6 character long",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.user.create({
      data: { email, name, password: hashedPassword },
    });

    return { success: true, message: "User Created Successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const login = async (data: LoginData) => {
  try {
    const { email, password } = data;

    const user = await db.user.findUnique({ where: { email: email } });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return {
        success: false,
        message: "Incorrect password",
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
    };
  }
};
