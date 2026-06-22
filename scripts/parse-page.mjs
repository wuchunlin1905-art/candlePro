import fs from 'fs'

const html = fs.readFileSync('scripts/page.html', 'utf8')

// All module-data JSON blobs
const re = /module-data='([^']+)'/g
let m
const blobs = []
while ((m = re.exec(html)) !== null) {
  try {
    blobs.push(JSON.parse(decodeURIComponent(m[1])))
  } catch {}
}

console.log('blobs', blobs.length)

for (const b of blobs) {
  const str = JSON.stringify(b)
  if (str.includes('subject') || str.includes('productId') || str.includes('offer')) {
    console.log('--- blob with products, size', str.length)
    // find product-like arrays
    walk(b, '')
  }
}

function walk(obj, path) {
  if (!obj || typeof obj !== 'object') return
  if (Array.isArray(obj) && obj.length > 0 && obj[0]?.subject) {
    console.log('FOUND at', path, 'count', obj.length)
    console.log(JSON.stringify(obj[0], null, 2).slice(0, 800))
  }
  for (const [k, v] of Object.entries(obj)) {
    walk(v, path ? `${path}.${k}` : k)
  }
}

const ids = [...new Set([...html.matchAll(/_(\d{12,13})\.html/g)].map((x) => x[1]))]
console.log('html ids', ids.length, ids.slice(0, 5))
