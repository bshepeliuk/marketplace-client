import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { useSearchParams, ParamKeyValuePair } from 'react-router-dom';
import { IDeviceInfo } from '@src/features/devices/types';
import isInArray from '@src/common/utils/isInArray';
import { Devices } from '@src/common/api/Api';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { getDevices } from '@src/features/devices/devicesSlice';
import useGetCategoryId from '@src/features/categories/hooks/useGetCategoryId';
import getFeaturesEntries from '../helpers/getFeaturesEntries';

type ISelectProps = Pick<IDeviceInfo, 'id' | 'title' | 'description'>;

interface IContext {
  btnVerticalOffset: number;
  showApplyBtn: boolean;
  hasSelectedItems: boolean;
  selected: ISelectProps[];
  // eslint-disable-next-line no-unused-vars
  onSelectOption: (option: ISelectProps) => void;
  apply: () => void;
  clearSelectedOptions: () => void;
  setBtnVerticalOffset: Dispatch<SetStateAction<number>>;
  setShowApplyBtn: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<ISelectProps[]>>;
  setPrices: Dispatch<SetStateAction<number[]>>;
  prices: number[];
  count: number;
}

export const FilterContext = createContext<IContext | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const categoryId = useGetCategoryId();

  const [showApplyBtn, setShowApplyBtn] = useState<boolean>(false);
  const [prices, setPrices] = useState<number[]>([]);
  const [selected, setSelected] = useState<ISelectProps[]>([]);
  const [btnVerticalOffset, setBtnVerticalOffset] = useState<number>(0);

  useEffect(() => {
    if (categoryId) setPrices([]);
  }, [categoryId]);

  const onSelectOption = (option: ISelectProps) => {
    if (isInArray(option.id, selected)) {
      setSelected((prev) => prev.filter((i) => i.id !== option.id));
    } else {
      setSelected((prev) => prev.concat(option));
    }
  };

  const getFilterParams = () => {
    const featuresEntries = getFeaturesEntries(selected);

    const params: ParamKeyValuePair[] = [
      ...featuresEntries,
      ['categoryId', String(categoryId)],
      ['minPrice', String(prices[0])],
      ['maxPrice', String(prices[1])],
    ];

    return params;
  };

  const clearSelectedOptions = () => {
    setSelected([]);
    setShowApplyBtn(false);
  };
  // TODO: refactoring;
  const getCount = async () => {
    // FEATURE: loader;
    try {
      const params = getFilterParams();

      const res = await Devices.get({ limit: 20, offset: 0, filters: params });

      setCount(res.data.devices.length);
    } catch (error) {
      setCount(0);
    }
  };
  // TODO: refactoring;
  useEffect(() => {
    if (selected.length === 0) return;

    const timeoutId = setTimeout(() => getCount(), 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selected.length]);

  const apply = () => {
    const params = getFilterParams();

    setSearchParams(params);

    dispatch(
      getDevices({
        offset: 0,
        limit: 20,
        filters: params,
      }),
    );

    setShowApplyBtn(false);
  };

  const hasSelectedItems = selected.length > 0;
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values = {
    btnVerticalOffset,
    setBtnVerticalOffset,
    selected,
    setSelected,
    onSelectOption,
    clearSelectedOptions,
    showApplyBtn,
    setShowApplyBtn,
    hasSelectedItems,
    setPrices,
    apply,
    prices,
    count,
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
}
