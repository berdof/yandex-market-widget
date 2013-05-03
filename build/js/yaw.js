(function() {
  var __slice = [].slice;

  (function($, window) {
    var Yaw;
    return Yaw = (function() {

      Yaw.prototype.$el = null;

      Yaw.prototype.defaults = {
        paramA: 'foo',
        paramB: 'bar'
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
          e.preventDefault();
          return index;
        },
        tabsNavOnClick: function(e) {
          var index;
          index = e.data.plugin.eventHandlers.menuItemOnClick($(this));
          e.data.plugin.$el.find('.yaw__tabs__contents__item').eq(index).fadeIn().siblings().hide();
        },
        sorterOnClick: function(e) {
          var index;
          index = e.data.plugin.eventHandlers.menuItemOnClick($(this));
          return false;
        }
      };

      Yaw.prototype.attachEvents = function() {
        this.$el.find('.yaw__tabs__nav a').on('click', {
          plugin: this
        }, this.eventHandlers.tabsNavOnClick);
        this.$el.find('.yaw__feedback__sort a').on('click', {
          plugin: this
        }, this.eventHandlers.sorterOnClick);
      };

      Yaw.prototype.init = function() {
        this.attachEvents();
      };

      $.fn.extend({
        myPlugin: function() {
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

  $(window).load(function() {
    return $('.yaw__tabs__nav li').eq(2).find('a').trigger('click');
  });

}).call(this);
