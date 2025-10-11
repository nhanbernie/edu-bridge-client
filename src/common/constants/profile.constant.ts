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

export const LANGUAGE_OPTIONS = [
  { value: "VI", label: "Tiếng Việt" },
  { value: "EN", label: "Tiếng Anh" },
  { value: "FR", label: "Tiếng Pháp" },
  { value: "JP", label: "Tiếng Nhật" },
  { value: "KR", label: "Tiếng Hàn" },
  { value: "ZH", label: "Tiếng Trung" },
];
