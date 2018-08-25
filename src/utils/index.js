export const getRelativeTime = (createTime) => {
  const fromTimeStamp = typeof(createTime) === 'number' ? createTime : Date.parse(createTime)
  console.log(typeof fromTimeStamp)
  const now = Date.now()
  const relativeTime = now - fromTimeStamp
  const month = Math.floor(relativeTime / (24 * 3600 * 30 * 1000))
  if (month < 1) {
    return `${Math.floor(relativeTime / (24 * 3600 * 1000))}天`
  }
  if (month < 12) {
    return `${month}个月`
  }
  if (month > 12) {
    console.log('here')
    const year = Math.floor(month / 12)
    const extraMonth = month % 12
    if (extraMonth) {
      return `${year}年${extraMonth}个月`
    }
    return `${year}年`
  }
}

export const getRelativeMinutes = (createTime) => {
  const fromTimeStamp = createTime
  const now = Date.now()
  const relativeTime = now - fromTimeStamp
  const seconds = Math.floor(relativeTime / 1000)
  if (seconds < 60) {
    return '刚刚'
  }
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes}分钟前`
  }
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours}小时前`
  }
  const days = Math.floor(hours / 24)
  return `${days}日前`
}

export const getRate = (originRate) => (Math.floor(originRate * 10 / 5)) * 0.5

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export const contains = (root, n) => {
  let node = n
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }
  return false
}
