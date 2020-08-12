import LineDataParser from './lineDataParser';

/* eslint-disable */
export default class DrawLines {
  data = null;
  constructor(dt, lineViewData, BF = false, areaShow, offStr, legendStat = false) {
    let items = lineViewData.items;
    let colorHash = lineViewData.colorHash;
    let grid = {
      left: '0%',
      right: '0%',
      bottom: '5%',
      top: '2%',
      containLabel: true
    };
    let data = new LineDataParser(dt);
    let areaColorStyle = {
      opacity: 0.4,
    }
    if (!areaShow) areaColorStyle = null;
    let total = data.length;
    let count = 0;
    for (let i = total; i--; i >= 0) {
      data[i].show = (count % dis == 0) ? true : false;
      count++;
    }
    let mathInterval = (index, value) => {
      return data[index].show || false;
    }
    let filterPointInfo = (res) => {
      let str = '';
      let html;
      html = res[0].name + "<br>";
      if (!offStr) offStr = '';
      for (let i = 0; i < res.length; i++) {
        str = '';
        if (res[i].value == undefined || res[i].value == "undefined") continue;
        html += '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:15px;height:15px;background-color:' + res[i].color + ';"></span>';

        if (namesMapData[res[i].seriesName]) {
          str = namesMapData[res[i].seriesName];
        } else {
          str = res[i].seriesName + ":";
        }
        if (BF) {
          html += offStr + str + res[i].value + "%<br>";
        } else {
          html += offStr + str + res[i].value + "<br>";
        }
      }
      return html;
    }
    let option = {
      grid: grid,
      // legend:{},
      dataZoom: [{
        startValue: '3-14'
      }, {
        type: 'inside'
      }],
      tooltip: {
        axisPointer: {
          type: "cross",
          snap: true,
          axis: "auto",
        },
        textStyle: {
          fontWeight: "normal",
          fontSize: 20,
          lineHeight: 30,
          fontFamily: 'Arial'
        },
        position: (res) => {
          // return [res[0],55];
        },
        borderRadius: 10,
        backgroundColor: "rgba(0,0,0,0.75)",
        backgroundRadio: 20,
        padding: [6, 12, 6, 12],
        trigger: "axis",
        formatter: filterPointInfo,
        triggerOn: 'click'
      },
      xAxis: {
        axisPointer: {
          type: "line",
          label: {
            show: false
          },
          z: -1,
        },
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          interval: mathInterval,
          showMaxLabel: true,
          fontSize: 16,
          margin: 20,
          rotate: 45,
          color: '#999999'
        },
        boundaryGap: ['30%', '30%'],
        axisTick: {
          show: false
        },
        data: data.map(function (d) {
          return d.date;
        })
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            if (BF) {
              return value + '%';
            } else {
              return value;
            }
          },
          fontSize: 16,
          color: '#595757'
        },
        axisPointer: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        minInterval: 1, //会出现负数刻度
        min: 0
      },
      series: items.map(function (d) {
        return {
          name: d,
          type: 'line',
          smooth: true,
          symbolSize: 8,
          lineStyle: {
            width: 4
          },
          itemStyle: {
            color: colorHash[d]
          },
          areaStyle: areaColorStyle,
          // stack: '总量',
          data: data.map(function (da) {
            return da[d];
          })
        };
      })
    };
    legendStat = true;
    if (legendStat) {
      option.legend = {
        show: false
      };
    }
    this.data = JSON.parse(JSON.stringify(option))
  }
}