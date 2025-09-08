import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EBLogoProps {
  direction?: "horizontal" | "vertical";
  imageSize?: number;
  imageClassName?: string;
  textClassName?: string;
  containerClassName?: string;
  showText?: boolean;
  onClick?: () => void;
  animated?: boolean;
}

const EBLogo: React.FC<EBLogoProps> = ({
  direction = "horizontal",
  imageSize = 40,
  imageClassName,
  textClassName,
  containerClassName,
  showText = true,
  onClick,
  animated = true,
}) => {
  const motionProps = animated
    ? {
        whileHover: { scale: 1.05 },
        transition: { type: "spring" as const, stiffness: 400, damping: 10 },
      }
    : {};

  if (animated) {
    return (
      <motion.div
        className={cn(
          "flex items-center cursor-pointer",
          direction === "horizontal" ? "flex-row space-x-3" : "flex-col space-y-2",
          containerClassName
        )}
        onClick={onClick}
        {...motionProps}
      >
        <div
          className={cn("rounded-xl flex items-center justify-center", imageClassName)}
          style={{ width: imageSize, height: imageSize }}
        >
          <Image
            src="/edubridge.png"
            alt="Edu Bridge"
            width={imageSize * 12.5}
            height={imageSize * 12.5}
            quality={100}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {showText && (
          <span
            className={cn(
              "text-xl font-bold text-foreground",
              direction === "vertical" && "text-center",
              textClassName
            )}
          >
            Edu Bridge
          </span>
        )}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center cursor-pointer",
        direction === "horizontal" ? "flex-row space-x-3" : "flex-col space-y-2",
        containerClassName
      )}
      onClick={onClick}
    >
      <div
        className={cn("rounded-xl flex items-center justify-center", imageClassName)}
        style={{ width: imageSize, height: imageSize }}
      >
        <Image
          src="/edubridge.png"
          alt="Edu Bridge"
          width={imageSize * 12.5}
          height={imageSize * 12.5}
          quality={100}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {showText && (
        <span
          className={cn(
            "text-xl font-bold text-foreground",
            direction === "vertical" && "text-center",
            textClassName
          )}
        >
          Edu Bridge
        </span>
      )}
    </div>
  );
};

export default EBLogo;
