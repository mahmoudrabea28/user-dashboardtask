import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducer/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(
    selectUserState,
    (state: UserState) => state.users
);

export const selectUserDetails = createSelector(
    selectUserState,
    (state: UserState) => state.userDetails
);

export const selectLoading = createSelector(
    selectUserState,
    (state: UserState) => state.loading
);

export const selectError = createSelector(
    selectUserState,
    (state: UserState) => state.error
);
