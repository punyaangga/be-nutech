export const successResponse = (message: string, data?: any) => ({
  status: "success",
  message,
  data,
});

export const errorResponse = (message: string | any, data?: any) => ({
  status: "error",
  message,
  data,
});
