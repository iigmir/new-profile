var sns_link=new Vue({el:"#nav_sns",data:{infos:[{link:"https://iismmx-rails-blog.herokuapp.com",fa:"fa fa-book",desc:"My blog"},{link:"https://developer.mozilla.org/zh-TW/profiles/iigmir",fa:"fa fa-firefox",desc:"My MDN"},{link:"https://github.com/iigmir",fa:"fa fa-github",desc:"My Github"},{link:"https://codepen.io/iigmir",fa:"fa fa-codepen",desc:"My Codepen"},{link:"mailto:roc120j@gmail.com",fa:"fa fa-envelope-o",desc:"My Email"}]}}),my_works=new Vue({el:"#myworks_app",data:{works_src:[{name:"露比的銳思",link:"https://iismmx-rails-blog.herokuapp.com",text:"我用Ruby on Rails 架設的部落格。主要撰寫一些網路開發的文章。"},{name:"民國西元換算器",link:"https://addons.mozilla.org/en-US/firefox/addon/minguoyear-convert",text:"把民國紀元與西元互換的小套件。"},{name:"Angular Notes",link:"https://iigmir.github.io/angularjs-notes/",text:"學習 Angularjs 1 的一些語法筆記"},{name:"New profile in Codepen",link:"https://codepen.io/iigmir/pen/MrxmgK",text:"Codepen 作品概覽"},{name:"OpenStreetMap Notes",link:"https://iigmir.github.io/osm-notes",text:"介接 OpenStreetMap 的筆記"},{name:"Takami",link:"https://github.com/iigmir/Takami",text:"抓取 LoveLive 音樂清單的機器人"},{name:"voteapp",link:"https://github.com/iigmir/voteapp",text:"某次寫的投票程式"},{name:"novelist",link:"https://github.com/iigmir/novelist",text:"可以讓人寫小說的小作品"},{}]},computed:{group_works:function(){for(var e=[],t=0;t<this.works_src.length;t+=3){for(var a=[],o=0;o<3;o++)a.push(this.works_src[t+o]);e.push(a)}return e}}}),last_updated=new Vue({el:"footer",data:{xhr_fail_msg:"Sorry, I can't give result due to some errors.",xhr_okay:!1,repo_api:"https://api.github.com/repos/iigmir/new-profile/git/refs/heads/master",updated_url:"",update_date:"",updater:""},mounted:function(){function e(e){var a=new XMLHttpRequest;a.onreadystatechange=function(){if(4===a.readyState){var e=a.response;t.xhr_okay=!0,t.updated_url=e.html_url,t.updater=e.committer.name,t.update_date=e.committer.date.replace(/T/g," ").replace(/Z/g,"(GMT)")}},a.open("GET",e,!0),a.responseType="json",a.send("")}var t=this;!function(){var a=new XMLHttpRequest;a.onreadystatechange=function(){4===a.readyState&&e(a.response.object.url)},a.open("GET",t.repo_api,!0),a.responseType="json",a.send("")}()}});$(document).scroll(function(){var e=$("header").height()/1.5<$(document).scrollTop(),t=e?"#navitop":"#naviend";$(".nav-arrow a").attr("href",t),e?$(".nav-arrow a i").removeClass("fa-arrow-down").addClass("fa-arrow-up"):$(".nav-arrow a i").addClass("fa-arrow-down").removeClass("fa-arrow-up")});