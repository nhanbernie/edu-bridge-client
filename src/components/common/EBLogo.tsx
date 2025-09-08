import { motion } from "motion/react";
import Image from "next/image";

const EBLogo = () => (
  <motion.div
    className="flex items-center space-x-3 cursor-pointer"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center ">
      <Image
        src="/edubridge.png"
        alt="Edu Bridge"
        width={500}
        height={500}
        quality={100}
        className="w-full h-full rounded-full object-cover"
      />
    </div>
    <span className="text-xl font-bold text-gray-900">Edu Bridge</span>
  </motion.div>
);

export default EBLogo;
