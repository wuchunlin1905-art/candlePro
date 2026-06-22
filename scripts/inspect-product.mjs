import fs from 'fs'

const html = fs.readFileSync('scripts/page.html', 'utf8')
const re = /module-data='([^']+)'/g
let m
while ((m = re.exec(html)) !== null) {
  try {
    const b = JSON.parse(decodeURIComponent(m[1]))
    const pl = b?.mds?.moduleData?.data?.productList
    if (pl?.[0]) {
      console.log(JSON.stringify(pl[0], null, 2))
      break
    }
  } catch {}
}
