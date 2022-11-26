/* eslint-disable sonarjs/no-duplicate-string */
import { z } from 'zod'

export const profileSchema = z
  .object({
    name: z.string().min(3, 'Informe o nome.'),
    email: z.string().min(8, 'Informe o e-mail.').email('E-mail inválido.'),
    passwordPrevious: z
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .refine(
        (val) => (val?.length ?? 0) >= 6 || val === null,
        'A senha deve ter pelo menos 6 dígitos.',
      ),
    password: z
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .refine(
        (val) => (val?.length ?? 0) >= 6 || val === null,
        'A senha deve ter pelo menos 6 dígitos.',
      ),
    passwordConfirm: z
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .refine(
        (val) => (val?.length ?? 0) >= 6 || val === null,
        'A senha deve ter pelo menos 6 dígitos.',
      ),
  })
  .refine((data) => data.passwordPrevious !== data.password || data.passwordPrevious === null, {
    message: 'A nova senha deve ser diferente da senha atual.',
    path: ['password'],
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'A confirmação da senha não confere.',
    path: ['passwordConfirm'],
  })
  .refine(
    (data) =>
      (data.passwordConfirm === null &&
        data.password === null &&
        data.passwordPrevious === null) ||
      (data.passwordPrevious?.length ?? 0) >= 6,
    {
      message: 'Para trocar a senha. Informe a senha atual.',
      path: ['passwordPrevious'],
    },
  )

export type FormDataProps = z.infer<typeof profileSchema>

/**
 * [x] se não informar a senha atual e não informar a nova senha e não informar a confirmação da senha
 * [x] senha atual precisa ser informada para trocar a senha
 * [x] senha atual precisa ter pelo menos 6 dígitos
 * [x] nova senha precisa ter pelo menos 6 dígitos
 * [x] confirmação da senha precisa ter pelo menos 6 dígitos
 * [x] confirmação da senha precisa ser igual a nova senha
 * [x] nova senha precisa ser diferente da senha atual
 */
