"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";

interface EBLogoLayoutProps {
  /** Đường dẫn thư mục chứa ảnh (ví dụ: "/images/hero", "/assets/banners") */
  imageFolder: string;
  /** Tên file ảnh (có thể có hoặc không có extension) */
  imageName: string;
  /** Extension của ảnh (mặc định: "png") */
  extension?: string;
  /** Chiều cao của ảnh (width sẽ tự động scale) */
  height: number;
  /** Alt text cho ảnh */
  alt: string;
  /** Đường dẫn để navigate khi click vào ảnh */
  navigateTo?: string;
  /** CSS class tùy chỉnh */
  className?: string;
  /** Có cho phép click để navigate không */
  clickable?: boolean;
  /** Object fit cho ảnh */
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  /** Priority loading cho ảnh */
  priority?: boolean;
}

const EBLogoLayout: React.FC<EBLogoLayoutProps> = ({
  imageFolder,
  imageName,
  extension = "png",
  height,
  alt,
  navigateTo,
  className = "",
  clickable = true,
  objectFit = "cover",
  priority = false,
}) => {
  const { push } = useLocaleRouter();

  // Tạo đường dẫn đầy đủ đến ảnh
  const imagePath = `${imageFolder}/${imageName}.${extension}`;

  // Debug log

  const handleClick = () => {
    if (clickable && navigateTo) {
      push(navigateTo);
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${clickable && navigateTo ? "cursor-pointer" : ""} ${className}`}
      style={{ height: `${height}px` }}
      onClick={handleClick}
      whileHover={
        clickable && navigateTo
          ? {
              scale: 1.05,
              y: -2,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }
          : {}
      }
      whileTap={
        clickable && navigateTo
          ? {
              scale: 0.98,
              transition: {
                duration: 0.1,
              },
            }
          : {}
      }
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.img
        src={imagePath}
        alt={alt}
        className="w-full h-full"
        style={{ objectFit, width: "100%", height: "100%" }}
        whileHover={
          clickable && navigateTo
            ? {
                scale: 1.1,
                rotate: 2,
                transition: {
                  duration: 0.4,
                  ease: "easeOut",
                },
              }
            : {}
        }
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
};

export default EBLogoLayout;
