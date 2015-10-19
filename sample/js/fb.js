/**data by node.js***** http://merry.ee.ncku.edu.tw/~bobo258/etm/sample/main2.html **/
var request = require("request");
var fs = require("fs");
/*get page id from googlespreadsheet*/
var Spreadsheet = require('edit-google-spreadsheet');
Spreadsheet.load({
  debug: true,
  spreadsheetId: '1B2iUgtb2vddSHL3crwebvjkSdCSRcGhlfcTtlyTD20M',
  worksheetId: 'oc804zs',
  oauth : {
    email: '265646148571-avgq2k1r3q2s5kn9668ib54b47is1e6a@developer.gserviceaccount.com',
    keyFile: '../your-key-file.pem'
    }
}, function sheetReady(err, spreadsheet) {
    if (err) {
      throw err;
    }
    spreadsheet.receive(function(err, pageid, info) {
      if (err) {
        throw err;
      }
      /*get json from facebook graph api*/
      var limit = 20;
      var access_token = "CAABz4vo1LusBALRG79Vr7sC5yCeJaWjpSQc4uw3Opwyqxfc4475jT0SeypwFoXPTEaAbg6QF1HY9sv164ZByLnQrAjb5G9ZBFr3NZBNo2YimaB9OZAMseD1iRYk65VWkK6gKT9LaC5YlJ0t4dqus5NFrLaiTEVCcZAwAdDUZAcTWObPMx5eDU8w9yJVM25u7IZD";
      var urls = [];
      for(i = 2; i <= Object.keys(pageid).length; i++)
        urls[i-2] = "https://graph.facebook.com/"+pageid[i][1]+"/feed?fields=message,picture&limit="+limit+"&access_token="+access_token;
    // console.log(pageid);
    // console.log(urls);  
      urls.forEach(post_json);
  });
});
var update = {};
/*get json from each url*/
function post_json(element,index,array){
  request({
    url: array[index],
    json: true
    }, function (error, response, obj) {
      if (!error && response.statusCode === 200) {
        var max = 20;
        var x = max* (index+1) + 1;
        for(i = 0; i < max ; i++,x--){
          id_temp = obj.data[i].id.split('_');
          /*update是存fb那邊讀出來的資料*/
          update[x] = {1: id_temp[0],2: id_temp[1],3: obj.data[i].message,4: obj.data[i].picture,5: obj.data[i].created_time};
        }
        query_db(index,max,update);
      }
     // console.log(update[2]);
  })
}
/*append spreadsheet*/   /*希望可以只update新的到spreadsheet的最下面，但不是知道要怎麼用*/
function append_db(append_data,append_row) {
  Spreadsheet.load({
    debug:true,
    spreadsheetId: '1B2iUgtb2vddSHL3crwebvjkSdCSRcGhlfcTtlyTD20M',
    worksheetId: 'oy3roxi',
    oauth : {
      email: '265646148571-avgq2k1r3q2s5kn9668ib54b47is1e6a@developer.gserviceaccount.com',
      keyFile: '../your-key-file.pem'
    },
  }, function sheetReady(err, spreadsheet) {
    if (err) throw err;
    var update = {};
    append_row = append_row.toString();
    console.log(append_row);
    update[append_row] = append_data;
  
    //console.log(update);
    spreadsheet.add(update);
    spreadsheet.send(function(err){
      if (err) throw err;
    });
  });
}
/*get latest data in spreadsheet*/    /*這裡是用來判斷fb讀出來的資料哪些是新的(已經可以準確判斷)，只想update新的*/
function query_db(index,max,update) {
  Spreadsheet.load({
    debug:true,
    spreadsheetId: '1B2iUgtb2vddSHL3crwebvjkSdCSRcGhlfcTtlyTD20M',
    worksheetId: 'oy3roxi',
    oauth : {
      email: '265646148571-avgq2k1r3q2s5kn9668ib54b47is1e6a@developer.gserviceaccount.com',
      keyFile: '../your-key-file.pem'
    },
  }, function sheetReady(err, spreadsheet) {
    if (err) throw err;
    spreadsheet.receive(function(err, obj, info) {
      if(err) throw err;
      for(var index = 0; index < Object.keys(update).length/max ;index ++){
        var temp = {};
        var count = Object.keys(obj).length;
        console.log(Object.keys(update).length/max);
        for(count ; count ; count--){
          if(!obj[count]) continue;
          if(obj[count]['1'] == update[max*(index+1) + 1]['1']){
            for(var i = max*(index+1)+1; i > max*index+1 ; i--){
              if(update[i]['2'] == obj[count]['2'] && i != max*(index+1)+1){
                for(var j = i + 1; j <= max*(index+1)+1 ; j++) append_db(update[j],Object.keys(obj).length + j - i);
                break;
              }
            }
            break;
          }
          else if(obj[count]['1'] != update[max*(index+1) + 1]['1'] && count == 1){
            for(var j = max * index + 2 ; j <= max*(index+1) + 1; j++)  append_db(update[j],Object.keys(obj).length + j - max*index - 1);
            break;
          }   
        }
      }
    });
  });
}
