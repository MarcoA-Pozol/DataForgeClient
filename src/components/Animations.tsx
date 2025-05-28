import { motion } from "framer-motion";
import { ReactNode } from "react";

type PageTransitionProps = {
    children: ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
    return (
        <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}

export default PageTransition;