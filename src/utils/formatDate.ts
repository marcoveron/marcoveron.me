// src/utils/formatDate.ts

type DateStyle = "long" | "medium" | "short" | "dayMonth"

const dateStyles: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  long: { dateStyle: "long" },
  medium: { dateStyle: "medium" },
  short: { dateStyle: "short" },
  // Sin año: el índice de escritos ya lo agrupa por año en el margen
  dayMonth: { day: "numeric", month: "short" },
}

export function formatDate(
  date: Date,
  style: DateStyle = "long",
  options?: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: "UTC",
    ...dateStyles[style],
    ...options,
  }).format(date)
}
