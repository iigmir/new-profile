"use strict";

var app = new Vue({
  el: "#app",
  data: function data() {
    return {
      scroll_over_header: false,
      xhr_fail_msg: "Sorry, I can't give result due to some errors.",
      xhr_okay: false,
      repo_api: "https://api.github.com/repos/iigmir/new-profile/git/refs/heads/master",
      updated_url: "",
      update_date: "",
      updater: "",
      works_src: [{
        name: "民國西元換算器",
        link: "https://addons.mozilla.org/en-US/firefox/addon/minguoyear-convert",
        text: "把民國紀元與西元互換的小套件。"
      }, {
        name: "Angular Notes",
        link: "https://iigmir.github.io/angularjs-notes/",
        text: "學習 Angularjs 1 的一些語法筆記"
      }, {
        name: "New profile in Codepen",
        link: "https://codepen.io/iigmir/pen/MrxmgK",
        text: "Codepen 作品概覽"
      }, {
        name: "OpenStreetMap Notes",
        link: "https://iigmir.github.io/osm-notes",
        text: "介接 OpenStreetMap 的筆記"
      }, {
        name: "Takami",
        link: "https://github.com/iigmir/Takami",
        text: "抓取 LoveLive 音樂清單的機器人"
      }],
      sns_info: [{
        link: "https://developer.mozilla.org/zh-TW/profiles/iigmir",
        fa: "fa fa-firefox",
        desc: "My MDN"
      }, {
        link: "https://github.com/iigmir",
        fa: "fa fa-github",
        desc: "My Github"
      }, {
        link: "https://codepen.io/iigmir",
        fa: "fa fa-codepen",
        desc: "My Codepen"
      }, {
        link: "mailto:roc120j@gmail.com",
        fa: "fa fa-envelope-o",
        desc: "My Email"
      }]
    };
  },
  computed: {
    group_works: function group_works() {
      var _this = this;

      // Expect [{},{},{},{},{},{}] to be [[{},{},{}],[{},{},{}]]
      var new_array = [];
      var tmp_array = [];
      this.works_src.map(function (elem, index) {
        var current_index = index + 1;
        var group_number = 3;
        tmp_array.push(elem);

        if (current_index % group_number === 0 || current_index === _this.works_src.length) {
          new_array.push(tmp_array);
          tmp_array = [];
        }
      });
      return new_array;
    },
    xhr_message: function xhr_message() {
      var msg = "Sorry, I can't give result due to some errors.";

      if (this.xhr_okay === true) {
        msg = "Update in ".concat(this.update_date, " by ").concat(this.updater);
      }

      return msg;
    },
    link_binding: function link_binding() {
      var href = "#naviend";

      if (this.scroll_over_header === true) {
        href = "#navitop";
      }

      return {
        href: href,
        arrow_class: {
          "fa": true,
          "fa-2x": true,
          "fa-arrow-up": this.scroll_over_header === true,
          "fa-arrow-down": this.scroll_over_header === false
        }
      };
    }
  },
  mounted: function mounted() {
    this.request_log();
    window.addEventListener("scroll", this.scroll_arrow);
  },
  methods: {
    request_log: function request_log() {
      var _this2 = this;

      var get_repo = function get_repo(url) {
        fetch(url).then(function (repo_res) {
          return repo_res.json();
        }).then(function (repo_json) {
          return get_info(repo_json.object.url);
        });
      };

      var get_info = function get_info(url) {
        fetch(url).then(function (repo_res) {
          return repo_res.json();
        }).then(function (repo_json) {
          return _this2.ajax_render(repo_json);
        });
      };

      get_repo(this.repo_api);
    },
    ajax_render: function ajax_render(info) {
      this.xhr_okay = true;
      this.updated_url = info.html_url;
      this.updater = info.committer.name;
      this.update_date = new Date(info.committer.date).toLocaleString();
    },
    scroll_arrow: function scroll_arrow() {
      this.scroll_over_header = window.scrollY > this.$refs.header.clientHeight / 1.5;
    }
  },
  destroyed: function destroyed() {
    window.removeEventListener("scroll", this.scroll_arrow);
  }
});