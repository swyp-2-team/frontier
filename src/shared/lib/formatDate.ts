export function formatDate(date: string | Date): string {
  const d = new Date(date);

  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  const hour = d.getHours();
  const min = String(d.getMinutes()).padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";

  return `${yy}.${mm}.${dd}. ${hour}:${min}${ampm}`;
}
