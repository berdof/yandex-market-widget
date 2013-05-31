###
 **
* jQuery Yandex fedbacks Plugin for socialmart.ru
*
* Author: Alexander Berdyshev
*
* Version: 1.0
*
 **
###

(($, window) ->
  class Yaw
    paginatorCreated:no
    pagesCount :1
    activePage:1
    $el: null
    defaults:
      title: ''
      serverUrl: 'http://socialmart.ru'
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
      return
  #981 658
    eventHandlers:
      sorterOnClick: (e)->
        #index = e.data.plugin.eventHandlers.menuItemOnClick($(@))
        return false
      changePageOnClick:(e)->
        plugin = e.data.plugin
        self = $(this)
        selfId = self.attr('id')
        activePage = plugin.activePage
        pageNum = self.html()
        pageIncrement = ~~self.data('increment')

        if selfId isnt 'yawNextPages'
          if (pageIncrement isnt 0) and activePage>=0 and activePage<=plugin.pagesCount
            activePage = activePage + pageIncrement
          else
            activePage = pageNum
            self.addClass('active')
              .closest('li').siblings().find('a').removeClass('active')
          plugin.clearOpinions()
          plugin.createPage(activePage)
          plugin.activePage = activePage
          console.log pageIncrement
        else
          console.log "next pages portion"
          #todo: create pagination portions

        $('#pageIndex').html(plugin.activePage+' of '+plugin.pagesCount)
        e.preventDefault()
        return false
    attachEvents: ()->
      @$el.find('.yaw__feedback__sort a').on('click', {plugin: @}, @eventHandlers.sorterOnClick)
      @$el.find('.yaw__feedback__pager').on('click','a', {plugin: @}, @eventHandlers.changePageOnClick)
      @$el.find('.yaw__feedback__pager_simple').on('click','a', {plugin: @}, @eventHandlers.changePageOnClick)
      return
    fetchId: ()->
      selfOpts = @options
      console.log "#{selfOpts.serverUrl}/widget/get/model/?name=#{selfOpts.title}&jsonp=?"
      $.ajax(
        'url': "#{selfOpts.serverUrl}/widget/get/model/?name=#{selfOpts.title}&jsonp=?"
        'dataType': 'jsonp'
      )
    fetchMainDescr:()->

      return
    fetchPage: (page)->
      selfOpts = @options
      url = "#{selfOpts.serverUrl}/widget/get/model/opinions?model=#{selfOpts.modelId}&region=#{selfOpts.region}&page=#{page}&jsonp=?"
      $.ajax(
        'url': url
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
    clearOpinions:()->
      $('#yawFeedbackFrag').html('')
      return
    fillOpinion:(data,id)->
      frag = @createFeedbackFrag(id)
      $('.yawFeedbackFrag').append(frag)
      @fillFrag('#yawFeedback',frag,data)
      return

    createPage:(index)->
      self =@
      self.fetchPage(index).done(
        (d)->
          if not self.paginatorCreated
            self.pagesCount = d.pages
          d.opinions.forEach((opinion,i)->
            opinion.gradeStyled = "width:" + opinion.grade * 20 + "%"
            self.fillOpinion(opinion,index+i)
            #if not self.paginatorCreated
            self.createPaginator()
            return
          )
        )
      return
    createPaginator:()->
      $pager = ''
      if not @.paginatorCreated
        for i in [0...@pagesCount]
          $pager+="<li><a href=javascript:void(0);>#{i+1}</a></li>"
        $pager+="<li ><a id='yawNextPages' href=javascript:void(0);>...</a></li>"
        $('.yaw__feedback__pager').html($pager)
        $('.yaw__feedback__pager').find('li:first a').addClass('active')
      @.paginatorCreated = yes
      return
    activatePage:(index)->
      $('.yaw__feedback__pager').find('a').eq(index)
        .addClass('active').parent().find('a').removeClass('active')
      return
    init: () ->
      self = this
      self.attachEvents()

      self.fetchId().done(
        (d)->
          opinionsIter  = 0
          self.options.modelId = d.model_id
          #override id wth mine
          self.options.modelId = 8454852

          self.createPage(1)

          self.fetchMainDescr()
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
