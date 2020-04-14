/*
    url:导出的地址
    params:传入的对象
    times:时间
*/
import {formatTime} from "@/global/filters"
import URI from 'urijs'
export function exportExcelOrJsonFun(url, params, times) {
    let timesArr = times.split("-")
    let start = new Date((timesArr[0] + "-" + timesArr[1] + "-" + timesArr[2])).getTime();
    let end = new Date((timesArr[3] + "-" + timesArr[4] + "-" + timesArr[5])).getTime();
    let day1 = Math.ceil(Number(end - start) / (90 * 24 * 60 * 60 * 1000))//取整
    let dateArr = []
    if (day1 > 0) {
        for (let i = 0; i < day1; i++) {
            if (i < day1 - 1) {
                dateArr.push(formatTime((start + i * 90 * 24 * 60 * 60 * 1000) / 1000) + "-" + formatTime((start + (i + 1) * 90 * 24 * 60 * 60 * 1000) / 1000-1))
            } else {
                dateArr.push(formatTime((start + i * 90 * 24 * 60 * 60 * 1000) / 1000) + "-" + formatTime(end / 1000))
            }
        }
    }
    const uri = URI(url) // 导出路径
    const model = Object.assign(params, params) // 集合筛选条件和验证
    uri.addQuery(model)
    let obj = uri.toString()
    let arr = []
    for (let i = 0; i < dateArr.length; i++) {
        arr.push(obj+"&export_time="+dateArr[i])
    }
    for (let j = 0; j < arr.length; j++) {
		setTimeout(() => {
			// console.log(j, arr[j])
            // window.open(arr[j])
            window.location.href = arr[j]
		}, 500 * j)
	}
}

/**
 * 超过三个月分开导出
 * 
 * url：导出的地址
 * params：导出的参数
 * startTime，endTime：时间戳（秒）
 * startField：开始字段
 * endField: 结束字段
 */
export function exportExcelOrJson(url, params, startField, endField) {
    // console.log(url, params, startField, endField)
	let start_created_at = params.startTime
	let end_created_at = params.endTime
	let ninetyDay = 90 * 24 * 3600 // 90天的秒数
	let StartDiffEnd = end_created_at - start_created_at // 时间区间 = 结束时间 - 开始时间
	let exportCount = Math.ceil(StartDiffEnd / ninetyDay) // 取余
	const uri = URI(url) // 导出路径
	const model = uri.addQuery(params)
	const openUrlList = []
	for (let i = 0; i < exportCount; i++) {
		let start,end
		if (i < exportCount - 1) { // 过滤出最后一次
			start = start_created_at + (ninetyDay * i)
			end = start_created_at + (ninetyDay * (i + 1))
		} else {
			start = start_created_at + (ninetyDay * i)
			end = end_created_at
		}
		openUrlList.push(model + '&' + startField + '=' + start + '&' + endField + '=' + end)
	}
	for (let j = 0; j < openUrlList.length; j++) {
		setTimeout(() => {
			// console.log(j, openUrlList[j])
			window.open(openUrlList[j])
		}, 1000 * j)
	}
}
