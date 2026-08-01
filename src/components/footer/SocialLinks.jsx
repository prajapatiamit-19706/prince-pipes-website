import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/components/ui/icons/SocialIcons';
import socialData from '@/data/social.json';

const ICON_MAP = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon
};

export const SocialLinks = () => {
  // Filter out social links that are null or empty
  const activeSocials = Object.entries(socialData).filter(([_, url]) => url !== null && url !== "");

  if (activeSocials.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      {activeSocials.map(([platform, url]) => {
        const Icon = ICON_MAP[platform.toLowerCase()];
        if (!Icon) return null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${platform} page`}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-300 hover:bg-primary hover:text-white transition-all duration-300"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
};
