export function formatBytes(bytes: number): string {
  if (Number.isNaN(bytes) || bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** index;

  return `${value.toFixed(2)} ${units[index]}`;
}

export function formatPercentage(value: number, decimals = 2): string {
  if (Number.isNaN(value)) {
    return "0.00%";
  }

  return `${value.toFixed(decimals)}%`;
}

export function formatCurrency(amount: number, currency = "$"): string {
  if (Number.isNaN(amount)) {
    return ` ${currency}0.00`;
  }

  return ` ${currency}${amount.toFixed(2)}`;
}
