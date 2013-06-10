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

(($yawJq, window) ->
  class Yaw
    #skeleton: skeleton
    paginatorCreated:no
    pagesCount :1
    activePage:1
    $el: null
    defaults:
      title: ''
      serverUrl: 'http://socialmart.ru'
      searchMode: 'splitbylat'
      region: 213
      page: 1  ,
      #1- дата
      #2- оценка
      #3- полезность
      sortOrder: 1
      cssLinkPath: 'css/style.css?v='+Math.round(+new Date()/1000)
      widgetSelectorId: 'yaw'

    log: (str)->
      console.log str
      return
    constructor: (el, options) ->
      @options = $yawJq.extend({}, @defaults, options)
      @$el = $yawJq(el)
      $yawJq("##{@options.widgetSelectorId}").html(  $yawJq.fn.yawSkeleton);
      @init()
      return
  #981 658
    eventHandlers:
      sorterOnClick: (e)->
        plugin = e.data.plugin
        self = $yawJq(this)
        $li =self.parent()
        $li.addClass('active')
          .siblings().removeClass('active')

        plugin.options.sortOrder = $li.index()
        #$('.yaw__feedback__pager a').eq(0).trigger('click')
        plugin.eventHandlers.changePageOnClick(e)
        return false
      changePageOnClick:(e)->
        plugin = e.data.plugin
        self = $yawJq(this)
        selfId = self.attr('id')
        activePage = plugin.activePage
        pageNum = self.html()
        pageIncrement = ~~self.data('increment')
        isLast = activePage is plugin.pagesCount
        isFirst = activePage>1
        if  self.hasClass('disabled') or self.hasClass('active')
          return false
        if selfId isnt 'yawNextPages'
            if pageIncrement > 0 and  !isLast #next
              ++activePage
            else if pageIncrement < 0 and isFirst #prev
              --activePage
            else if pageIncrement is 0 #right paginator
              activePage = pageNum

            plugin.clearOpinions()
            plugin.createPage(activePage)
            plugin.activePage = activePage

        else
          console.log "next pages portion"
          #todo: create pagination portions

        $yawJq('#pageIndex').html(plugin.activePage+' of '+plugin.pagesCount)
        e.preventDefault()
        return false
    attachEvents: ()->
      @$el.find('.yaw__feedback__sort a').on('click', {plugin: @}, @eventHandlers.sorterOnClick)
      @$el.find('.yaw__feedback__pager').on('click','a', {plugin: @}, @eventHandlers.changePageOnClick)
      @$el.find('.yaw__feedback__pager_simple').on('click','a', {plugin: @}, @eventHandlers.changePageOnClick)
      return
    fetchId: ()->
      selfOpts = @options
      $yawJq.ajax(
        'url': "#{selfOpts.serverUrl}/widget/get/model/?name=#{selfOpts.title}&jsonp=?"
        'dataType': 'jsonp'
      )
    fetchMainDescr:()->

      return
    fetchPage: (page=1)->
      selfOpts = @options

      url = "#{selfOpts.serverUrl}/widget/get/model/opinions?model=#{selfOpts.modelId}&region=#{selfOpts.region}&page=#{page}&order=#{selfOpts.sortOrder}&jsonp=?"

      console.log url

      $yawJq.ajax(
        'url': url
        'dataType': 'jsonp'
      )
    fillFrag: (templateId,$frag,data)->
      source  =$yawJq(templateId).html()
      template = Handlebars.compile(source)
      html = template(data)
      $frag.html(html)
      return

    createFeedbackFrag:(id)->
      $yawJq('<div></div>',{
        'class':'yawFeedbackFrag',
        'id':"yawFeedbackFrag#{id}"
      })
    clearOpinions:()->
      $yawJq('#yawFeedbackFrag').html('')
      return
    fillOpinion:(data,id)->
      frag = @createFeedbackFrag(id)
      $yawJq('.yawFeedbackFrag').append(frag)
      @fillFrag('#yawFeedback',frag,data)
      return

    createPage:(index)->
      self =@
      self.fetchPage(index).done(
        (d)->
          if !self.paginatorCreated
            data =
              ratingCount: d.ratingCount
              ratingValue: d.ratingValue*20
            self.fillFrag('#yawHead',$yawJq('.yaw__feedback__head'),data)
          if not self.paginatorCreated
            self.pagesCount = d.pages
          d.opinions.forEach((opinion,i)->
            opinion.gradeStyled = "width:" + opinion.grade * 20 + "%"
            self.fillOpinion(opinion,index+i)
            #if not self.paginatorCreated
            self.createPaginator()
            return
          )
          self.activatePage(index)
          return
        )
      return
    createPaginator:()->
      $pager = ''
      if not @.paginatorCreated
        for i in [0...@pagesCount]
          $pager+="<li><a href=javascript:void(0);>#{i+1}</a></li>"
        #$pager+="<li ><a id='yawNextPages' href=javascript:void(0);>...</a></li>"
        $yawJq('.yaw__feedback__pager').html($pager)
        $yawJq('.yaw__feedback__pager').find('li:first a').addClass('active')
      @.paginatorCreated = yes
      return
    activatePage:(index )->
      self = @
      isFirst = ~~self.activePage is 1
      isLast = ~~self.activePage is self.pagesCount
      $yawJq('.yaw__feedback__pager').find('li').eq(index-1).find('a').addClass('active')
        .closest('li').siblings().find('a').removeClass('active')
      $yawJq('.yaw__feedback__pager_simple a').removeClass('disabled')
      if(isFirst)
        $yawJq('.yaw__feedback__pager_simple li').eq(1).find('a').addClass('disabled')
      if(isLast)
        $yawJq('.yaw__feedback__pager_simple li').eq(2).find('a').addClass('disabled')
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
    $yawJq.fn.extend yaw: (option, args...) ->
      @each ->
        $this = $yawJq(this)
        data = $this.data('yaw')

        if !data
          $this.data 'yaw', (data = new Yaw(this, option))
        if typeof option == 'string'
          data[option].apply(data, args)
) $yawJq, window.jQuery, window
