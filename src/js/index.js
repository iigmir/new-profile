var sns_link = new Vue
({
    el:"#nav_sns",
    data:
    {
        infos:
        [{
            link:"https://iismmx-rails-blog.herokuapp.com",
            fa:"fa fa-book",desc:"My blog"
        },{
            link:"https://developer.mozilla.org/zh-TW/profiles/iigmir",
            fa:"fa fa-firefox",desc:"My MDN"
        },{
            link:"https://github.com/iigmir",
            fa:"fa fa-github",desc:"My Github"
        },{
            link:"https://codepen.io/iigmir",
            fa:"fa fa-codepen",desc:"My Codepen"
        },{
            link:"mailto:roc120j@gmail.com",
            fa:"fa fa-envelope-o",desc:"My Email"
        }]
    }
});

var my_works = new Vue
({
    el: '#myworks_app',
    data:
    {
        works_src :
        [
            {
                name:"露比的銳思",
                link:"https://iismmx-rails-blog.herokuapp.com",
                text:"我用Ruby on Rails 架設的部落格。主要撰寫一些網路開發的文章。"
            },
            {
                name:"民國西元換算器",
                link:"https://addons.mozilla.org/en-US/firefox/addon/minguoyear-convert",
                text:"把民國紀元與西元互換的小套件。"
            },{
                name:"Angular Notes",
                link:"https://iigmir.github.io/angularjs-notes/",
                text:"學習 Angularjs 1 的一些語法筆記"
            },{
                name:"New profile in Codepen",
                link:"https://codepen.io/iigmir/pen/MrxmgK",
                text:"Codepen 作品概覽"
            },{
                name:"OpenStreetMap Notes",
                link:"https://iigmir.github.io/osm-notes",
                text:"介接 OpenStreetMap 的筆記"
            },{
                name:"voteapp",
                link:"https://github.com/iigmir/voteapp",
                text:"某次寫的投票程式"
            },{
                name:"Takami",
                link:"https://github.com/iigmir/Takami",
                text:"抓取 LoveLive 音樂清單的機器人"
            },{
                name:"novelist",
                link:"https://github.com/iigmir/novelist",
                text:"可以讓人寫小說的小作品"
            },{
                name:"松浦",
                link:"https://github.com/iigmir/matsuura",
                text:"自己撰寫的錯誤追蹤系統"
            }
        ]
    },
    computed:
    {
        group_works: function()
        {
            var grouped_dst = [];
            var grouped_unit = 3;
            for(var i=0;i<this.works_src.length; i+=grouped_unit )
            {
                var i_tmp_array = [];
                for (var j=0; j<grouped_unit ;j++)
                {
                    i_tmp_array.push( this.works_src[i+j] );
                }
                grouped_dst.push( i_tmp_array );
            }
            return grouped_dst;
        }
    }
});

var last_updated = new Vue
({
    el:"footer",
    data:
    {
        xhr_fail_msg:"Sorry, I can't give result due to some errors.",
        xhr_okay:false,
        repo_api:"https://api.github.com/repos/iigmir/new-profile/git/refs/heads/master",
        updated_url:"",
        update_date:"",
        updater:"",
    },
    mounted:function()
    {
        var vdm = this;
        function get_last_commit()
        {
            var glc_xhr = new XMLHttpRequest();
            glc_xhr.onreadystatechange = function()
            {
                if ( glc_xhr.readyState === 4 )
                {
                    var glc_res = glc_xhr.response;
                    get_submit_info( glc_res.object.url );
                }
            };
            glc_xhr.open('GET', vdm.repo_api , true);
            glc_xhr.responseType = "json";
            glc_xhr.send('');
        }

        function get_submit_info( gsi_api )
        {
            var gsi_xhr = new XMLHttpRequest();
            gsi_xhr.onreadystatechange = function()
            {
                if ( gsi_xhr.readyState === 4 )
                {
                    var gsi_res = gsi_xhr.response;
                    vdm.xhr_okay = true;
                    vdm.updated_url = gsi_res.html_url;
                    vdm.updater = gsi_res.committer.name;
                    vdm.update_date = gsi_res.committer.date.replace(/T/g," ").replace(/Z/g,"(GMT)");
                }
            };
            gsi_xhr.open('GET', gsi_api , true);
            gsi_xhr.responseType = "json";
            gsi_xhr.send('');
        }
        get_last_commit();
    }
});

$(document).scroll(function()
{
    var scroll_over_half_height = ( $("header").height() / 1.5) < $(document).scrollTop();
    var navigate_target_positison = scroll_over_half_height ? "#navitop" : "#naviend";
    $(".nav-arrow a").attr("href", navigate_target_positison );
    if( scroll_over_half_height )
    {   // I want to toggleClass, too. However there's bug when scroll via toggleClass.
        $(".nav-arrow a i").removeClass("fa-arrow-down").addClass("fa-arrow-up");
    }
    else
    {
        $(".nav-arrow a i").addClass("fa-arrow-down").removeClass("fa-arrow-up");
    }
});