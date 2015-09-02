(function(it){
  return it(jQuery);
})(function($){
  var plugin;
  plugin = 'watchTyping';
  $.fn[plugin] = function(opt){
    var timer;
    opt = $.extend({}, $.fn[plugin].dft, opt);
    timer = 0;
    return this.each(function(){
      var $el, stopTyping;
      $el = $(this).blur(function(it){
        stopTyping(it, 0);
      }).keydown(function(it){
        if (opt.start) {
          opt.start(it, $el);
        }
      }).keyup(function(it){
        stopTyping(it, opt.delay);
      });
      stopTyping = function(event, delay){
        clearTimeout(timer);
        timer = setTimeout(function(){
          if (opt.stop) {
            return opt.stop(event, $el);
          }
        }, delay);
      };
    });
  };
  return $.fn[plugin].dft = {
    delay: 400
  };
});