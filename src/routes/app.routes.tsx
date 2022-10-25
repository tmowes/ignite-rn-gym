import PrivateRoutes from './private.routes'
import PublicRoutes from './public.routes'

export function AppRoutes() {
  const user = null

  if (user) {
    return <PrivateRoutes />
  }

  return <PublicRoutes />
}
