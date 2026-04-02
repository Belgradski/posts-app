export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }

  export interface UserState {
    selectedUserId: number | null;
  }