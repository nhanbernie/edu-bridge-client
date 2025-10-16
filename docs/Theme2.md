background-image: linear-gradient(
to right bottom,
oklab(0.721788 -0.0917919 -0.0966832 / 0.1) 0%,
oklab(0.71481 -0.102692 -0.0724838 / 0.1) 50%,
oklab(0.721788 -0.0917919 -0.0966832 / 0.05) 100%
);

<!-- bg chính -->

border-bottom-color: oklab(0.721788 -0.0917919 -0.0966832 / 0.2)

<!-- border -->

color: rgb(26, 26, 46)

<!-- text phụ -->

outline-color: oklab(0.721788 -0.0917919 -0.0966832 / 0.5)

-webkit-tap-highlight-color: rgba(0, 0, 0, 0) → transparent

| Loại           | Màu gốc (oklab/rgb)      | Quy đổi RGBA             | HEX tương đương | Ghi chú       |
| -------------- | ------------------------ | ------------------------ | --------------- | ------------- |
| Gradient Start | oklab(0.721788 … / 0.1)  | rgba(30, 181, 229, 0.1)  | #1EB5E51A       | màu xanh nhạt |
| Gradient Mid   | oklab(0.71481 … / 0.1)   | rgba(6, 182, 212, 0.1)   | #06B6D41A       | xanh ngọc     |
| Gradient End   | oklab(0.721788 … / 0.05) | rgba(30, 181, 229, 0.05) | #1EB5E50D       | xanh nhạt mờ  |
| Border         | oklab(0.721788 … / 0.2)  | rgba(30, 181, 229, 0.2)  | #1EB5E533       | xanh nhạt hơn |
| Outline        | oklab(0.721788 … / 0.5)  | rgba(30, 181, 229, 0.5)  | #1EB5E580       | xanh focus    |
| Text           | rgb(26, 26, 46)          | rgba(26, 26, 46, 1)      | #1A1A2E         | xám đậm       |
| Tap highlight  | rgba(0, 0, 0, 0)         | transparent              | —               | trong suốt    |

<!-- Button -->Danh sách màu (unique)

Nền
background-color: rgb(250, 251, 252) → #FAFBFC

Viền (tất cả cạnh cùng màu)
rgba(30, 181, 229, 0.1) → base #1EB5E5, alpha 0.1 → #1EB5E51A

Chữ
rgb(26, 26, 46) → #1A1A2E

Outline (focus)
oklab(0.721788 -0.0917919 -0.0966832 / 0.5) ≈ rgba(30, 181, 229, 0.5) → #1EB5E580
(OKLab quy đổi gần đúng về cùng tông #1EB5E5 với alpha 0.5)

Tap highlight (mobile)

rgba(0, 0, 0, 0) → transparent

<!-- nút label -->

| Mục đích             | Màu gốc (oklab/rgb)     | RGBA                    | HEX       | Ghi chú        |
| -------------------- | ----------------------- | ----------------------- | --------- | -------------- |
| Gradient Start       | `rgb(30, 181, 229)`     | rgba(30, 181, 229, 1)   | #1EB5E5   | xanh biển      |
| Gradient End         | `rgb(255, 167, 38)`     | rgba(255, 167, 38, 1)   | #FFA726   | cam vàng       |
| Border               | rgba(30, 181, 229, 0.1) | rgba(30, 181, 229, 0.1) | #1EB5E51A | xanh nhạt viền |
| Box shadow           | oklab(... / 0.2)        | rgba(30, 181, 229, 0.2) | #1EB5E533 | xanh đổ bóng   |
| Outline              | oklab(... / 0.5)        | rgba(30, 181, 229, 0.5) | #1EB5E580 | xanh focus     |
| Text                 | rgb(26, 26, 46)         | rgba(26, 26, 46, 1)     | #1A1A2E   | xám đậm        |
| Transparent (shadow) | rgba(0, 0, 0, 0)        | transparent             | —         | shadow base    |
