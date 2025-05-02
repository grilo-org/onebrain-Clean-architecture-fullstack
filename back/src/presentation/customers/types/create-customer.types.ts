import { z } from "zod";
import { createCustomerSchema } from "../schema/create-customer.schema";

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;