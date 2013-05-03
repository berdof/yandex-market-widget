(($, window) ->
  class Yaw
    $el: null

    defaults:
      paramA: 'foo'
      paramB: 'bar'

    constructor: (el, options) ->
      @options = $.extend({}, @defaults, options)
      @$el = $(el)
      @init()
    eventHandlers:
      menuItemOnClick: (e)->
        $li =e.parent()
        index = $li.index()
        $li.addClass('active')
          .siblings('li').removeClass('active')
        return index
      tabsNavOnClick: (e)->
        index = e.data.plugin.eventHandlers.menuItemOnClick($(@))
        e.data.plugin.$el.find('.yaw__tabs__contents__item').eq(index).fadeIn()
          .siblings().hide()
        return
      sorterOnClick: (e)->
        index = e.data.plugin.eventHandlers.menuItemOnClick($(@))
        return false
    attachEvents: ()->
      @$el.find('.yaw__tabs__nav a').on('click', {plugin: @}, @eventHandlers.tabsNavOnClick)
      @$el.find('.yaw__feedback__sort a').on('click', {plugin: @}, @eventHandlers.sorterOnClick)
      return
    init: () ->
      @attachEvents()
      return


    # Define the plugin
    $.fn.extend yaw: (option, args...) ->
      @each ->
        $this = $(this)
        data = $this.data('yaw')

        if !data
          $this.data 'yaw', (data = new Yaw(this, option))
        if typeof option == 'string'
          data[option].apply(data, args)
) window.jQuery, window

$(window).load ()->
  $('.yaw__tabs__nav li').eq(2).find('a').trigger('click')