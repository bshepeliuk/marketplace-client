import { FaRegImages } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { BiCategoryAlt, BiDevices, BiBookAlt } from 'react-icons/bi';

export interface IStep {
  id: number;
  title: string;
  isActive: boolean;
  icon: IconType;
}

export const STEP_LIST: IStep[] = [
  {
    id: 1,
    title: 'brand',
    icon: BiCategoryAlt,
    isActive: false,
  },
  {
    id: 2,
    title: 'category',
    icon: BiBookAlt,
    isActive: false,
  },
  {
    id: 3,
    title: 'base info',
    icon: BiDevices,
    isActive: false,
  },
  {
    id: 4,
    title: 'features',
    icon: MdOutlineFeaturedPlayList,
    isActive: false,
  },
  {
    id: 5,
    title: 'images',
    icon: FaRegImages,
    isActive: false,
  },
];
