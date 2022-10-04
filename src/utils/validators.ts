export const required = (value: string) =>
  value || typeof value === "number" ? undefined : "Required";

// max length
const maxLength = (max: number) => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength15 = maxLength(15);
export const maxLength100 = maxLength(100);

// min length
const minLength = (min: number) => (value: string) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
