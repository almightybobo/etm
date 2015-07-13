window.fbAsyncInit = function() {
  FB.init({
    appId : '127418697592555',
    xfbml : true,
    version : 'v2.3'
  });
};
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
FB.api(
  /1570619043205429/feed,
  function (response) {
    if (response && !response.error) {
          /* handle the result */
    } 
  }
);
