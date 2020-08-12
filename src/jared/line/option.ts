import { grid } from '@/constants/echart';
export const LineOption = {
  grid: grid,
  visualMap: {
    show: false,
    type: "continuous",
    min: 100,
    max: 300,
    inRange: {
      color: ['#FFA655', '#F77F5B', '#F06161'],
      // symbolSize: [30, 100]
    }
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
    formatter: null
  },
  xAxis: {
    axisPointer: {
      type: "none",
      label: {
        show: false
      },
      z: -1,
    },
    type: 'category',
    axisLabel: {
      interval: 0,
      showMaxLabel: true, fontSize: 14, margin: 20, rotate: 45, color: '#222222'
    },
    boundaryGap: ['30%', '30%'],
    axisTick: { show: false },
    data: []
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize: 16,
      color: '#595757'
    },
    axisPointer: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    minInterval: 1, //会出现负数刻度
    min: 0
  },
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar',
    barWidth: "30%",
    emphasis: {
      itemStyle: {
        color: "#FFD661",
      }
    }
  }]
}