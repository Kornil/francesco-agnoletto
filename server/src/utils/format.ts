export const sumAllValues = (values: number[]): number =>
  values.reduce((sum, value) => sum + value, 0);

export const averageAllValues = (values: number[]): number =>
  values.reduce((sum, value) => sum + value, 0) / values.length;

export const formatDate = (date: Date): string =>
  date.toISOString().split("T")[0];
