/** Escape HTML special characters to prevent XSS in email templates */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Encode all non-ASCII characters in an HTML string as numeric entities.
 *  Safe to call on completed HTML - tags/attributes are pure ASCII. */
export function encodeNonAsciiHtml(html: string): string {
  return html.replace(/[^\x00-\x7F]/g, (ch) => `&#${ch.charCodeAt(0)};`);
}
