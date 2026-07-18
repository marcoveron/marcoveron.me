import getReadingTime from "reading-time"
import { toString } from "mdast-util-to-string"

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)
    // Tiempo de lectura en español, p. ej. "3 min de lectura".
    const minutes = Math.max(1, Math.ceil(readingTime.minutes))
    data.astro.frontmatter.minutesRead = `${minutes} min de lectura`
  }
}
