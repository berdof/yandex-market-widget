###
 **
* jQuery Plugin SocialMart
*
* Author: Alexander Berdyshev
*
* Version: 1.0
*
 **
###

(($, window) ->
  class Yaw
    $el: null
    defaults:
      title: ''
      serverUrl: 'http://dev2.socialmart.ru'
      searchMode: 'splitbylat'
      region: 213
      page: 1
    log: (str)->
      console.log str
      return
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
      sorterOnClick: (e)->
        index = e.data.plugin.eventHandlers.menuItemOnClick($(@))
        return false
    attachEvents: ()->
      @$el.find('.yaw__feedback__sort a').on('click', {plugin: @}, @eventHandlers.sorterOnClick)
      return
    fetchId: ()->
      selfOpts = @options
      $.ajax(
        'url': "#{selfOpts.serverUrl}/widget/get/model/?name=#{selfOpts.title}&jsonp=?"
        'dataType': 'jsonp'
      )
    fetchOpinions: (page)->
      selfOpts = @options
      @log("#{selfOpts.serverUrl}/widget/get/model/opinions/?model=#{selfOpts.modelId}&region=#{selfOpts.region}&page=#{page}&jsonp=?")
      $.ajax(
        'url': "#{selfOpts.serverUrl}/widget/get/model/opinions/?model=#{selfOpts.modelId}&region=#{selfOpts.region}&page=#{page}&jsonp=?"
        'dataType': 'jsonp'
      )
    fillFrag: (templateId,$frag,data)->
      source  =$(templateId).html()
      template = Handlebars.compile(source)
      html = template(data)
      $frag.html(html)
      return

    createFeedbackFrag:(id)->
      $('<div></div>',{
        'class':'yawFeedbackFrag',
        'id':"yawFeedbackFrag#{id}"
      })

    fillOpinion:(data,id)->
      frag = @createFeedbackFrag(id)
      @log(frag)
      $('.yawFeedbackFrag:last').after(frag)
      @fillFrag('#yawFeedback',frag,data)
      return

    init: () ->
      self = this
      self.attachEvents()
      self.fetchId().done(
        (d)->
          self.options.modelId = d.model_id
          #override id wth mine
          self.options.modelId = 8454852
          self.fetchOpinions(self.options.page++).done(
            (d)->
              for iter in [0...14]#d.opinions.length]
                opinion =  d.opinions[iter]
                opinion.gradeStyled = "width:" + opinion.grade * 20 + "%"
                console.log opinion
                self.fillOpinion(opinion,self.options.page+iter)
              return;
          )
          return

      )
      return


    # Define the plugin"32967637" "32174326"
    $.fn.extend yaw: (option, args...) ->
      @each ->
        $this = $(this)
        data = $this.data('yaw')

        if !data
          $this.data 'yaw', (data = new Yaw(this, option))
        if typeof option == 'string'
          data[option].apply(data, args)
) window.jQuery, window
