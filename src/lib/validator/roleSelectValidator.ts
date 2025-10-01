import * as Yup from "yup";

const roleSelectValidatorSchema = {
  tutorStep1Schema: Yup.object().shape({
    educationLevel: Yup.string().required("Vui lòng chọn trình độ học vấn"),
    yearsOfExperience: Yup.mixed()
      .test('is-number', 'Số năm kinh nghiệm phải là số', (value) => {
        if (value === undefined || value === null || value === '') return false;
        const num = Number(value);
        return !isNaN(num) && isFinite(num);
      })
      .test('is-positive', 'Số năm kinh nghiệm không được âm', (value) => {
        if (value === undefined || value === null || value === '') return false;
        const num = Number(value);
        return num >= 0;
      })
      .test('is-not-too-large', 'Số năm kinh nghiệm không được vượt quá 50', (value) => {
        if (value === undefined || value === null || value === '') return false;
        const num = Number(value);
        return num <= 50;
      })
      .required("Vui lòng nhập số năm kinh nghiệm"),
    bio: Yup.string()
      .min(50, "Mô tả cần ít nhất 50 ký tự")
      .max(100, "Mô tả không được vượt quá 100 ký tự")
      .required("Vui lòng nhập mô tả về bản thân"),
    subjects: Yup.array().of(Yup.string()).min(1, "Chọn ít nhất 1 môn học"),
    languages: Yup.array().of(Yup.string()).min(1, "Chọn ít nhất 1 ngôn ngữ"),
  }),
};

export default roleSelectValidatorSchema;
