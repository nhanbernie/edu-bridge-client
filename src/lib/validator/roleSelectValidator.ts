import * as Yup from "yup";

const roleSelectValidatorSchema = {
  tutorStep1Schema: Yup.object().shape({
    educationLevel: Yup.string().required("Vui lòng chọn trình độ học vấn"),
    yearsOfExperience: Yup.number()
      .min(0, "Số năm kinh nghiệm không được âm")
      .required("Vui lòng nhập số năm kinh nghiệm"),
    bio: Yup.string()
      .min(50, "Mô tả cần ít nhất 50 ký tự")
      .max(100, "Mô tả không được vượt quá 100 ký tự")
      .required("Vui lòng nhập mô tả về bản thân"),
    subjects: Yup.array().of(Yup.string()).min(1, "Chọn ít nhất 1 môn học"),
    languages: Yup.array().of(Yup.string()).min(1, "Chọn ít nhất 1 ngôn ngữ"),
    hourlyRate: Yup.number().min(0, "Không được âm").required("Nhập giá theo giờ"),
    hoursPerSession: Yup.number()
      .min(0.5, "Tối thiểu 0.5 giờ")
      .max(8, "Tối đa 8 giờ")
      .required("Nhập số giờ mỗi buổi"),
  }),
};

export default roleSelectValidatorSchema;
