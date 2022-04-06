(function (W) {
  //格式化 search
  function getQuery (key) {
    var q = window.location.search.substring(1)
    var arr = q.split('&')
    var o = {}
    arr.forEach(item => {
      var a = item.split('=')
      o[a[0]] = a[1]
    })
    return key ? decodeURIComponent(o[key]) : o
  }

  //
  function getSearchQuery(search, key){
    var q = search.substring(1)
    var arr = q.split('&')
    var o = {}
    arr.forEach(item => {
      var a = item.split('=')
      o[a[0]] = a[1]
    })
    return key ? decodeURIComponent(o[key]) : o
  }
  

  function IsPC () {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
  }

  function leadingDigit (num) {
    return ('0' + num).substr(-2)
  }

  function getRepeatArr (arr) {
    let nArr = []
    arr.forEach((l) => {
      let index = -1
      let alreadyExists = nArr.some((n, j) => {
        if (l.namespace == n.namespace && l.key == n.key) {
          index = j
          return true
        }
      })
      if (!alreadyExists) {
        nArr.push({
          namespace: l.namespace,
          key: l.key,
          data: [l]
        })
      } else {
        nArr[index].data.push(l)
      }
    })
    return nArr
  }

  function filterEmptyParams (params) {
    Object.keys(params).forEach(item => {
      if (params[item] == '') {
        delete params[item]
      }
    })
    return params
  }

  function clientTimeZone () {
    //获得时区偏移量
    var timeOffset = new Date().getTimezoneOffset();
    //获得时区小时偏移基数
    var hour = parseInt(timeOffset / 60);
    //获得时区分钟偏移基数
    var munite = timeOffset % 60;
    var prefix = "-";
    if (hour < 0 || munite < 0) {
      prefix = "+";
      hour = -hour;
      if (munite < 0) {
        munite = -munite;
      }
    }
    hour += " ";
    munite += " ";
    if (hour.length == 2) {
      hour = "0" + hour;
    }
    if (munite.length == 2) {
      munite = "0" + munite;
    }

    return {
      prefix,
      hour,
      munite
    }
  }

  function getExactTime (time) {
    var date = new Date(time);
    var year = date.getFullYear() + '-';
    var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var dates = date.getDate() + ' ';
    var hour = (date.getHours().toString().length>1?date.getHours():`0${date.getHours()}`) + ':';
    var min = (date.getMinutes().toString().length>1?date.getMinutes():`0${date.getMinutes()}`) + ':';
    var second = date.getSeconds();
    second = second.toString().length>1 ? second : `0${second}`;
    return year + month + dates + hour + min + second;
  }

  function paramsTostring(apiURL, params){
    let s = ''
    Object.keys(params).forEach(key => {
      s += `&${key}=${params[key]}`
    })

    return `${apiURL}?${s.substr(1)}`
  }

  W.publicTools = {
    filterEmptyParams,
    getQuery,
    getSearchQuery,
    IsPC,
    leadingDigit,
    getRepeatArr,
    clientTimeZone,
    getExactTime
  }
})(window)