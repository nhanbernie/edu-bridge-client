import type { RootState } from "../store";

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectTutor = (state: RootState) => state.auth.user?.tutor;
export const selectTutorId = (state: RootState) => state.auth.user?.tutor?.tutorId;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
