export const cloneDeep = (obj: any) => {
  return structuredClone(obj);
};

export function getLabelByValue(
  array: { label: string; value: any }[],
  value: any,
): string | undefined {
  const item = array.find((element) => element.value === value);
  return item ? item.label : undefined;
}
