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
                name:"IISMMX's Rails Blog",
                link:"https://iismmx-rails-blog.herokuapp.com",
                text:"我用Ruby on Rails 架設的部落格。主要撰寫一些關於Ruby on Rails相關問題的文章。"
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
                name:"維基百科搜尋器",
                link:"https://codepen.io/iigmir/pen/dGBORB",
                text:"串接維基百科的 API"
            },{
                name:"計算機",
                link:"https://codepen.io/iigmir/pen/dGzWKL",
                text:"顧名思義，點選數字與計算符號後，可以開始做計算"
            },{
                name:"OpenStreetMap Notes",
                link:"https://iigmir.github.io/osm-notes",
                text:"介接 OpenStreetMap 的筆記"
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
            }
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
                    // console.log( gsi_res );
                    vdm.xhr_okay = true;
                    vdm.updated_url = gsi_res.html_url;
                    vdm.updater = gsi_res.committer.name;
                    vdm.update_date = gsi_res.committer.date.replace(/T/g," ").replace(/Z/g,"(GMT)");
                    // console.log( vdm.updater );
                }
            }
            gsi_xhr.open('GET', gsi_api , true);
            gsi_xhr.responseType = "json";
            gsi_xhr.send('');
        }
        get_last_commit();
    }
});
