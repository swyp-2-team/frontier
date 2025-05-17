export function formatDate(date: string | Date): string {
  const d = new Date(date);

  // UTC + 9시간 (ms 기준)
  const kstTime = new Date(d.getTime() + 9 * 60 * 60 * 1000);

  const yy = String(kstTime.getFullYear()).slice(2);
  const mm = String(kstTime.getMonth() + 1).padStart(2, "0");
  const dd = String(kstTime.getDate()).padStart(2, "0");

  const hourRaw = kstTime.getHours();
  const hour = String(hourRaw % 12 || 12).padStart(2, "0"); // 12시간제 변환
  const min = String(kstTime.getMinutes()).padStart(2, "0");
  const ampm = hourRaw >= 12 ? "PM" : "AM";

  return `${yy}.${mm}.${dd}. ${hour}:${min}${ampm}`;
}
