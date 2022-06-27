import { FaRegImages } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';

import { IconType } from 'react-icons';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { BiCategoryAlt, BiDevices, BiBookAlt } from 'react-icons/bi';

export interface IStep {
  id: number;
  title: string;
  isActive: boolean;
  icon: {
    default: IconType;
    completed: IconType;
  };
}

export const STEP_LIST: IStep[] = [
  {
    id: 1,
    title: 'brand',
    icon: {
      default: BiCategoryAlt,
      completed: BsCheckLg,
    },
    isActive: false,
  },
  {
    id: 2,
    title: 'category',
    icon: {
      default: BiBookAlt,
      completed: BsCheckLg,
    },
    isActive: false,
  },
  {
    id: 3,
    title: 'base info',
    icon: {
      default: BiDevices,
      completed: BsCheckLg,
    },
    isActive: false,
  },
  {
    id: 4,
    title: 'features',
    icon: {
      default: MdOutlineFeaturedPlayList,
      completed: BsCheckLg,
    },
    isActive: false,
  },
  {
    id: 5,
    title: 'images',
    icon: {
      default: FaRegImages,
      completed: BsCheckLg,
    },
    isActive: false,
  },
];
