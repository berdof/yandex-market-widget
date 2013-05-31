
/*
 **
* jQuery Plugin SocialMart
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

      Yaw.prototype.$el = null;

      Yaw.prototype.defaults = {
        title: '',
        serverUrl: 'http://dev2.socialmart.ru',
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
      }

      Yaw.prototype.eventHandlers = {
        menuItemOnClick: function(e) {
          var $li, index;
          $li = e.parent();
          index = $li.index();
          $li.addClass('active').siblings('li').removeClass('active');
          return index;
        },
        sorterOnClick: function(e) {
          var index;
          index = e.data.plugin.eventHandlers.menuItemOnClick($(this));
          return false;
        }
      };

      Yaw.prototype.attachEvents = function() {
        this.$el.find('.yaw__feedback__sort a').on('click', {
          plugin: this
        }, this.eventHandlers.sorterOnClick);
      };

      Yaw.prototype.fetchId = function() {
        var selfOpts;
        selfOpts = this.options;
        return $.ajax({
          'url': "" + selfOpts.serverUrl + "/widget/get/model/?name=" + selfOpts.title + "&jsonp=?",
          'dataType': 'jsonp'
        });
      };

      Yaw.prototype.fetchOpinions = function(page) {
        var selfOpts;
        selfOpts = this.options;
        this.log("" + selfOpts.serverUrl + "/widget/get/model/opinions/?model=" + selfOpts.modelId + "&region=" + selfOpts.region + "&page=" + page + "&jsonp=?");
        return $.ajax({
          'url': "" + selfOpts.serverUrl + "/widget/get/model/opinions/?model=" + selfOpts.modelId + "&region=" + selfOpts.region + "&page=" + page + "&jsonp=?",
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

      Yaw.prototype.fillOpinion = function(data, id) {
        var frag;
        frag = this.createFeedbackFrag(id);
        this.log(frag);
        $('.yawFeedbackFrag:last').after(frag);
        this.fillFrag('#yawFeedback', frag, data);
      };

      Yaw.prototype.init = function() {
        var self;
        self = this;
        self.attachEvents();
        self.fetchId().done(function(d) {
          self.options.modelId = d.model_id;
          self.options.modelId = 8454852;
          self.fetchOpinions(self.options.page++).done(function(d) {
            var iter, opinion, _i;
            for (iter = _i = 0; _i < 14; iter = ++_i) {
              opinion = d.opinions[iter];
              opinion.gradeStyled = "width:" + opinion.grade * 20 + "%";
              console.log(opinion);
              self.fillOpinion(opinion, self.options.page + iter);
            }
          });
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
