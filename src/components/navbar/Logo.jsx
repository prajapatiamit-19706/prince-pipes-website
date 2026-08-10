import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/components/ui/button/buttonVariants';

export const Logo = ({ variant = 'full', className }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)} aria-label="Prince Pipes & Fittings Home">
      <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
        <Image
          src="/logo/ppfLogo.png"
          alt="Prince Pipes Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {variant !== 'icon' && (
        <span className="font-heading font-bold text-lg md:text-[17px] text-primary tracking-wider uppercase">PRINCE PIPES</span>
      )}
    </Link>
  );
};
