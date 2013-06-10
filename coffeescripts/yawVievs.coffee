yawHead = """
          <div class="yaw__feedback__head">

          </div>

          <script id="yawHead" type="text/x-handlebars-template">
          <div class="yaw__feedback__head__top">
          <!--<div id="pageIndex" class="fl_l">0</div>-->
          <dl class="yaw__creator fl_r">
          <dt>Разработчик</dt>
          <dd><a class="sm-logo" target="_blank" href="http://socialmart.ru"></a></dd>
          <dt>Данные</dt>
          <dd><a href="#">Яндекс.Маркет</a></dd>
          </dl>
          <div style="display:none" class="yaw__my-rate">
          <span class="yaw__label fl_l">Моя оценка</span>

          <div class="yaw__product-rate fl_l">
          <span style="width: {{ratingValue}}%"></span>
          </div>
          <a class="fl_l yaw__btn_yellow" href="#">Написать отзыв</a>
          </div>
          </div>
          <div class="yaw__feedback__head__bottom">
          <div style="display:none;" class="yaw__my-rate">
          <span class="yaw__label fl_l">Мнение покупателей</span>

          <div class="yaw__product-rate fl_l">
          <span style="width: {{ratingValue}}%"></span>
          </div>
          <span class="fl_l yaw__vote-count">{{ratingCount}} оценок</span>
          </div>
          <div class="yaw__descr">
          <p class="yaw__descr__item">
          <span class="yaw__descr__name">
          Достоинства:
          </span>
          Экран, камера, удобство использования, вес, скорость, качество звука
          </p>

          <p class="yaw__descr__item">
          <span class="yaw__descr__name">
          Недостатки:
          </span>
          Цена, аккумулятор, аксессуары, надежность
          </p>
          </div>
          </div>
          </script>

          """

yawItem = """
          <script id="yawFeedback" type="text/x-handlebars-template">
          <div class="yaw__feedback__item">
          <div class="yaw__feedback__item__head">
          <a class="yaw__feedback__ava " href={{blogUrl}}>
          <img src="{{avatar}}" alt=""/>
          </a>
          {{author}}
          <span class="yaw__feedback__item__time fl_r">{{date}}</span>
          <!--<span class="yaw__feedback__item__time fl_r">12 декабря 2012</span>-->
          </div>

          <div class="clearfix">
          <div class="yaw__feedback__item__rate">
          <div class="yaw__product-rate fl_l">
          <span style={{gradeStyled}}></span>
          </div>
          <span class="yaw__label fl_l">{{gradeName}}</span>
          <span class="yaw__label fl_r">Опыт использования - {{date_h}}</span>
          </div>
          </div>

          <p class="yaw__descr__item">
          <span class="yaw__descr__name">
          Достоинства: {{grade}}
          </span>
          {{pro}}
          </p>

          <p class="yaw__descr__item">
          <span class="yaw__descr__name">
          Недостатки:
          </span>
          <span class="yaw__descr__value">
          {{contra}}
          </span>
          </p>

          <div class="yaw__feedback__usefull">
          Отзыв полезен? <span  class="yaw__feedback__usefull__yes">Да</span> {{agree}} / <span  class="yaw__feedback__usefull__no">Нет</span> {{reject}}
          </div>
          </div>
          </script>
          """

yawFooter = """
            <div class="yaw__feedback__footer">
            <ul class="yaw__feedback__pager_simple fl_l">
            <li>Страницы</li>
            <li><a class="disabled" data-increment='-1' href="#">предыдущая</a></li>
            <li><a data-increment='+1' href="#">следующая</a></li>
            </ul>
            <ul class="yaw__feedback__pager fl_r">
            </ul>
            </div>
            """


yawMain = """
          <div class="yaw__feedback">
#{yawHead}
          <div class="yaw__feedback__body">
          <ul class="yaw__feedback__sort">
          <li>Сортировать по</li>
          <li class="active desc"><a href="#">дате</a></li>
          <li class="desc"><a href="#">оценке</a></li>
          <li class="desc"><a href="#">полезности</a></li>
          </ul>
#{yawItem}
          <div class="yawFeedbackFrag" id="yawFeedbackFrag"></div>
          </div>
#{yawFooter}
          </div>
          """
$.fn.yawSkeleton = yawMain