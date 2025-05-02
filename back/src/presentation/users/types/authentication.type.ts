import { z } from "zod";
import { loginSchema } from "@/presentation/users/schema";

export type LoginInput = z.infer<typeof loginSchema>;