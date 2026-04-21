import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="w-64 h-64">
        <DotLottieReact
          src="https://lottie.host/9d9a70af-d6f2-4f20-9c28-33cf2baabbc2/TQwUnedkyP.lottie"
          loop
          autoplay
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;