import React from "react";
import { motion } from "framer-motion";

const Card = ({ children, bgColor }) => {
  return (
    <motion.div
      className={
        `flex flex-col p-
            w-72 m-2 text-white
            border-2 border-gray-900  ` + bgColor
      }
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
