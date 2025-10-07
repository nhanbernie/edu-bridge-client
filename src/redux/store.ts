import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/services/auth";
import { userApi } from "@/services/user";
import { tutorApi } from "@/services/tutor";
import { bookingApi } from "@/services/booking";
import { paymentApi } from "@/services/payment";
import { feedbackApi } from "@/services/feedback";
import { transactionsApi } from "@/services/transactions";
import { authReducer } from "@/slices/auth.slice";
import { courseReducer } from "@/slices/course.slice";
import { availabilityBlockReducer } from "@/slices/availability-block.slice";
import { tutorReducer } from "@/slices/tutor.slice";
import { feedbackReducer } from "@/slices/feedback.slice";
import { courseApi } from "@/services/course";
import { availabilityBlockApi } from "@/services/availability-block";
// import { apiErrorHandler } from "@/services/api/apiErrorHandler";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    availabilityBlock: availabilityBlockReducer,
    tutor: tutorReducer,
    feedback: feedbackReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [availabilityBlockApi.reducerPath]: availabilityBlockApi.reducer,
    [tutorApi.reducerPath]: tutorApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
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
      tutorApi.middleware,
      bookingApi.middleware,
      paymentApi.middleware,
      feedbackApi.middleware,
      transactionsApi.middleware
    ),
  // devTools: __DEV__,
});

// Enable refetch on focus/reconnect for RTK Query
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
