export const grid = {
  left: '0%',
  right: '0%',
  bottom: '5%',
  top: '2%',
  containLabel: true
}

export const yAxis = {
  type: 'value',
  axisLabel: {
    formatter: function (value) {
      return value;
    },
    fontSize: 16,
    color: '#595757'
  },
  axisPointer: { show: false },
  axisLine: { show: false },
  axisTick: { show: false },
  minInterval: 1, //会出现负数刻度
  min: 0
}

export const xAxis = {
  axisLine: {
    width: 0.5
  },
  axisTick: {
    show: false,
    lineStyle: {
      width: 4
    }
  },
  axisLabel: {
    showMaxLabel: true, fontSize: 16, margin: 20, rotate: 45, color: '#999999'
  }
}

export const tooltip = {
  backgroundColor: 'rgba(50,50,50,0.9)',
  padding: 6,
  textStyle: {
    fontSize: 20,
  },
  triggerOn: 'click'
}

export const optionsLine = {
  tooltip: {
    trigger: 'axis',
    ...tooltip
  },
  grid: {
    top: 10,
    bottom: 30,
    right: 10,
    left: 20
  },
  xAxis: {
    type: "category",
    data: [],
    ...xAxis
  },
  yAxis: [
    {
      type: "value",
      ...yAxis
    }
  ],
  series: []
}


export const Option2 = {
  color: ['#DD0B10',
    '#FF6060',
    '#FFA655',
    '#FEDD7F',
    '#AE79FF',
    '#FFAFE6',
    '#D7C7D2',
    '#92B8FF'],
  grid: {
    left: '0%',
    right: '0%',
    bottom: '5%',
    top: '2%',
    containLabel: true
  },
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
    triggerOn: 'click',
    formatter: (res) => {
      // console.log(res);
      return "demo"
    }
  },

  xAxis: [
    {
      axisPointer: {
        type: "none",
        label: {
          show: false
        },
        z: -1,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#D8D8D8"
        }
      },
      splitLine: {
        lineStyle: {
          color: "#D8D8D8"
        }
      },
      type: 'category',
      axisLabel: {
        interval: 0,
        showMaxLabel: true, fontSize: 14, margin: 20, rotate: 45, color: '#222222'
      },
      boundaryGap: ['30%', '30%'],
      axisTick: { show: false },
      data: null
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: function (value) {
          return value + '%';
        },
        fontSize: 16,
        color: '#595757'
      },
      axisPointer: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      minInterval: 1, //会出现负数刻度
      min: 0
    }
  ],
  series: [
    {
      name: 'Forest',
      type: 'bar',
      stack: "bar1",
      barGap: 0,
      barWidth: "20%",
      itemStyle: {
        // color:"#000000",
      },
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'Steppe',
      type: 'bar',
      stack: "bar1",
      data: [220, 182, 191, 234, 290]
    },
    {
      name: 'Desert',
      type: 'bar',
      stack: "bar1",
      data: [150, 232, 201, 154, 190]
    },
    {
      name: 'Wetland',
      type: 'bar',
      barWidth: "20%",
      data: [1098, 977, 1101, 999, 1040]
    }
  ]
};