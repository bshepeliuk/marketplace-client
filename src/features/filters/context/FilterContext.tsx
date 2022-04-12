import React, {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { IDeviceInfo } from '@src/features/devices/types';
import isInArray from '@src/common/utils/isInArray';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { getDevices } from '@src/features/devices/devicesSlice';

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
}

export const FilterContext = createContext<IContext | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const [showApplyBtn, setShowApplyBtn] = useState<boolean>(false);
  const [prices, setPrices] = useState<number[]>([]);
  const [selected, setSelected] = useState<ISelectProps[]>([]);
  const [btnVerticalOffset, setBtnVerticalOffset] = useState<number>(0);

  const onSelectOption = (option: ISelectProps) => {
    if (isInArray(option.id, selected)) {
      setSelected((prev) => prev.filter((i) => i.id !== option.id));
    } else {
      setSelected((prev) => prev.concat(option));
    }
  };

  const clearSelectedOptions = () => setSelected([]);

  const apply = async () => {
    // FIXME: add action; save to state only desc. and title;
    const options = selected.reduce((acc, current) => {
      return {
        description: (acc.description || []).concat(current.description),
      };
    }, {} as Record<'description', string[]>);

    const filters = {
      prices,
      description: options.description,
    };

    dispatch(
      getDevices({
        filters,
        offset: 0,
        limit: 20,
        categoryId: 1,
      }),
    );
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
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
}

export const useFilterContext = () => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider.');
  }

  return context;
};
