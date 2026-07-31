import { useHeaderContext } from '@/context/HeaderContext';

export const useNavbarScroll = () => {
  const { isScrolled } = useHeaderContext();
  return isScrolled;
};
