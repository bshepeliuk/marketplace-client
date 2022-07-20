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
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { getDevices } from '@src/features/devices/devicesSlice';
import useGetCategoryId from '@src/features/categories/hooks/useGetCategoryId';
import getFeaturesEntries from '../helpers/getFeaturesEntries';

type ISelectProps = Pick<IDeviceInfo, 'id' | 'title' | 'description'>;

interface IContext {
  btnOffsetY: number;
  isShownApplyBtn: boolean;
  hasSelectedItems: boolean;
  selected: ISelectProps[];
  onSelectOption: (option: ISelectProps) => void;
  apply: () => void;
  clearSelectedOptions: () => void;
  setBtnOffsetY: Dispatch<SetStateAction<number>>;
  setIsShownApplyBtn: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<ISelectProps[]>>;
  setPrices: Dispatch<SetStateAction<number[]>>;
  prices: number[];
  shouldBeInitial: boolean;
  isInitPrice: boolean;
  setShouldBeInitial: Dispatch<SetStateAction<boolean>>;
  getFilterParams: () => ParamKeyValuePair[];
}

export const FilterContext = createContext<IContext | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [shouldBeInitial, setShouldBeInitial] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const categoryId = useGetCategoryId();

  const [isShownApplyBtn, setIsShownApplyBtn] = useState<boolean>(false);
  const [prices, setPrices] = useState<number[]>([]);
  const [selected, setSelected] = useState<ISelectProps[]>([]);
  const [btnOffsetY, setBtnOffsetY] = useState<number>(0);
  const options = useTypedSelector((state) => state.filters.options);

  const hasSelectedItems = selected.length > 0;
  const isInitPrice = Object.values(options.prices).every((price) => {
    return prices.includes(price);
  });
  const hasChangedPrice = prices.length > 0;

  useEffect(() => {
    if (categoryId) setPrices([]);
  }, [categoryId]);

  useEffect(() => {
    const haveInitParams = checkHaveInitSearchParams(searchParams);

    if (haveInitParams && (hasSelectedItems || hasChangedPrice)) {
      clearSelectedOptions();
    }
  }, [searchParams.toString()]);

  const onSelectOption = (option: ISelectProps) => {
    if (isInArray(option.id, selected)) {
      setSelected((prev) => prev.filter((i) => i.id !== option.id));
    } else {
      setSelected((prev) => prev.concat(option));
    }
  };

  const clearSelectedOptions = () => {
    setSelected([]);
    setShouldBeInitial(true);
    setIsShownApplyBtn(false);
  };

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

    setIsShownApplyBtn(false);
  };

  const checkHaveInitSearchParams = (params: URLSearchParams) => {
    const activeParams = Array.from(params.keys());
    return activeParams.length === 1 && activeParams[0] === 'categoryId';
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

  const values = {
    btnOffsetY,
    setBtnOffsetY,
    selected,
    setSelected,
    onSelectOption,
    clearSelectedOptions,
    isShownApplyBtn,
    setIsShownApplyBtn,
    hasSelectedItems,
    setPrices,
    apply,
    prices,
    shouldBeInitial,
    isInitPrice,
    getFilterParams,
    setShouldBeInitial,
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
}
