export interface Option {
  readonly label: string;
  readonly value: string;
}

export type SelectActionTypes =
  | 'clear'
  | 'create-option'
  | 'deselect-option'
  | 'pop-value'
  | 'remove-value'
  | 'select-option'
  | 'set-value';
