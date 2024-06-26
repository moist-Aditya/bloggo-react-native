export function formatDate(date: string) {
  const newdate = new Date(date)

  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const formattedDate = newdate.toLocaleDateString("en-GB", options)
  return formattedDate
}

export function capitalize(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1)
}
