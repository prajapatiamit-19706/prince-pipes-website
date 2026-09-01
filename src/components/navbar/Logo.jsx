import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/components/ui/button/buttonVariants';

export const Logo = ({ variant = 'full', theme = 'light', className }) => {
  const isDark = theme === 'dark';
  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)} aria-label="Prince Pipes & Fittings Home">
      <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
        <Image
          src={isDark ? "/logo/ppfIcon.webp" : "/logo/ppfLogo.webp"}
          alt="Prince Pipes & Fittings Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center leading-none uppercase font-heading">
          <span className={cn("font-bold text-md md:text-3xl tracking-[0.12em] mb-0.5", isDark ? "text-white" : "text-primary")}>
            PRINCE
          </span>
          <span className={cn("font-bold text-[10px] md:text-xs tracking-[0.15em]", isDark ? "text-neutral-300" : "text-neutral-500")}>
            PIPES & FITTINGS
          </span>
        </div>
      )}
    </Link>
  );
};

