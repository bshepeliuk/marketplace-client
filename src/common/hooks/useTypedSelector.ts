import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '@src/app/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
