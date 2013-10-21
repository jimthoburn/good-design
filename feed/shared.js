
(function() {

  if (!document.body.addEventListener) return;


  /* =DelayedHover
  ----------------------------------------------- */
  var DelayedHover = function(element, delay) {
    if (!element) return;

    var timer;
    var active = true;
    if (!delay) delay = 300;

    function activate() {
      if (active) return;
      element.className += " active";
      active = true;
    };

    function deactivate() {
      if (!active) return;
      element.className = element.className.replace(/ *active/g, "");
      active = false;
    };

    deactivate();

    element.addEventListener("mouseover", function(e) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(activate, delay);
    }, false);

    element.addEventListener("mouseout", function(e) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(deactivate, 1);
    }, false);

    element.addEventListener("click", function(e) {
      if (timer) clearTimeout(timer);
    }, false);

    element.className += " scripted";
  };

  var sources = document.getElementsByClassName("source");
  for (var index = 0; index < sources.length; index++) {
    new DelayedHover(sources[index]);
  }

  var numbers = document.getElementsByClassName("numbers");
  for (var index = 0; index < numbers.length; index++) {
    new DelayedHover(numbers[index]);
  }

  //new DelayedHover(document.getElementById("account"), 50);

})();




