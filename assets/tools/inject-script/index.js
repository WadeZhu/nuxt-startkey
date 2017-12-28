export default function (url, onload, onerror) {
  let script = document.createElement('script')
  // onload fires even when script fails loads with an error.
  script.onload = onload
  // onerror fires for malformed URLs.
  script.onerror = onerror
  script.src = url
  document.head.appendChild(script)
}