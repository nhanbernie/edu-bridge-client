import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseDto } from "@/services/course/type";

interface CourseState {
  courses: CourseDto[];
  selectedCourse: CourseDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  selectedCourse: null,
  isLoading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCourses: (state, action: PayloadAction<CourseDto[]>) => {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addCourse: (state, action: PayloadAction<CourseDto>) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action: PayloadAction<CourseDto>) => {
      const index = state.courses.findIndex(
        (course) => course.courseId === action.payload.courseId
      );
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((course) => course.courseId !== action.payload);
    },
    setSelectedCourse: (state, action: PayloadAction<CourseDto | null>) => {
      state.selectedCourse = action.payload;
    },
    clearCourses: (state) => {
      state.courses = [];
      state.selectedCourse = null;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  setSelectedCourse,
  clearCourses,
} = courseSlice.actions;

export const courseReducer = courseSlice.reducer;

// Selectors
export const selectCourses = (state: { course: CourseState }) => state.course.courses;
export const selectSelectedCourse = (state: { course: CourseState }) => state.course.selectedCourse;
export const selectCourseLoading = (state: { course: CourseState }) => state.course.isLoading;
export const selectCourseError = (state: { course: CourseState }) => state.course.error;
