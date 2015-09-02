var html ="";
$.getJSON("https://spreadsheets.google.com/feeds/list/1B2iUgtb2vddSHL3crwebvjkSdCSRcGhlfcTtlyTD20M/1/public/values?alt=json-in-script&callback=?", function(json){
  var e = json.feed.entry,
  length = e.length,
  entry, i, grid;
  for (i = 0; i < length; i++) {
    entry = e[i];
    x=i%3;
    //card = "<div class='card' id='pic"+ x +"'>";
    pic = "<div class='grid-item'><img src='https://drive.google.com/uc?id="+ entry.gsx$pic.$t + "'></div>";
    //content = "<div class='card-content'><span class='card-title activator grey-text text-darken-4'>" + entry.gsx$topic.$t +"</span><a href='"+entry.gsx$href.$t+"'>&nbsp;&nbsp;&nbsp;  link</a></div>";
    //reveal = "<div class='card-reveal'><span class='card-title grey-text text-darken-4'>" + entry.gsx$topic.$t +"<i class='material-icons right'>close</i></span><p>" + entry.gsx$description.$t +"</p></div></div>"; 
    //entry.gsx$topic.$t
    //html += topic + "<br/>"+description+ "<br/>"+pic+ "<br/>";
    ///////html += pic;
    // html += card + pic + content + reveal;
  } 
  sizer = "<div class='grid-sizer'></div>";
  html += sizer;
});
/*$(document).ready( function() {
   var $grid = $('.grid').masonry({
     itemSelector: '.grid-item',
     percentPosition: true,
     columnWidth: '.grid-sizer'
     });
     $grid.imagesLoaded().progress( function() {
       $grid.masonry();
     });  
   });*/
  ///////////////////////get html input/////////////////////////////////////////
  $("input").watchTyping({
    start:function(event, $elem){},
    stop:function(event, $elem){  
      var key = document.getElementById("search").value;
      String.prototype.toUnicode = function(){
        var result = "";
        for(var i = 0; i < this.length; i++){
          result += "\\u" + ("000" + this[i].charCodeAt(0).toString(16)).substr(-4);
        }
        return result;
      };
      key = key.toUnicode();
      if(key!=""){
        /////////////////////////get fan page's posts//////////////////////////////////
        var group_id="289915787788384";
        var limit="10";
        var access_token="CAABz4vo1LusBALGIzLQxO96m0SN5mJwAOPQViyqCV0kZB8kbecpTfBtlZCvERQPsE0fLR1JbDfnizZAjZC6J2ZBONujALvImymbG7bUDP75tZARXNf9JrcInbhbKGc7Ptp67fgR6Hx1kGMnByhpANfFqcP4u9ZAulYQMN2EDPsG92puVNrNjJz5oloUSsUirWkZD";
        $.getJSON("https://graph.facebook.com/"+group_id+"/feed?fields=message,picture&limit="+limit+"&access_token="+access_token,function(json){
          var i;
          for(i = 0; i < 10 ; i++)
          {
            if(json.data[i].message.match(key)!=null)
            {
              //console.log(json.data[i].message);
              pic = "<div class='grid-item'><img src='"+ json.data[i].picture +"'></div>";
              content = "<p>"+ json.data[i].message +"</p>";
              html += pic + content;
            }
          }
        });

        var group_id2="1438856416404350";
        $.getJSON("https://graph.facebook.com/"+group_id2+"/feed?fields=message,picture&limit="+limit+"&access_token="+access_token,function(json){
          var i;
          for(i = 0; i < 10 ; i++)
          {
            if(json.data[i].message.match(key)!=null)
            {
              pic = "<div class='grid-item'><img src='"+ json.data[i].picture +"'></div>";
              content = "<p>"+ json.data[i].message +"</p>";
              html += pic + content;
            }
          }
          $(".grid").html(html);
        });
      }
    },delay:500
  });
