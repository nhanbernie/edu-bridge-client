import * as yup from "yup";

// Student profile validation schema
export const studentProfileValidationSchema = yup.object().shape({
  fullName: yup.string().required("Vui lòng nhập họ và tên"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  phone: yup.string().nullable(),
  location: yup.string().nullable(),
});

// Tutor profile validation schema
export const tutorProfileValidationSchema = yup.object().shape({
  fullName: yup.string().required("Vui lòng nhập họ và tên"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  phone: yup.string().nullable(),
  location: yup.string().nullable(),
  educationLevel: yup.string().required("Vui lòng chọn trình độ học vấn"),
  yearsOfExperience: yup
    .number()
    .required("Vui lòng nhập số năm kinh nghiệm")
    .min(0, "Số năm kinh nghiệm phải lớn hơn hoặc bằng 0")
    .max(80, "Số năm kinh nghiệm phải nhỏ hơn 80"),
  bio: yup.string().required("Vui lòng nhập mô tả về bản thân"),
  subjects: yup.array().min(1, "Vui lòng chọn ít nhất một môn học"),
  languages: yup.array().min(1, "Vui lòng chọn ít nhất một ngôn ngữ"),
});
