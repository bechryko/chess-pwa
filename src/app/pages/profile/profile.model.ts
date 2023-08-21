export interface SimpleUserWithoutUsername {
   email: string,
   password: string
}

export interface SimpleUser extends SimpleUserWithoutUsername {
   username: string
}
