import { ManifestV3Export } from 'rollup-plugin-chrome-extension'

const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: 'Leetcode Enhancer',
  description: 'Get contest info about problem',
  version: '0.0.1',
  author: 'Eureka<iherewithmyheart@gmail.com>',
  background: {
    type: 'module',
    service_worker: 'src/background/index.ts'
  },
  icons: {
    '16': 'src/assets/favicon-16.png',
    '48': 'src/assets/favicon-32.png',
    '128': 'src/assets/favicon-96.png'
  },
  action: {
    default_title: 'popup',
    default_popup: 'src/popup/index.html',
    default_icon: {
      16: 'src/assets/favicon-16.png',
      48: 'src/assets/favicon-32.png',
      128: 'src/assets/favicon-96.png'
    }
  },
  host_permissions: ['https://leetcode-cn.com/problems/*/'],
  permissions: ['storage', 'activeTab', 'scripting', 'webNavigation']
}

export default manifest
