const testData = [10, 2, 3, 1, 5, 4, 6, 9, 7, 8]
const testData2 = [1, 3, 2]

/**
 * 冒泡排序
 * 解析：
 * 1. 比较两个相邻的元素，如果前者比后者大，则换位，
 * 2. 第一轮的时候最后的一个元素是当前数组最大的一个元素
 * 3. 按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较
 */
function bubbling(arr = []) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [ arr[j], arr[j + 1] ] = [ arr[j + 1], arr[j] ]
      }
    }
  }

  return arr
}

// console.log(bubbling(testData))

/**
 * 快速排序
 * 解析：快速排序是对冒泡排序的一种优化
 * 1. 先取数组中间位置的 值
 * 2. 然后将数组中的的值与中间值比较，大的值放在右侧，小的值左侧，依次递归调用，在两边都实行递归调用
 */
function quick(arr = []) {
  if (arr.length <= 1) {
    return arr
  }

  let idx = Math.floor(arr.length / 2),
    centerVal = arr.splice(idx, 1)[0],
    left = [],
    right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > centerVal) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }


  return quick(left).concat([centerVal], quick(right))
}

// console.log(quick(testData))

/**
 * 插入排序
 * 解析：
 * 1. 取出第一个元素，默认已经排序
 * 2. 取出下一个元素，在已经排序的的元素中从后往前比较
 * 3. 如果该元素（已排序）大于新元素，将该元素移到下一个位置
 * 4. 重复步骤3，找到已排序的元素小于或等于新元素
 * 5. 将新元素插入到下一个位置中
 * 6. 重复步骤2
 */
function insert (arr = []) {
  if (!Array.isArray(arr)) return arr

  for (let i = 1; i < arr.length; i++) {  
    let key = arr[i];  
    let j = i - 1;  

    // 将大于 key 的元素向后移动  
    while (j >= 0 && arr[j] > key) {  
        arr[j + 1] = arr[j];  
        j = j - 1;  
    }  
    arr[j + 1] = key;  
  }  
  return arr;  
}

console.log(insert([1,3,4,2]))

function sleep(dely = 0) {
  const startTime = new Date().getTime()

  while(new Date().getTime() - startTime < dely)
    continue
}


