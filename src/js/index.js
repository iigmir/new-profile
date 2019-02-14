const app  = new Vue
({
    el: "#app",
    data()
    {
        return {
            scroll_over_header: false,
            xhr_fail_msg:"Sorry, I can't give result due to some errors.",
            xhr_okay:false,
            repo_api:"https://api.github.com/repos/iigmir/new-profile/git/refs/heads/master",
            updated_url:"",
            update_date:"",
            updater:"",
            works_src :
            [{
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
                name:"Takami",
                link:"https://github.com/iigmir/Takami",
                text:"抓取 LoveLive 音樂清單的機器人"
            }],
            sns_info:
            [{
                link:"https://developer.mozilla.org/zh-TW/profiles/iigmir",
                fa:"fa fa-firefox",
                desc:"My MDN"
            },{
                link:"https://github.com/iigmir",
                fa:"fa fa-github",
                desc:"My Github"
            },{
                link:"https://codepen.io/iigmir",
                fa:"fa fa-codepen",
                desc:"My Codepen"
            },{
                link:"mailto:roc120j@gmail.com",
                fa:"fa fa-envelope-o",
                desc:"My Email"
            }]
        };
    },
    computed:
    {
        group_works()
        {   // Expect [{},{},{},{},{},{}] to be [[{},{},{}],[{},{},{}]]
            let new_array = [];
            let tmp_array = [];
            this.works_src.map( (elem, index) =>
            {
                let current_index = index + 1;
                let group_number = 3;
                tmp_array.push(elem);
                if (
                    current_index % group_number === 0 ||
                    current_index === this.works_src.length
                )
                {
                    new_array.push(tmp_array);
                    tmp_array = [];
                }
            });
            return new_array;
        },
        xhr_message()
        {
            let msg = "Sorry, I can't give result due to some errors.";
            if( this.xhr_okay === true )
            {
                msg = `Update in ${ this.update_date } by ${ this.updater }`;
            }
            return msg;
        },
        link_binding()
        {
            let href = "#naviend";
            if( this.scroll_over_header === true )
            {
                href = "#navitop";
            }
            return {
                href,
                arrow_class: {
                    "fa": true,
                    "fa-2x": true,
                    "fa-arrow-up": this.scroll_over_header === true,
                    "fa-arrow-down": this.scroll_over_header === false
                }
            };
        }
    },
    mounted()
    {
        this.request_log();
        window.addEventListener("scroll",this.scroll_arrow);
    },
    methods:
    {
        request_log()
        {
            let get_repo = ( url ) =>
            {
                fetch( url )
                .then( repo_res => repo_res.json() )
                .then( repo_json => get_info(repo_json.object.url) );
            };
            let get_info = (url) =>
            {
                fetch( url )
                .then( repo_res => repo_res.json() )
                .then( repo_json => this.ajax_render(repo_json) );
            };
            get_repo( this.repo_api );
        },
        ajax_render(info)
        {
            this.xhr_okay = true;
            this.updated_url = info.html_url;
            this.updater = info.committer.name;
            this.update_date = new Date(info.committer.date).toLocaleString();
        },
        scroll_arrow()
        {
            this.scroll_over_header = window.scrollY > this.$refs.header.clientHeight / 1.5;
        }
    },
    destroyed ()
    {
        window.removeEventListener("scroll",this.scroll_arrow);
    }
});