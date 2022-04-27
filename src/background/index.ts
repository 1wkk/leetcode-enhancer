import data from './data.json'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ data })
})

const insertInfo = (data, tab) => {
  if (
    !tab.url.includes('comments') &&
    !tab.url.includes('solution') &&
    !tab.url.includes('submissions')
  ) {
    const id = document
      .querySelector('h4 a')
      .textContent.substring(
        0,
        document.querySelector('h4 a').textContent.indexOf('.')
      )
    const a = document.createElement('a')
    if (data[id] && document.querySelectorAll('h4 a').length <= 1) {
      a.textContent = data[id]['contest']
      a.target = '_blank'
      a.style.marginLeft = '10px'
      a.style.fontSize = '10px'
      a.style.color = '#E799B0'
      a.href = data[id]['url']
      document.querySelector('h4').appendChild(a)
    }
  }
}

chrome.webNavigation.onCompleted.addListener(
  async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const { data } = await chrome.storage.local.get('data')
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [data, tab],
      func: insertInfo
    })
  },
  {
    url: [
      { urlContains: 'leetcode-cn.com/problems/' },
      { urlContains: 'https://leetcode.cn/problems/*/' }
    ]
  }
)

chrome.webNavigation.onHistoryStateUpdated.addListener(
  async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const { data } = await chrome.storage.local.get('data')
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [data, tab],
      func: insertInfo
    })
  },
  {
    url: [
      { urlContains: 'leetcode-cn.com/problems/' },
      { urlContains: 'https://leetcode.cn/problems/*/' }
    ]
  }
)

export {}
