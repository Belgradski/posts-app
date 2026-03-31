import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "../../api/usersApi";
import type { RootState } from "../../../../app/providers/store";

export const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a: User, b: User) => a.name.localeCompare(b.name),
});

interface UserState {
  selectedUserId: number | null;
}

const initialState = usersAdapter.getInitialState<UserState>({
  selectedUserId: null,
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: usersAdapter.addMany,
    setSelectedUserId: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    },
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export const { addUsers, setSelectedUserId } = userSlice.actions;

export default userSlice.reducer;
