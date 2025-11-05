import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface PulseSkeletonProps {
  className?: string;
  count?: number;
}

export const PulseSkeleton = ({ className = '', count = 1 }: PulseSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
          className={className}
        >
          <Skeleton className="w-full h-full" />
        </motion.div>
      ))}
    </>
  );
};

