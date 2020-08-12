export default class LineDataParser {
  constructor(_data) {
    console.log(_data)
    let data = _data.sort((a, b) => {
      const strA = a.date;
      const strB = b.date;
      return strA < strB ? 1 : -1;
    })
    data = data.slice().sort(function(a, b) {
      return a.date > b.date ? 1:-1;
    })
    return data;
  }
}