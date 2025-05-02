import { z } from "zod";
import { updateCustomerSchema } from "@/presentation/customers/schema";

export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;

