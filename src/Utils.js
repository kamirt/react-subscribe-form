
let utils;
function Utils() {

  this.__proto__.arrSearch = function(list, val){
    let res = [];
    if (val && val.length > 1){
      let firstLetter = val.substring(0,2).toLowerCase();
      function toFilter(el, ind, arr){
        return el.toLowerCase().indexOf(val.substring(0,2).toLowerCase()) != -1;
      }
      res = list.filter(toFilter);
    }
    return res;
  }
  
}
utils = utils ? utils : new Utils();
export default utils;
