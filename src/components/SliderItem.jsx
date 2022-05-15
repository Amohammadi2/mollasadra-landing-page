import { motion } from "framer-motion";
import * as slideImgs from "../assets/slide-show";

export function SliderItem({ description, index, isActive }) {
  const transparentCoverVariants = {
    visible: { y: "100%" },
  };

  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `url(${slideImgs["Img" + index]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isActive && (
        <>
          <motion.div
            variants={transparentCoverVariants}
            animate="visible"
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,.4)] text-white"
          />
          <motion.div animate={{ y: -100 }} transition={{ duration: .4, delay: .7 }} className="bg-[rgba(0,0,0,.5)] text-white rounded-lg px-3 py-2 w-[300px] mr-[calc(50%-150px)] text-center">
            {description} {index}
          </motion.div>
        </>
      )}
    </div>
  );
}
