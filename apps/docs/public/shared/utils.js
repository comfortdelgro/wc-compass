export function downloadHTMLContent(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {cache: 'no-cache'})
      .then((response) => response.text())
      .then((data) => {
        if (data) {
          resolve(data)
        } else {
          reject(new Error('Loaded file is not valid HTML File"'))
        }
      })
      .catch(() => {
        reject(new Error('Error loading HTML'))
      })
  })
}
