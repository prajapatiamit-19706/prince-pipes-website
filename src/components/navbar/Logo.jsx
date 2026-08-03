import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/components/ui/button/buttonVariants';

export const Logo = ({ variant = 'full', className }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)} aria-label="Prince Pipes & Fittings Home">
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
        <Image
          src="/logo/ppf22.svg"
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
