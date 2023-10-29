export function formatDateToDDMMYYYY(dateString: string): string {
  const inputDate = new Date(dateString);

  const day = inputDate.getUTCDate().toString().padStart(2, '0');
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = inputDate.getUTCFullYear();

  return `${day}-${month}-${year}`;
}
