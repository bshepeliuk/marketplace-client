import React, {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { IDeviceInfo } from '@src/features/devices/types';
import isInArray from '@src/common/utils/isInArray';

type ISelectProps = Pick<IDeviceInfo, 'id' | 'title' | 'description'>;

interface IFilterContext {
  btnVerticalOffset: number;
  showApplyBtn: boolean;
  hasSelectedItems: boolean;
  selected: ISelectProps[];
  // eslint-disable-next-line no-unused-vars
  onSelectOption: (option: ISelectProps) => void;
  clearSelectedOptions: () => void;
  setBtnVerticalOffset: Dispatch<SetStateAction<number>>;
  setShowApplyBtn: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<ISelectProps[]>>;
}

export const FilterContext = createContext<IFilterContext>({
  showApplyBtn: false,
  hasSelectedItems: false,
  btnVerticalOffset: 0,
  selected: [],
  onSelectOption: () => {},
  setSelected: () => {},
  setBtnVerticalOffset: () => {},
  clearSelectedOptions: () => {},
  setShowApplyBtn: () => {},
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [showApplyBtn, setShowApplyBtn] = useState<boolean>(false);
  const [selected, setSelected] = useState<ISelectProps[]>([]); // NOTE: change name for selected options
  const [btnVerticalOffset, setBtnVerticalOffset] = useState<number>(0);

  const onSelectOption = (option: ISelectProps) => {
    if (isInArray(option.id, selected)) {
      setSelected((prev) => prev.filter((i) => i.id !== option.id));
    } else {
      setSelected((prev) => prev.concat(option));
    }
  };

  const clearSelectedOptions = () => setSelected([]);

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
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
}

export const useFilterContext = () => useContext(FilterContext);
