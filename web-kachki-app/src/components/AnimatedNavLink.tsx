import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface AnimatedNavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedNavLink = ({ to, children, className = '' }: AnimatedNavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Link
        to={to}
        className={`text-sm font-medium hover:text-accent transition-colors ${className} ${
          isActive ? 'text-accent' : ''
        }`}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
            initial={false}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

