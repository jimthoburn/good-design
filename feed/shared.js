
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


(function() {

  if (!document.body.addEventListener || !document.body.querySelector) return;

/*  =ToggleButton
  ----------------------------------------------- */
  var ToggleButton = function(element, labels) {

    if (!element) return;

    var button = element.getElementsByTagName("button");
    if (button.length > 0) button = button[0];

    var cursor = 0;

    function toggle() {
      cursor++;
      if (cursor > labels.length - 1) cursor = 0;
      button.innerHTML = labels[cursor];
    }

    element.addEventListener("submit", function(e) { e.preventDefault(); }, false);
    button.addEventListener("click", function(e) {
      toggle();
      e.preventDefault();
    }, false);

  }

  var articles = document.getElementsByTagName("article");
  for (var index = 0; index < articles.length; index++) {

    var form = articles[index].querySelector(".body form");
    if (form) {
      new ToggleButton(form, ["<span>Do It</span>", "<span>To Do</span>", "<span>Done</span>"]);
    }

    /*
    form = articles[index].querySelector(".source .details form");
    if (form) {
      new ToggleButton(form, "Following", "Follow");
    }

    forms = articles[index].querySelectorAll(".object form");
    for (var j = 0; j < forms.length; j++) {
      new ToggleButton(forms[j], "Following", "Follow");
    }
    */

    forms = articles[index].querySelectorAll(".person form");
    for (var j = 0; j < forms.length; j++) {
      new ToggleButton(forms[j], ["Follow", "Following"]);
    }

  }

})();



