import Link from 'next/link';
import { cn } from '@/components/ui/button/buttonVariants';

export const Logo = ({ variant = 'full', className }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)} aria-label="Prince Pipes & Fittings Home">
      <div className="w-9 h-9 md:w-11 md:h-11 bg-primary flex items-center justify-center rounded-lg shadow-sm group-hover:bg-primary-600 transition-colors">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22H22L12 2Z" fill="#ffffff" />
        </svg>
      </div>
      {variant !== 'icon' && (
        <span className="font-heading font-bold text-lg md:text-[17px] text-primary tracking-wider uppercase">PRINCE PIPES</span>
      )}
    </Link>
  );
};
