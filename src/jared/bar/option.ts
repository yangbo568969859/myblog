import { grid } from '@/constants/echart';
export const BarOption = {
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
    type: 'value',
    boundaryGap: [0, 0.01],
    axisPointer: { show: false },
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
    axisLabel: {
      interval: 0,
      showMaxLabel: true, fontSize: 14, margin: 20, color: '#222222',
      formatter: (res) => {
        return res + '%'
      }
    },
    data: []
  },
  yAxis: {
    axisPointer: {
      type: "none",
      label: {
        show: false
      },
    },
    splitLine: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    type: 'category',
    data: ['意大利', '韩国', '美国', '印度', '日本', "韩国", "发过", "伊朗"]
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