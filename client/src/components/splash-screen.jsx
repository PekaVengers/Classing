import { motion, AnimatePresence } from "framer-motion";
import cpLogo from "/images/ivizlogo.png";

export const SplashScreen = () => (
  <AnimatePresence>
    <motion.div
      key="splash"
      className="flex flex-col items-center justify-center h-full w-full bg-white fixed top-0 left-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="flex flex-col items-center justify-center space-y-4">
        <motion.img
          src={cpLogo}
          alt="Logo"
          className="h-40"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  </AnimatePresence>
);
