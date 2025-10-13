const createOption = (value: string) => ({
  value,
  label: value,
});

export const EDUCATION_LEVEL_OPTIONS = [
  createOption("Tốt nghiệp THPT"),
  createOption("Cao đẳng"),
  createOption("Cử nhân"),
  createOption("Thạc sĩ"),
  createOption("Tiến sĩ"),
];

export const SUBJECT_OPTIONS = [
  createOption("Toán"),
  createOption("Vật lý"),
  createOption("Hóa học"),
  createOption("Sinh học"),
  createOption("Tiếng Anh"),
  createOption("Ngữ văn"),
  createOption("Lịch sử"),
  createOption("Địa lý"),
  createOption("Tin học"),
];

export const GRADE_OPTIONS = [
  createOption("Lớp 1"),
  createOption("Lớp 2"),
  createOption("Lớp 3"),
  createOption("Lớp 4"),
  createOption("Lớp 5"),
  createOption("Lớp 6"),
  createOption("Lớp 7"),
  createOption("Lớp 8"),
  createOption("Lớp 9"),
  createOption("Lớp 10"),
  createOption("Lớp 11"),
  createOption("Lớp 12"),
  createOption("Đại học năm 1"),
  createOption("Đại học năm 2"),
  createOption("Đại học năm 3"),
  createOption("Đại học năm 4"),
];

export const LANGUAGE_OPTIONS = [
  { value: "VI", label: "Tiếng Việt" },
  { value: "EN", label: "Tiếng Anh" },
  { value: "FR", label: "Tiếng Pháp" },
  { value: "JP", label: "Tiếng Nhật" },
  { value: "KR", label: "Tiếng Hàn" },
  { value: "ZH", label: "Tiếng Trung" },
];
