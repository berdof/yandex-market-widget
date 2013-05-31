
/*
 **
* jQuery Yandex fedbacks Plugin for socialmart.ru
*
* Author: Alexander Berdyshev
*
* Version: 1.0
*
 **
*/


(function() {
  var __slice = [].slice;

  (function($, window) {
    var Yaw;
    return Yaw = (function() {

      Yaw.prototype.paginatorCreated = false;

      Yaw.prototype.pagesCount = 1;

      Yaw.prototype.activePage = 1;

      Yaw.prototype.$el = null;

      Yaw.prototype.defaults = {
        title: '',
        serverUrl: 'http://socialmart.ru',
        searchMode: 'splitbylat',
        region: 213,
        page: 1
      };

      Yaw.prototype.log = function(str) {
        console.log(str);
      };

      function Yaw(el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$el = $(el);
        this.init();
        return;
      }

      Yaw.prototype.eventHandlers = {
        sorterOnClick: function(e) {
          return false;
        },
        changePageOnClick: function(e) {
          var activePage, pageIncrement, pageNum, plugin, self, selfId;
          plugin = e.data.plugin;
          self = $(this);
          selfId = self.attr('id');
          activePage = plugin.activePage;
          pageNum = self.html();
          pageIncrement = ~~self.data('increment');
          if (selfId !== 'yawNextPages') {
            if ((pageIncrement !== 0) && activePage >= 0 && activePage <= plugin.pagesCount) {
              activePage = activePage + pageIncrement;
            } else {
              activePage = pageNum;
              self.addClass('active').closest('li').siblings().find('a').removeClass('active');
            }
            plugin.clearOpinions();
            plugin.createPage(activePage);
            plugin.activePage = activePage;
            console.log(pageIncrement);
          } else {
            console.log("next pages portion");
          }
          $('#pageIndex').html(plugin.activePage + ' of ' + plugin.pagesCount);
          e.preventDefault();
          return false;
        }
      };

      Yaw.prototype.attachEvents = function() {
        this.$el.find('.yaw__feedback__sort a').on('click', {
          plugin: this
        }, this.eventHandlers.sorterOnClick);
        this.$el.find('.yaw__feedback__pager').on('click', 'a', {
          plugin: this
        }, this.eventHandlers.changePageOnClick);
        this.$el.find('.yaw__feedback__pager_simple').on('click', 'a', {
          plugin: this
        }, this.eventHandlers.changePageOnClick);
      };

      Yaw.prototype.fetchId = function() {
        var selfOpts;
        selfOpts = this.options;
        console.log("" + selfOpts.serverUrl + "/widget/get/model/?name=" + selfOpts.title + "&jsonp=?");
        return $.ajax({
          'url': "" + selfOpts.serverUrl + "/widget/get/model/?name=" + selfOpts.title + "&jsonp=?",
          'dataType': 'jsonp'
        });
      };

      Yaw.prototype.fetchMainDescr = function() {};

      Yaw.prototype.fetchPage = function(page) {
        var selfOpts, url;
        selfOpts = this.options;
        url = "" + selfOpts.serverUrl + "/widget/get/model/opinions?model=" + selfOpts.modelId + "&region=" + selfOpts.region + "&page=" + page + "&jsonp=?";
        return $.ajax({
          'url': url,
          'dataType': 'jsonp'
        });
      };

      Yaw.prototype.fillFrag = function(templateId, $frag, data) {
        var html, source, template;
        source = $(templateId).html();
        template = Handlebars.compile(source);
        html = template(data);
        $frag.html(html);
      };

      Yaw.prototype.createFeedbackFrag = function(id) {
        return $('<div></div>', {
          'class': 'yawFeedbackFrag',
          'id': "yawFeedbackFrag" + id
        });
      };

      Yaw.prototype.clearOpinions = function() {
        $('#yawFeedbackFrag').html('');
      };

      Yaw.prototype.fillOpinion = function(data, id) {
        var frag;
        frag = this.createFeedbackFrag(id);
        $('.yawFeedbackFrag').append(frag);
        this.fillFrag('#yawFeedback', frag, data);
      };

      Yaw.prototype.createPage = function(index) {
        var self;
        self = this;
        self.fetchPage(index).done(function(d) {
          if (!self.paginatorCreated) {
            self.pagesCount = d.pages;
          }
          return d.opinions.forEach(function(opinion, i) {
            opinion.gradeStyled = "width:" + opinion.grade * 20 + "%";
            self.fillOpinion(opinion, index + i);
            self.createPaginator();
          });
        });
      };

      Yaw.prototype.createPaginator = function() {
        var $pager, i, _i, _ref;
        $pager = '';
        if (!this.paginatorCreated) {
          for (i = _i = 0, _ref = this.pagesCount; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            $pager += "<li><a href=javascript:void(0);>" + (i + 1) + "</a></li>";
          }
          $pager += "<li ><a id='yawNextPages' href=javascript:void(0);>...</a></li>";
          $('.yaw__feedback__pager').html($pager);
          $('.yaw__feedback__pager').find('li:first a').addClass('active');
        }
        this.paginatorCreated = true;
      };

      Yaw.prototype.activatePage = function(index) {
        $('.yaw__feedback__pager').find('a').eq(index).addClass('active').parent().find('a').removeClass('active');
      };

      Yaw.prototype.init = function() {
        var self;
        self = this;
        self.attachEvents();
        self.fetchId().done(function(d) {
          var opinionsIter;
          opinionsIter = 0;
          self.options.modelId = d.model_id;
          self.options.modelId = 8454852;
          self.createPage(1);
          self.fetchMainDescr();
        });
      };

      $.fn.extend({
        yaw: function() {
          var args, option;
          option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return this.each(function() {
            var $this, data;
            $this = $(this);
            data = $this.data('yaw');
            if (!data) {
              $this.data('yaw', (data = new Yaw(this, option)));
            }
            if (typeof option === 'string') {
              return data[option].apply(data, args);
            }
          });
        }
      });

      return Yaw;

    })();
  })(window.jQuery, window);

}).call(this);
