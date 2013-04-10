/**
 * ---------------------------------
 * TRACKING
 * Any event tracking for analytics should be added here
 * ---------------------------------
 */
var Tracking = function() {
  
  var ga_account, ga_active;
  
  /**
   * Set listeners for elements that need to be tracked
   * @example
   * $('.link').on('click', function() {
   *   _track_event($(this).attr('href'), "Scratch Dr Page Header", "Add to Cart Click", "Scratch Dr Page - Click YouTube");
   * });
   */
  var _set_listeners = function() {

  };

  /**
   * Track the event
   * @param  {string} link     The link from the anchor
   * @param  {string} category The category of the event
   * @param  {string} action   The action of the event
   * @param  {string} label    The label of the event
   * @return {void}
   */
  var _track_event = function(link, category, action, label) {
    if(ga_active) {
      label = label || "";
      try {
        var pageTracker=_gat._getTracker(ga_account);
        pageTracker._trackEvent(category, action, label);
      } catch(err){}
      window.location.href = link;
    }
  };
  
  return {
    init: function() {
      ga_account  = "UA-8118613-1",
      ga_active   = true;
      
      _set_listeners();
    },
    
    track_event: _track_event
  };
  
}();

$(function() {  
  Tracking.init();
});
