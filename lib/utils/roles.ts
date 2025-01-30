import { auth } from '@clerk/nextjs/server'
import { Roles } from '../types/globals'

export const checkRoleServer = async (role: Roles) => {
  const { sessionClaims } = await auth()
  return sessionClaims?.metadata.role === role
}
