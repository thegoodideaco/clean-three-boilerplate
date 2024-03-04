export function downloadFile(
  file: BlobPart,
  name: string,
  type: string = 'application/octet-stream'
) {
  const blob = new Blob([file], { type })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
