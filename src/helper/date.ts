export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTimeRange = (isoDate: string, durationHours: number): string => {
  const start = new Date(isoDate);
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return `${formatTime(start)} - ${formatTime(end)}`;
};
