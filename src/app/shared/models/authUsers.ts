export interface AuthUserWithoutName {
   email: string;
   password: string;
}

export interface AuthUser extends AuthUserWithoutName {
   name: string;
}
