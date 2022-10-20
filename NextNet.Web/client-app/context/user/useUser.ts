import { createContext, useContext } from 'react'

export const UserContext = createContext(null)

export const useUser = () => {
  const user = useContext<User>(UserContext)
  return { user }
}

export class User {
  name: string
  email: string
  roles: string[]
  permissions: string[]
  hasPermission(permission: string): boolean {
    return this.permissions.indexOf(permission) != -1
  }
  hasRole(role: string): boolean {
    if(role == null || role == '') return true;
    return this.roles.indexOf(role)!= -1;
  }
}
