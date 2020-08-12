<script lang="ts">

// import Vue from "vue";
// import Component from "vue-class-component";
// import ChartAddCanvas from "./chartAddCanvas.vue";
// import ChartCanvasPill from "./chartCanvasPill.vue";
// import util from "@/libs/util";
// import ChartData from "@/service/chartdata";
// import { Prop } from "vue-property-decorator";
// import { countryMapChEn } from "@/constants/country_map";
// import linebox2img from '@/libs/linebox2img'
// import drawLineImg from '@/libs/drawLineImg'
// import LineShare from '@/components/lineShare.vue'
// import getOthData from "@/service/getOthData";
// import StashCanvas from "./stashCanvas.vue";
// import StashCanvas2 from "./stashCanvas.vue";
// import ChartCanvasCountryWeek from '@/components/chartCanvasCountryWeek.vue'
// import API from '@/api'
// import bbo from "@/libs/bbo";
// let speed = 400;
// @Component({
//   components: {
//     ChartAddCanvas,
//     ChartCanvasPill,
//     LineShare,
//     StashCanvas,
//     StashCanvas2,
//     ChartCanvasCountryWeek,
//   }
// })
// export default class haiwaiChartLine1 extends Vue {
//   $refs: {
//     LineShare:LineShare;
//     StashCanvas:StashCanvas;
//     StashCanvas2:StashCanvas2;
//     ChartCanvasCountryWeek:ChartCanvasCountryWeek;
//   }
//   lineImgData:string = '';
//   chartSwiper: any = null;
//   swiperCurrent: any = 1;
//   swiperTotal: any = 3;
//   lineObj1: any = {};
//   lineObj2: any = {};
//   lineObj3: any = {};
//   lineObjTop:any = {}
//   @Prop() wraper: any;
//   @Prop() globalStatis:any;
//   showNum:number = 8;
//   showNumXhou:number = 7;
//   countrys:any = [
//     {
//       name:'意大利',
//       show:true
//     },
//     {
//       name:'巴西',
//       show:true
//     },
//     {
//       name:'西班牙',
//       show:true
//     },
//     {
//       name:'德国',
//       show:true
//     },
//     {
//       name:'英国',
//       show:true
//     },
//     {
//       name:'法国',
//       show:true
//     },
//     {
//       name:'美国',
//       show:true
//     },
//     {
//       name:'俄罗斯',
//       show:true
//     },
//   ];
//   zhouList:any = [
//     {
//       name: '欧洲',
//       show: true,
//     },
//     {
//       name: '北美洲',
//       show: true,
//     },
//     {
//       name: '非洲',
//       show: true,
//     },
//     {
//       name: '亚洲',
//       show: true,
//     },
//     {
//       name: '南美洲',
//       show: true,
//     },
//     {
//       name: '大洋洲',
//       show: true,
//     },
//   ];
//   legendColors:any= {
//     '意大利':'#9B0A0E',
//     '巴西':'#FF7B7C',
//     '西班牙':'#FFA655',
//     '德国':'#FFD661',
//     '英国':'#CD73BF',
//     '法国':'#7E74EB',
//     '美国':'#5591FA',
//     '俄罗斯':'#60BBFC',
//   }
//   zhouColors:any = {
//     '欧洲': '#9B0A0E',
//     '北美洲': '#FF7B7C',
//     '非洲': '#CD73BF',
//     '亚洲': '#FFA655',
//     '南美洲': '#FFD661',
//     '大洋洲': '#7E74EB',
//     '其他': '#FF7B7C',
//   }
//   countrysColor:any = {
//     '印度':'#FFCC5D',
//     '印尼':'#F1413E',
//     '巴西':'#7E74EB',
//     '俄罗斯':'#A3CEFF',
//   };
//   weekCountrys: any = [
//     {
//       name: '印度',
//       show: true,
//     },
//     {
//       name: '印度尼西亚',
//       show: true,
//     },
//     {
//       name: '巴西',
//       show: true,
//     },
//     {
//       name: '俄罗斯',
//       show: true,
//     },
//   ]
//   countrysData:any = {};
//   stashCountrys:any = [];
//   created() {
//     this.chartExp();
//     this.getLineData1();
//     this.drawLinTop(this.$store.state.countryAddTop10);
//     // this.getLineData2();
//     // this.getLineData3();
//   }
//   getLineData1 () {
//     let url = util.format(API.globalStatis,'FAutoCountryMerge')
//     getOthData.getGlobalstais(url).then((res:any) => {
//       if (res.FAutoCountryMerge) {
//         console.log(res)
//         this.formatCountrysData(res.FAutoCountryMerge)
//       }
//     })
//   }
//   getLineData2 () {
//     let url = util.format(API.globalStatis,'FAutoContinentWeekTrend')
//     getOthData.getGlobalstais(url).then((res:any) => {
//       if (res.FAutoContinentWeekTrend) {
//         this.formatData2(res.FAutoContinentWeekTrend);
//       }
//     })
//   }
//   getLineData3 () {
//     let url = util.format(API.globalStatis,'FAutoCountryWeekTrend')
//     let cts = '';
//     this.weekCountrys.map(d => {
//       cts += `,${d.name}`
//     })
//     cts = cts.slice(1)
//     let countrys = encodeURI(cts);
//     getOthData.getGlobalstais(`${url}&country=${countrys}`).then((res:any) => {
//       this.formatData3(res.FAutoCountryWeekTrend)
//     })
//   }
//   // top10
//   drawLinTop(dt) {
//     // console.log("top10 data", this.$store.state.countryAddTop10);
//     dt = dt.sort((a,b) => {
//       return a.confirmCompare > b.confirmCompare ? -1 : 1;
//     })
//     let data = []
//     dt.map((d,i) => {
//       // console.log(d)
//       if (i < 10) {
//         data.push({
//           name:d.name,
//           value:d.confirmCompare,
//         })
//       }
//     });
//     let lineData = {
//       items: ["totalConfirm", "totalHeal", "totalDead"],
//       colorHash: {
//         totalConfirm: "#E65561",
//         totalHeal: "#178B50",
//         totalDead: "#66666C"
//       }
//     };
//     // console.log('top10的数据--------',data)
//     this.lineObjTop = {
//       data,
//       styleData: lineData,
//       a: false,
//       b: false,
//       show: true
//     };
//   }
//   mounted() {
//     util.sleep(100).then(() => {
//       this.initSwiper();
//     });
//     util.sleep(500).then(() => {
//       this.$parent.gotoScroll();
//     })
//   }
//   initSwiper() {
//     if (this.myHtSwiper) {
//       // this.myHtSwiper.init();
//       this.myHtSwiper.slideTo(0, 10);
//     } else {
//       let that = this;
//       this.myHtSwiper = new window.Swiper(`#${that.wraper}`, {
//         loop: false,
//         observer: true,
//         slidesOffsetBefore: 0,
//         width: document.querySelector(".lineItem").scrollWidth,
//         spaceBetween: 40,
//         autoplay: false,
//         speed,
//         longSwipes: 0.1,
//         slide: "slide",
//         pagination: {
//           el: `.line-pagination-${that.wraper}`,
//           type: "custom",
//           bulletClass: "swiper-pagination-customs",
//           clickable: true,
//           renderCustom: function(swiper, current, total) {
//             let text = "";
//             let pagenationHtml = "";
//             for (let i = 0; i < total; i++) {
//               switch (i) {
//                 case 0:
//                   text = `海外多国</br>累计趋势`;
//                   break;
//                 case 1:
//                   text = `24小时新增</br>确诊TOP10`;
//                   break;
//                 // case 2:
//                 //   text = `人口大国</br>周增幅`;
//                 //   break;
//               }
//               if (i == current - 1) {
//                 pagenationHtml += `<span class="swiper-pagination-customs active">${text}</span>`;
//               } else {
//                 pagenationHtml += `<span class="swiper-pagination-customs">${text}</span>`;
//               }

//               that.swiperCurrent = current;
//               that.swiperCount = total;
//               // console.log(this.swiperCurrent, this.swiperCount)
//             }
//             return pagenationHtml;
//           }
//         }
//       });
//     }
//   }
//   swiperPrev() {
//     this.myHtSwiper.slidePrev(speed, false);
//   }
//   swiperNext() {
//     this.myHtSwiper.slideNext(speed, false);
//   }
//   formatCountrysData (data) {
//     let _data = {}
//     for (var i in data) {
//       if (i == '日本本土' || i== '伊朗') {
//         // _data['日本'] = data[i].list;
//       } else {
//         _data[i] = data[i].list;
//         if (data[i].showDash) {
//           this.stashCountrys.push(`${i}`)
//         }
//       }
//     }
//     // console.log(_data)
//     // console.log('多国曲线新接口-------',_data,this.stashCountrys)
//     this.countrysData = _data;
//     this.setDatas();
//   }
//   setDatas() {
//     let that = this;
//     let obj = {};
//     // 将各国曲线的数据，应设成以日期为key的object
//     for (let i in this.countrysData) {
//       let item = this.countrysData[i];
//       let _obj = {}
//       // item.pop();
//       item.map(d => {
//         if (d.date > '02.24') {
//           _obj[d.date] = d;
//         }
//       })
//       obj[i] = _obj;
//     }
//     let arr = []
//     for (let i in obj['意大利']) {
//       let item = obj['意大利'][i]
//       let _obj:any = {}
//       _obj.date = item.date;
//       that.countrys.map(d => {
//         if (obj[d.name][item.date]) {
//           _obj[d.name] = obj[d.name][item.date].confirm
//         } else {
//           _obj[d.name] = 0;
//         }
//       })
//       arr.push(_obj)
//     }
//     this.drawLin(arr)
//   }
//   //
//   filterData(dt) {
//     let data = util.cloneObj(dt);
//     data = data.sort((a, b) => {
//       const strA = a.date;
//       const strB = b.date;
//       return strA < strB ? 1 : -1;
//     });
//     for (let key in data) {
//       let obj = data[key];
//       let str = obj["date"];
//       str = str.slice(1);
//       str = str.replace(".", "-");
//       // str=str.split(0);
//       data[key]["date"] = str;
//       data[key].totalConfirm=obj.confirm || 0;
//       data[key].totalHeal=obj.heal || 0;
//       data[key].totalDead=obj.dead || 0;
//     }
//     // if (data.length > 0) {
//     //   data.shift();
//     // }
//     // console.log('国家折线数据',data)
//     return data;
//   }
//   // 各国
//   drawLin(dt) {
//     let data=this.filterData(dt);
//     let items = [];
//     this.countrys.map(d => {
//       items.push(d.name)
//     })
//     let lineData = {
//       items,
//       colorHash: this.legendColors
//     };
//     this.lineObj1 = {
//       data,
//       styleData: lineData,
//       a: false,
//       // b: false,
//       show: true,
//       legendStat:false,
//       stash:true,
//       stashCountrys:this.stashCountrys
//     };
//     console.log(this.lineObj1)
//   }
//   toggleLines(name,index) {
//     if (!this.$refs.StashCanvas) {
//       return;
//     }
//     if (this.countrys[index].show) {
//       if (this.showNum <= 1) {
//         return;
//       }
//       this.$refs.StashCanvas.hideLine(name)
//       this.countrys[index].show = false;
//       this.showNum -= 1;
//     } else {
//       this.$refs.StashCanvas.showLine(name)
//       this.countrys[index].show = true;
//       this.showNum += 1;
//     }
//   }
//   toggleLines2(name,index) {
//     if (!this.$refs.StashCanvas2) {
//       return;
//     }
//     if (this.zhouList[index].show) {
//       if (this.showNumXhou <= 2) {
//         return;
//       }
//       this.$refs.StashCanvas2.hideLine(name)
//       this.zhouList[index].show = false;
//       this.showNumXhou -= 1;
//     } else {
//       this.$refs.StashCanvas2.showLine(name)
//       this.zhouList[index].show = true;
//       this.showNumXhou += 1;
//     }
//   }
//   shareLine(boxId) {
//     drawLineImg({
//       boxId,
//       that:this
//     })
//   }
//   chartExp(){
//     // 海外H5页面疫情趋势图曝光
//     util.report(
//       {
//         ei:'boss_epidemic_h5_foreign_action',
//         pageFrom: bbo.isNewsApp() ? 'inapp' : 'outapp',
//         chlid:'news_news_antip',
//         subType:'statisticsChartExp',
//         pageArea:'1',
//         osType: bbo.isIOS() ? 'ios' : 'android',
//         uuid: this.$store.state.uuid,
//       },
//       "foreign_page"
//     );
//   }
//   // 处理第二个曲线图的数据
//   formatData2 (data) {
//     console.log(data)
//     let filterData = dt => {
//       let obj = {}
//       let arr = [];
//       let zhouObj = {}
//       this.zhouList.map(d => {
//         zhouObj[d.name] = []
//       })
//       for (let i in zhouObj) {
//         if (i !== '其他') {
//           obj[i] = [];
//           dt[i].map(d => {
//             if (d.date.indexOf('0') == 0) {
//               d.date = d.date.slice(1)
//             }
//             d.date = d.date.replace('/','-')
//             if (d.date >= '3-15') {
//               obj[i].push(d)
//             }
//           })
//         }
//       }
//       let objArr = {}
//       for (let i in obj) {
        
//         obj[i].map(d => {
//           if (util.isEmpty(objArr[d.date])) {
//             objArr[d.date] = {}
//           }
//           objArr[d.date][i] = d.rate;
//           objArr[d.date].date = d.date;
//         })
//       }
//       let resArr = []
//       for (let i in objArr) {
//         resArr.push(objArr[i])
//       }
//       return resArr;
//     }
//     let _data = filterData(data);

//     let items = [];
//     this.zhouList.map(d => {
//       items.push(d.name)
//     })
//     let lineData = {
//       items,
//       colorHash: this.zhouColors
//     };
//     this.lineObj2 = {
//       data:_data,
//       styleData: lineData,
//       a: true,
//       // b: false,
//       show: true,
//       legendStat:false,
//       stash:false,
//       stashCountrys:[]
//     };
//     console.log(this.lineObj2);
//   }
//   formatData3(data) {
//     let filterData = dt => {
//       let obj = {}
//       let arr = [];
//       let ctarr = {}
//       this.weekCountrys.map(d => {
//         ctarr[d.name] = []
//       })
//       for (let i in ctarr) {
//         let _i = i == '印度尼西亚' ? '印尼' : i;
//         obj[_i] = [];
//         dt[i].map(d => {
//           if (d.date.indexOf('0') == 0) {
//             d.date = d.date.slice(1)
//           }
//           d.date = d.date.replace('/','-')
//           d.value = d.rate;
//           if (d.date >= '3-15') {
//             obj[_i].push(d)
//           }
//         })
//         if (obj[_i].length > 6) {
//           obj[_i] = obj[_i].slice(obj[_i].length-6, obj[_i].length)
//         }
//       }

//       for (let i in obj) {
//         let _o:any = {}
//         _o.name = i;
//         _o.data = obj[i]
//         _o.color = this.countrysColor[i]
//         arr.push(_o)
//       }
//       console.log(arr)
//       return arr;
//     }
//     let _data = filterData(data);
//     this.lineObj3 = {
//       data: _data,
//       show: true,
//       lastData: {
//         date:'4-21',
//         value:99999
//       }
//     }
//   }
// }

</script>