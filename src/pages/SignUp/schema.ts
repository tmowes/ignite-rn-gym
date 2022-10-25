import * as zod from 'zod'

export const signUpSchema = zod
  .object({
    name: zod.string().min(3, 'Informe o nome.'),
    email: zod.string().min(8, 'Informe o e-mail.').email('E-mail inválido.'),
    password: zod
      .string()
      .min(1, 'Informe a senha.')
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    passwordConfirm: zod
      .string()
      .min(1, 'Confirme a senha.')
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'A confirmação da senha não confere.',
    path: ['passwordConfirm'],
  })

export type FormDataProps = zod.infer<typeof signUpSchema>
