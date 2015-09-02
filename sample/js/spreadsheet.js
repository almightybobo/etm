	$.getJSON("https://spreadsheets.google.com/feeds/list/1B2iUgtb2vddSHL3crwebvjkSdCSRcGhlfcTtlyTD20M/1/public/values?alt=json-in-script&callback=?", function(json){
	var e = json.feed.entry,
	length = e.length,
	html = "",
	entry, i, test;
	for (i = 0; i < length; i++) {
	  entry = e[i];
    x=i%3;
    if(entry.gsx$classify.$t=='speech'){
      card = "<div class='card' id='pic"+ x +"'>";
      pic = "<div class='card-image waves-effect waves-block waves-light'><img class='activator' src='https://drive.google.com/uc?id="+ entry.gsx$pic.$t + "'></div>";
      content = "<div class='card-content'><span class='card-title activator grey-text text-darken-4'>" + entry.gsx$topic.$t +"</span><a href='"+entry.gsx$href.$t+"'>&nbsp;&nbsp;&nbsp;  link</a></div>";
      reveal = "<div class='card-reveal'><span class='card-title grey-text text-darken-4'>" + entry.gsx$topic.$t +"<i class='material-icons right'>close</i></span><p>" + entry.gsx$description.$t +"</p></div></div>"; 
   
    //entry.gsx$topic.$t
    //html += topic + "<br/>"+description+ "<br/>"+pic+ "<br/>";
      html += card + pic + content + reveal;
    } 
  } 
	$("#test").html(html);
	});

