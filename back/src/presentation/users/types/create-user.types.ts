import { z } from "zod";
import { createUserSchema } from "../schema/create-user.schema";


export type CreateUserInput = z.infer<typeof createUserSchema>;