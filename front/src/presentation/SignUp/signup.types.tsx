import { z } from 'zod'

import { signUpSchema } from './signup.schema'

export type SignUpFormData = z.infer<typeof signUpSchema>
