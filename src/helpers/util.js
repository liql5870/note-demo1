// 导出函数 friendlyDate ,接受一个参数
export function friendlyDate (datsStr) {
  // 声明一个对象，先判断传入参数的类型，如果是一个对象的话，就返回它本身，如果不是一个对象的话，就用newDate
  // 方法进行包裹
  // 但是关键是，为什么要这么做呢，为什么要做一次类型判断？？
  const dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
  // 声明变量，获取到变量的毫秒数
  const time = dateObj.getTime()
  // 然后获取现在的时间从1970年的毫秒数，使用的是UTC时间。
  const now = Date.now()
  // 然后通过现在的时间减去当时创建的时间，就得到了，一个变量值，再对这个变量值进行处理。
  // 就可以得到我们所期望的世界，这里的时间是我们想要展示，多少分钟，多少天前，或者多少年之前
  const space = now - time
  // 声明一个变量用来存储时间的空字符串
  let str = ''
  switch (true) {
    // 小于60000ms也就是60s一分钟被视为刚刚
    case space < 60000:
      str = '刚刚'
      break
    // 小于1小时，是多少分钟前
    case space < 1000 * 3600:
      str = Math.floor(space / 60000) + '分钟前'
      break
    // 小于24小时被视为多少小时前
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + '小时前'
      break
    case space < 1000 * 3600 * 24 * 30 :
      str = Math.floor(space / (1000 * 3600 * 24)) + '天前'
      break
    case space > 1000 * 3600 * 24 * 30 && space < 1000 * 3600 * 24 * 365 :
      str = Math.floor(space / (1000 * 3600 * 24 * 30)) + '月前'
      break
    default:
      str = Math.floor(space / (1000 * 60 * 60 * 24 * 30 * 12)) + '年前'
  }
  return str
}
