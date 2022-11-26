import { Loading } from '@components/Loading'
import { useAuth } from '@contexts/AuthProvider'

import PrivateRoutes from './private.routes'
import PublicRoutes from './public.routes'

export function AppRoutes() {
  const { user, loadingStorage } = useAuth()

  if (loadingStorage) {
    return <Loading />
  }

  if (user) {
    return <PrivateRoutes />
  }

  return <PublicRoutes />
}
