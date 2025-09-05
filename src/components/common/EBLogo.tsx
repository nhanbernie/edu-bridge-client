import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
const EBLogo = () => (
  <motion.div
    className="flex items-center space-x-3"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
      <GraduationCap className="w-6 h-6 text-white" />
    </div>
    <span className="text-xl font-bold text-gray-900">Edu Bridge</span>
  </motion.div>
);

export default EBLogo;
