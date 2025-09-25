import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/services/auth";
import { userApi } from "@/services/user";
import { tutorApi } from "@/services/tutor";
import { authReducer } from "@/slices/auth.slice";
import { courseReducer } from "@/slices/course.slice";
import { availabilityBlockReducer } from "@/slices/availability-block.slice";
import { tutorReducer } from "@/slices/tutor.slice";
import { courseApi } from "@/services/course";
import { availabilityBlockApi } from "@/services/availability-block";
// import { apiErrorHandler } from "@/services/api/apiErrorHandler";

export const store = configureStore({
  reducer: {
    // Auth slice
    auth: authReducer,
    // Course slice
    course: courseReducer,
    // Availability Block slice
    availabilityBlock: availabilityBlockReducer,
    // Tutor slice
    tutor: tutorReducer,
    // RTK Query APIs
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [availabilityBlockApi.reducerPath]: availabilityBlockApi.reducer,
    [tutorApi.reducerPath]: tutorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      // Add RTK Query middleware
      authApi.middleware,
      userApi.middleware,
      courseApi.middleware,
      availabilityBlockApi.middleware,
      tutorApi.middleware
    ),
  // devTools: __DEV__,
});

// Enable refetch on focus/reconnect for RTK Query
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
