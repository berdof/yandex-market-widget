
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
        page: 1,
        sortOrder: 1
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
          var $li, plugin, self;
          plugin = e.data.plugin;
          self = $(this);
          $li = self.parent();
          $li.addClass('active').siblings().removeClass('active');
          plugin.options.sortOrder = $li.index();
          plugin.eventHandlers.changePageOnClick(e);
          return false;
        },
        changePageOnClick: function(e) {
          var activePage, isFirst, isLast, pageIncrement, pageNum, plugin, self, selfId;
          plugin = e.data.plugin;
          self = $(this);
          selfId = self.attr('id');
          activePage = plugin.activePage;
          pageNum = self.html();
          pageIncrement = ~~self.data('increment');
          isLast = activePage === plugin.pagesCount;
          isFirst = activePage > 1;
          if (self.hasClass('disabled') || self.hasClass('active')) {
            return false;
          }
          if (selfId !== 'yawNextPages') {
            if (pageIncrement > 0 && !isLast) {
              ++activePage;
            } else if (pageIncrement < 0 && isFirst) {
              --activePage;
            } else if (pageIncrement === 0) {
              activePage = pageNum;
            }
            plugin.clearOpinions();
            plugin.createPage(activePage);
            plugin.activePage = activePage;
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
        return $.ajax({
          'url': "" + selfOpts.serverUrl + "/widget/get/model/?name=" + selfOpts.title + "&jsonp=?",
          'dataType': 'jsonp'
        });
      };

      Yaw.prototype.fetchMainDescr = function() {};

      Yaw.prototype.fetchPage = function(page) {
        var selfOpts, url;
        if (page == null) {
          page = 1;
        }
        selfOpts = this.options;
        url = "" + selfOpts.serverUrl + "/widget/get/model/opinions?model=" + selfOpts.modelId + "&region=" + selfOpts.region + "&page=" + page + "&sort=" + selfOpts.sortOrder + "&jsonp=?";
        console.log(url);
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
          var data;
          if (!self.paginatorCreated) {
            data = {
              ratingCount: d.ratingCount,
              ratingValue: d.ratingValue * 20
            };
            self.fillFrag('#yawHead', $('.yaw__feedback__head'), data);
          }
          if (!self.paginatorCreated) {
            self.pagesCount = d.pages;
          }
          d.opinions.forEach(function(opinion, i) {
            opinion.gradeStyled = "width:" + opinion.grade * 20 + "%";
            self.fillOpinion(opinion, index + i);
            self.createPaginator();
          });
          self.activatePage(index);
        });
      };

      Yaw.prototype.createPaginator = function() {
        var $pager, i, _i, _ref;
        $pager = '';
        if (!this.paginatorCreated) {
          for (i = _i = 0, _ref = this.pagesCount; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            $pager += "<li><a href=javascript:void(0);>" + (i + 1) + "</a></li>";
          }
          $('.yaw__feedback__pager').html($pager);
          $('.yaw__feedback__pager').find('li:first a').addClass('active');
        }
        this.paginatorCreated = true;
      };

      Yaw.prototype.activatePage = function(index) {
        var isFirst, isLast, self;
        self = this;
        isFirst = ~~self.activePage === 1;
        isLast = ~~self.activePage === self.pagesCount;
        $('.yaw__feedback__pager').find('li').eq(index - 1).find('a').addClass('active').closest('li').siblings().find('a').removeClass('active');
        $('.yaw__feedback__pager_simple a').removeClass('disabled');
        if (isFirst) {
          $('.yaw__feedback__pager_simple li').eq(1).find('a').addClass('disabled');
        }
        if (isLast) {
          $('.yaw__feedback__pager_simple li').eq(2).find('a').addClass('disabled');
        }
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
