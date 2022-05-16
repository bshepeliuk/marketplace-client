export const InfoStatus = {
  show: 'show-accordion-info',
  hide: 'hide-accordion-info',
} as const;
// prettier-ignore
export type InfoStatusUnion = typeof InfoStatus[keyof typeof InfoStatus];
