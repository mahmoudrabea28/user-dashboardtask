import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import {
    loadUsers, loadUsersSuccess, loadUsersFailure,
    loadUserDetails, loadUserDetailsSuccess, loadUserDetailsFailure
} from '../actions/user.actions';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
        ofType(loadUsers),
        mergeMap(action =>
            this.userService.getUsers(action.page).pipe(
            map(response => loadUsersSuccess({ users: response.data })),
            catchError(error => of(loadUsersFailure({ error })))
            )
        )
        )
    );

    loadUserDetails$ = createEffect(() =>
        this.actions$.pipe(
        ofType(loadUserDetails),
        mergeMap(action =>
            this.userService.getUser(action.id).pipe(
            map(response => loadUserDetailsSuccess({ user: response.data })),
            catchError(error => of(loadUserDetailsFailure({ error })))
            )
        )
        )
    );
}
