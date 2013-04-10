/**
 * ---------------------------------
 * MAIN SITE JAVASCRIPT CONTROLLER
 * Loads after libraries and before any other custom js
 * ---------------------------------
 */
var Control = (function(){
  
  var _delay_time, _scroll_time, _trans_time, page_transitions, $update_message;

  /**
   * Initialize the Control
   * Set any defaults and other settings
   * @return {void}
   */
  var init = function() {
    _delay_time      = 3000,
    _scroll_time     = 1100,
    _trans_time      = 300;
    page_transitions = false;
    
    // fade the body in
    if(page_transitions) {
      $('body').hide().delay(500).fadeIn(_trans_time, function(){
        $(this).css('display', 'block');
      });
    }      

    // if the message is already in the markup, show the message
    $update_message = $('.update-message').slideDown(_trans_time).delay(_delay_time).slideUp();

    _set_listeners();
    //_set_blockUI_styles();
  };

  /**
   * Global event listeners
   */
  var _set_listeners = function() {
    $('a[href^="#"]').on('click', _scroll_to_id);
    
    // if global variable is set to have page transitions
    if(page_transitions) {
      $('header .nav').on('click', 'a:not([href="javascript:;"])', _page_transition);
    }
  };

  /**
   * Handles page fading out on nav click
   * @param  {obj} e Event object
   * @return {void}
   */
  var _page_transition = function(e) {
    e.preventDefault();
    var link = $(this).attr('href');
    $('body').fadeOut(_trans_time, function(){
      window.location.href = link;
    });
  };

  /**
   * Scrolls to position of supplied element of matched anchor name
   */
  var _scroll_to_id = function(e) {    
    var id     = $(this).attr('href').substring(1), 
        anchor = $('a[name="' + id + '"]'),
        offset = ($(window).width() > 480) ? 60 : 0;

    e.preventDefault();

    $("html,body").animate({scrollTop: anchor.offset().top - offset}, _scroll_time, 'easeInOutExpo');
  };

  /**
   * Sets global style of all blockUI elements
   */
  var _set_blockUI_styles = function() {
    $.blockUI.defaults.overlayCSS = { 
      backgroundColor: '#fff',
      opacity        : 0.8,
      cursor         : 'wait' 
    };
  };
  
  /**
   * Global update message handler, if the message is not in the page already,
   * this method creates it
   * @param  {string} msg  The text to display in the message
   * @param  {string} type Class added to message div (Optional)
   * @return {void}
   */
  var _update = function(msg, type) {
    var msg_type = (type) ? type : "message";
    if(msg_type !== "error") {
      if($update_message.length === 0) {
        $update_message = $('<div>', {'class': 'update-message ' + type})
          .prependTo($('div[role=main]')).hide();
      }
      _display_message(msg);
    } 
    else {
      alert(msg);
    }
  };

  /**
   * Handles the message animation
   * @param  {string} msg The text to display
   * @return {void}
   */
  var _display_message = function(msg) {
    $update_message.html(msg).slideDown(_trans_time).delay(_delay_time).slideUp();
  };
  
  return {
    init       : init,
    update     : _update,
    trans_time : _trans_time,
    delay_time : _delay_time
  };
})();

$(function() { 
  /**
   * Custom Console
   * This is a simple utility plugin that checks first to see if the 
   * console is available (ie, of course) and creates an object and method if 
   * it doesn't so it doesn't error out
   */
  $.Console = function(message) {
    try { 
      console.log(message); 
    } 
    catch (e) { 
      console = { log: function() { } };
    }
  };

  /**
   * Custom fadeIn/fadeOut method
   * @param {obj} $from_el   The object that should fadeOut
   * @param {obj} $to_el     The object that should fadeIn afterwards
   * @param {int} trans_time How long should the transitions take? (optional)
   */
  $.Switcher = function($from_el, $to_el, trans_time) {
    trans_time = (trans_time == 'undefined') ? 300 : trans_time;
    $from_el.fadeOut(trans_time, function(){
      $to_el.fadeIn(trans_time);
    });
  };

  /**
   * Init pub/sub
   * This defines a simple mechanism to publish, subscribe, and unsubscribe 
   * to events
   */
  var o = $({});
  $.each(
    {
      trigger: 'publish',
      on     : 'subscribe',
      off    : 'unsubscribe'
    }, 
    function( key, val ) {
      jQuery[val] = function() {
        o[key].apply( o, arguments );
      };
  });

  /**
   * Initialize the control
   */
  Control.init();
});