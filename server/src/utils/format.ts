export const sumAllValues = (values: number[]) =>
  values.reduce((sum, value) => sum + value, 0);

export const averageAllValues = (values: number[]) =>
  values.reduce((sum, value) => sum + value, 0) / values.length;

export const formatDate = (date: Date) => date.toISOString().split("T")[0];
