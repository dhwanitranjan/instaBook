import { z } from "zod";

export const SignUpValidations = z.object({
  name: z.string().min(2, { message: "Too short" }),
  username: z.string().min(2, { message: "Too short" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters long." }),
});

export const SignInValidations = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters long." }),
});
