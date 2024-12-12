import { z } from "zod";

export const CreateUserSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
});

export const UpdateUserSchema = CreateUserSchema.partial(); // Makes all fields optional

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
