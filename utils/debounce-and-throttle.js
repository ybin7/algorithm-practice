function debounce(fn, delay) {
  let timer = null

  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    let _this = this
    let _args = arguments
    console.log({arguments})
    timer = setTimeout(function () {
      fn.apply(_this, _args)
    }, delay)
  }
}

function debounceClick(e) {
  console.log(arguments)
  console.log('点击', e)
}

$('#throttleBind').click(debounce(debounceClick, 1000))
