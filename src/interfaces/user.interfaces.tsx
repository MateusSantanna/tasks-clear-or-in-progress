export interface UserData {
  name: string;
  email: string;
}

export interface AuthContextData {
  user: UserData | null;
  signIn: (email: string, password: string) => void;
  signUp: (
    userData: UserData,
    password: string,
    confirmPassword: string
  ) => void;
  signOut: () => void;
}
