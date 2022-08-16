export interface User{
    id:string
    username:string
    email:string
    password:string
}

export interface Data{
  id: string,
  email: string,
  username:string
  role:string
  iat: number,
  exp: number
}