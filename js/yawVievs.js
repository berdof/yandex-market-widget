// Generated by CoffeeScript 1.6.2
var yawFooter, yawHead, yawItem, yawMain;

yawHead = "<div class=\"yaw__feedback__head\">\n\n</div>\n\n<script id=\"yawHead\" type=\"text/x-handlebars-template\">\n<div class=\"yaw__feedback__head__top\">\n<!--<div id=\"pageIndex\" class=\"fl_l\">0</div>-->\n<dl class=\"yaw__creator fl_r\">\n<dt>Разработчик</dt>\n<dd><a class=\"sm-logo\" target=\"_blank\" href=\"http://socialmart.ru\"></a></dd>\n<dt>Данные</dt>\n<dd><a href=\"#\">Яндекс.Маркет</a></dd>\n</dl>\n<div style=\"display:none\" class=\"yaw__my-rate\">\n<span class=\"yaw__label fl_l\">Моя оценка</span>\n\n<div class=\"yaw__product-rate fl_l\">\n<span style=\"width: {{ratingValue}}%\"></span>\n</div>\n<a class=\"fl_l yaw__btn_yellow\" href=\"#\">Написать отзыв</a>\n</div>\n</div>\n<div class=\"yaw__feedback__head__bottom\">\n<div style=\"display:none;\" class=\"yaw__my-rate\">\n<span class=\"yaw__label fl_l\">Мнение покупателей</span>\n\n<div class=\"yaw__product-rate fl_l\">\n<span style=\"width: {{ratingValue}}%\"></span>\n</div>\n<span class=\"fl_l yaw__vote-count\">{{ratingCount}} оценок</span>\n</div>\n<div class=\"yaw__descr\">\n<p class=\"yaw__descr__item\">\n<span class=\"yaw__descr__name\">\nДостоинства:\n</span>\nЭкран, камера, удобство использования, вес, скорость, качество звука\n</p>\n\n<p class=\"yaw__descr__item\">\n<span class=\"yaw__descr__name\">\nНедостатки:\n</span>\nЦена, аккумулятор, аксессуары, надежность\n</p>\n</div>\n</div>\n</script>\n";

yawItem = "<script id=\"yawFeedback\" type=\"text/x-handlebars-template\">\n<div class=\"yaw__feedback__item\">\n<div class=\"yaw__feedback__item__head\">\n<a class=\"yaw__feedback__ava \" href={{blogUrl}}>\n<img src=\"{{avatar}}\" alt=\"\"/>\n</a>\n{{author}}\n<span class=\"yaw__feedback__item__time fl_r\">{{date}}</span>\n<!--<span class=\"yaw__feedback__item__time fl_r\">12 декабря 2012</span>-->\n</div>\n\n<div class=\"clearfix\">\n<div class=\"yaw__feedback__item__rate\">\n<div class=\"yaw__product-rate fl_l\">\n<span style={{gradeStyled}}></span>\n</div>\n<span class=\"yaw__label fl_l\">{{gradeName}}</span>\n<span class=\"yaw__label fl_r\">Опыт использования - {{date_h}}</span>\n</div>\n</div>\n\n<p class=\"yaw__descr__item\">\n<span class=\"yaw__descr__name\">\nДостоинства: {{grade}}\n</span>\n{{pro}}\n</p>\n\n<p class=\"yaw__descr__item\">\n<span class=\"yaw__descr__name\">\nНедостатки:\n</span>\n<span class=\"yaw__descr__value\">\n{{contra}}\n</span>\n</p>\n\n<div class=\"yaw__feedback__usefull\">\nОтзыв полезен? <span  class=\"yaw__feedback__usefull__yes\">Да</span> {{agree}} / <span  class=\"yaw__feedback__usefull__no\">Нет</span> {{reject}}\n</div>\n</div>\n</script>";

yawFooter = "<div class=\"yaw__feedback__footer\">\n<ul class=\"yaw__feedback__pager_simple fl_l\">\n<li>Страницы</li>\n<li><a class=\"disabled\" data-increment='-1' href=\"#\">предыдущая</a></li>\n<li><a data-increment='+1' href=\"#\">следующая</a></li>\n</ul>\n<ul class=\"yaw__feedback__pager fl_r\">\n</ul>\n</div>";

yawMain = "<div class=\"yaw__feedback\">\n" + yawHead + "\n<div class=\"yaw__feedback__body\">\n<ul class=\"yaw__feedback__sort\">\n<li>Сортировать по</li>\n<li class=\"active desc\"><a href=\"#\">дате</a></li>\n<li class=\"desc\"><a href=\"#\">оценке</a></li>\n<li class=\"desc\"><a href=\"#\">полезности</a></li>\n</ul>\n" + yawItem + "\n<div class=\"yawFeedbackFrag\" id=\"yawFeedbackFrag\"></div>\n</div>\n" + yawFooter + "\n</div>";

$yawJq.fn.yawSkeleton = yawMain;