export const MARKER = "<!-- Sticky Header Marker -->";

export function addHeader(header: string, currentBody: string): string {
  const markerIndex = currentBody.indexOf(MARKER);

  if (markerIndex >= 0) {
    const tail = currentBody.slice(markerIndex + MARKER.length).replace(/^\s+/, "");
    return `${header}${MARKER}\n\n${tail}`;
  }

  return `${header}${MARKER}\n\n${currentBody}`;
}
