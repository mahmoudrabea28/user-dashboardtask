import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import {
    loadUsers, loadUsersSuccess, loadUsersFailure,
    loadUserDetails, loadUserDetailsSuccess, loadUserDetailsFailure
} from '../actions/user.actions';

export interface UserState {
    users: User[];
    userDetails: User | null;
    loading: boolean;
    error: any;
}

export const initialState: UserState = {
    users: [],
    userDetails: null,
    loading: false,
    error: null
};

export const userReducer = createReducer(
    initialState,
    on(loadUsers, state => ({ ...state, loading: true })),
    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: [...state.users, ...users],
        loading: false
    })),
    on(loadUsersFailure, (state, { error }) => ({
        ...state, error, loading: false
    })),
    on(loadUserDetails, state => ({ ...state, loading: true })),
    on(loadUserDetailsSuccess, (state, { user }) => ({
        ...state,
        userDetails: user,
        loading: false
    })),
    on(loadUserDetailsFailure, (state, { error }) => ({
        ...state, error, loading: false
    }))
);
