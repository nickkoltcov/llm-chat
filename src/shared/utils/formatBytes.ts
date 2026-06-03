export const formatBytes = (num: number) => {
  if (num === 0) return "0 Bytes";

  const bytesInKilobyte = 1024;
  const sizeUnits = ["Bytes", "KB", "MB", "GB", "TB"];

  const unitIndex = Math.floor(Math.log(num) / Math.log(bytesInKilobyte));

  return `${parseFloat((num / Math.pow(bytesInKilobyte, unitIndex)).toFixed(1))} ${sizeUnits[unitIndex]}`;
};
