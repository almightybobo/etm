$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '127418697592555',
      version: 'v2.3' // or v2.0, v2.1, v2.0
    });     
  });
});

$.getJSON('https://graph.facebook.com/289915787788384/feed?fields=message,picture&limit=30&access_token=CAABz4vo1LusBALGIzLQxO96m0SN5mJwAOPQViyqCV0kZB8kbecpTfBtlZCvERQPsE0fLR1JbDfnizZAjZC6J2ZBONujALvImymbG7bUDP75tZARXNf9JrcInbhbKGc7Ptp67fgR6Hx1kGMnByhpANfFqcP4u9ZAulYQMN2EDPsG92puVNrNjJz5oloUSsUirWkZD',function(data){
  console.log(data);
  $('#images').html(data.contents);
});
