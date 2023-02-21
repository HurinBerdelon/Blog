import { motion } from "framer-motion";
import { Heart } from "phosphor-react";

interface LikeIconProps {
    isLiked: boolean
}

export function LikeIcon({ isLiked }: LikeIconProps): JSX.Element {

    return (
        <motion.div
            whileHover={{ scale: 1.5 }}
        >
            <Heart weight={`${isLiked ? 'fill' : 'bold'}`} className={`hover:brightness-90 ${isLiked ? 'text-red-700' : ''}`} />
        </motion.div>
    )
}