import * as Yup from "yup";

const courseValidatorSchema = {
  createCourseSchema: Yup.object().shape({
    title: Yup.string()
      .min(5, "Tên khóa học cần ít nhất 5 ký tự")
      .max(100, "Tên khóa học không được vượt quá 100 ký tự")
      .required("Vui lòng nhập tên khóa học"),
    subjects: Yup.array().of(Yup.string()).min(1, "Chọn ít nhất 1 môn học"),
    description: Yup.string()
      .min(20, "Mô tả khóa học cần ít nhất 20 ký tự")
      .max(500, "Mô tả không được vượt quá 500 ký tự")
      .required("Vui lòng nhập mô tả khóa học"),
    hoursPerSession: Yup.number()
      .min(1, "Thời gian/buổi phải ít nhất 1 giờ")
      .max(8, "Thời gian/buổi không được vượt quá 8 giờ")
      .required("Vui lòng nhập thời gian/buổi"),
    hourlyRate: Yup.number()
      .min(50000, "Giá/buổi phải ít nhất 50,000 VNĐ")
      .max(2000000, "Giá/buổi không được vượt quá 2,000,000 VNĐ")
      .required("Vui lòng nhập giá/buổi"),
    isPublished: Yup.boolean(),
  }),
};

export default courseValidatorSchema;
