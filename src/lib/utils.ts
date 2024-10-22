/* eslint-disable @typescript-eslint/no-explicit-any */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const parseValidationError = (data: any) => {
  const errors: Record<string, string> = {};
  if (!data.error) return { generic: data.message }
  data.error.forEach((error: any) => {
    if (error.path) {
      errors[error.path] = error.message
    }
  })
  return errors;
}
