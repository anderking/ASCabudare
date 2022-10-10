export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isNullOrUndefinedEmpty(value: any) {
  return value === null || value === undefined || value === "";
}
