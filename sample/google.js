<script type="text/javascript">
function test(json) {
  var a = json.feed.entry.length;
  for (var i = 0; i < a; i++) {
    var b = json.feed.entry[i].gsx$testing.$t;
    document.write(b);
  }
}
</script>
<script type='text/javascript' src='https://spreadsheets.google.com/feeds/list/0AoFreovJarCadDI5YTRqOENWT3ZqdjJrMkpOVWkxSVE/od6/public/values?alt=json-in-script&callback=test'></script>