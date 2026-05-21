export interface User {
  id: string;
  name: string;
  default_direction: string;
  status: string;
  role: 'admin' | 'client';
  avatar?: string;
  email?: string;
  created_at?: string;
}

export interface UserAdminData extends User {
  last_sign_in_at?: string;
}

export interface UserProfile extends User {
  // Add profile specific fields here if needed
}
