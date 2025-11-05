import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/components/ui/button';
import { ReactNode } from 'react';

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  variant?: 'default' | 'hero' | 'hero-outline' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const AnimatedButton = ({ children, className, ...props }: AnimatedButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

