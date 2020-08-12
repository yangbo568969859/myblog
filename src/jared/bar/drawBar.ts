import { BarOption } from './option';
export default class DrawBar {
  date: any;
  constructor(dt: any, colors: any = ['#FFA655', '#F77F5B', '#F06161']) {
    const option = BarOption;
    const data = this.parseData(dt);
    const names = [];
    let minNum = 0;
    let maxNum = 0;
    for (let i = 0; i < data.length; i++) {
      names.push(data[i].name.slice(0, 10));
      if (minNum < data[i].value) minNum = data[i].value
      if (maxNum > data[i].value) maxNum = data[i].value
    }
    const filterPointInfo = (res) => {
      console.log(res)
      let html;
      html = res[0].name + "<br>";
      for (let i = 0; i < res.length; i++) {
        if (res[i].value == undefined || res[i].value == "undefined") continue;
        html += '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:15px;height:15px;background-color:' + res[i].color + ';"></span>';
        html += res[i].value + "<br>";
      }
      return html;
    }
    option.tooltip.formatter = filterPointInfo;
    option.visualMap.inRange.color = colors;
    option.yAxis.data = names;
    option.visualMap.min = minNum;
    option.visualMap.max = maxNum;
    option.series[0].data = data;
    this.date = JSON.parse(JSON.stringify(option));
  }
  parseData(dt) {
    const data = dt.sort((a, b) => {
      const strA = a.value;
      const strB = b.value;
      return strA < strB ? -1 : 1;
    });
    return data;
  }
}