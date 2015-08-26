# Easy to maintain
#About use google spreadsheet to be the database
https://github.com/almightybobo/etm/blob/master/sample/spreadsheet.js
ref:http://www.wfublog.com/2013/03/google-spreadsheet-as-micro-database-update-2.html

#About graph api
1.create your app(there is a button called "Add a New App")
https://developers.facebook.com/apps/

2.choose the dashborard that you want
(I choose the website.If you choose this,you have to give the site URL)

3.use graph api explorer and choose your application(at the right)
then you will get your access token at the top
https://developers.facebook.com/tools/explorer/145634995501895/

4.http://sweeteason.pixnet.net/blog/post/40753405
I ask the author who write this article,
and he told me the way to get the posts on the fan pages.
https://graph.facebook.com/"fan page's id"/feed?&access_token="your access token"

(how to get fan page id:https://lookup-id.com/)

5.Then, you can get json from the url
for example,I want to get messages and picture from fan pages
my url
->https://graph.facebook.com/"fan page's id"/feed?fields=message,picture&limit=250&access_token="my access token"

you can change the url to get other data that you want.

6.fb graph api can only get 250 posts once a time
if you want to get more, you should find the "next"&"previous" at the button.
they both save an url,"next" will lead you to the next 250 data,and "previous" will lead you to the previous 250 data

7.access token extend
https://developers.facebook.com/tools/debug/access_token/
if you don't extend your access token,it will die after 10 minutes.
if you extend it,it will exist in two months.
