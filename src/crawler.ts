import fs from 'fs-extra'
import { resolve } from 'path'

const c = Array.from(document.querySelector('#app').children)
const map = {}
c.forEach((v, i) => {
  if (i !== 0) {
    const aas = v.querySelectorAll('a')
    const parent = {
      url: aas[0].href,
      contest: aas[0].textContent
    }
    for (let i = 1; i < aas.length; i++) {
      const element = aas[i]
      if (!element.textContent.trim()) continue
      map[element.textContent.substring(0, element.textContent.indexOf('.'))] =
        parent
    }
  }
})

const r = (...args: string[]) => resolve(__dirname, '..', ...args)

fs.writeJsonSync(r('data.json'), map, { spaces: 2 })
