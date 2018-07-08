export const getRelativeTime = (createTime) => {
  const fromTimeStamp = Date.parse(createTime)
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
    const year = Math.floor(month / 12)
    const extraMonth = month % 12
    if (extraMonth) {
      return `${year}年${extraMonth}个月`
    }
    return `${year}年`
  }
}

export const getRate = (originRate) => (Math.floor(originRate * 10 / 5)) * 0.5

