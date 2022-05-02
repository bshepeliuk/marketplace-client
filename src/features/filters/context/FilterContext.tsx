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
import * as Api from '@src/common/api/Api';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
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
  shouldBeInitial: boolean;
  setShouldBeInitial: Dispatch<SetStateAction<boolean>>;
}

export const FilterContext = createContext<IContext | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [shouldBeInitial, setShouldBeInitial] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const categoryId = useGetCategoryId();

  const [showApplyBtn, setShowApplyBtn] = useState<boolean>(false);
  const [prices, setPrices] = useState<number[]>([]);
  const [selected, setSelected] = useState<ISelectProps[]>([]);
  const [btnVerticalOffset, setBtnVerticalOffset] = useState<number>(0);
  const options = useTypedSelector((state) => state.filters.options);

  const hasSelectedItems = selected.length > 0;
  const isInitPrice = Object.values(options.prices).every((price) => {
    return prices.includes(price);
  });

  useEffect(() => {
    if (categoryId) setPrices([]);
  }, [categoryId]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (hasSelectedItems || !isInitPrice) {
      timeoutId = setTimeout(getCount, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selected.length, prices]);

  const onSelectOption = (option: ISelectProps) => {
    if (isInArray(option.id, selected)) {
      setSelected((prev) => prev.filter((i) => i.id !== option.id));
    } else {
      setSelected((prev) => prev.concat(option));
    }
  };

  const clearSelectedOptions = () => {
    setSelected([]);
    setCount(0);
    setShouldBeInitial(true);
    setShowApplyBtn(false);
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

    setShowApplyBtn(false);
  };
  // FEATURE: loader for counter;
  async function getCount() {
    try {
      const params = getFilterParams();

      const res = await Api.Devices.get({
        limit: 20,
        offset: 0,
        filters: params,
      });

      setCount(res.data.devices.length);
    } catch (error) {
      setCount(0);
    }
  }

  function getFilterParams() {
    const featuresEntries = getFeaturesEntries(selected);

    const params: ParamKeyValuePair[] = [
      ...featuresEntries,
      ['categoryId', String(categoryId)],
      ['minPrice', String(prices[0])],
      ['maxPrice', String(prices[1])],
    ];

    return params;
  }
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
    shouldBeInitial,
    setShouldBeInitial,
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
}
