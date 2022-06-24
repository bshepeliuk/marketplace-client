import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useCreateBrand from '@src/features/brands/hooks/useCreateBrand';
import useCreateBrandOptions from '@src/features/brands/hooks/useCreateBrandOptions';
import useFetchBrands from '@src/features/brands/hooks/useFetchBrands';
import { useEffect, useRef, useState } from 'react';
import { OnChangeValue, SingleValue } from 'react-select';

interface Option {
  readonly label: string;
  readonly value: string;
}

type SelectActionTypes =
  | 'clear'
  | 'create-option'
  | 'deselect-option'
  | 'pop-value'
  | 'remove-value'
  | 'select-option'
  | 'set-value';

const selectInitState = {
  isClearable: true,
  isSearchable: true,
  isDisabled: false,
  isLoading: false,
};

const useServeBrandSelect = () => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [option, setOption] = useState<SingleValue<Option> | null>(null);
  const [selectState, setSelectState] = useState(selectInitState);
  const brands = useTypedSelector((state) => state.brands);
  const { fetchByFilters } = useFetchBrands();
  const { createBrand } = useCreateBrand();
  const { createOptionsByBrands } = useCreateBrandOptions();

  const options = createOptionsByBrands(brands.items);

  const onCreateOption = async (value: string) => {
    setSelectState((prev) => ({ ...prev, isLoading: true, isDisabled: true }));

    const { payload } = await createBrand({ name: value });

    if (payload === undefined) return;

    if ('brand' in payload) {
      setOption({ label: payload.brand.name, value: payload.brand.name });
    }

    setSelectState((prev) => ({
      ...prev,
      isLoading: false,
      isDisabled: false,
    }));
  };

  const handleChange = (
    newValue: OnChangeValue<Option, false>,
    actionMeta: { action: SelectActionTypes },
  ) => {
    if (actionMeta.action === 'clear') {
      setOption(null);
    }

    setOption(newValue);
  };

  const loadOptions = (value: string, callback: any) => {
    clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);

    timeoutId.current = setTimeout(async () => {
      const { data } = await fetchByFilters({ name: value });
      const createdOptions = createOptionsByBrands(data.brands);

      callback(createdOptions);
    }, 1500);
  };

  useEffect(() => {
    if (brands.isLoading) {
      setSelectState((prev) => ({
        ...prev,
        isDisabled: true,
        isLoading: true,
      }));
    } else {
      setSelectState((prev) => ({
        ...prev,
        isDisabled: false,
        isLoading: false,
      }));
    }
  }, [brands.isLoading]);

  return {
    onCreateOption,
    handleChange,
    loadOptions,
    option,
    options,
    setOption,
    selectState,
    setSelectState,
  };
};

export default useServeBrandSelect;
