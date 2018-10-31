export interface User
 {
  first_name: string;
  last_name: string;
  email: string;
  // phone: string
  username: string;
  password: string;
  confirmPassword: string;
  profile: {about_me: string, rol: number};
}