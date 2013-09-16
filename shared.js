
(function() {

  if (!document.body.addEventListener) return;

  function within(needle, haystack) {

    // If the parent element is the target
    if (needle === haystack) {
      return true;

    // If any of the children are the target
    } else if (haystack.firstChild) {
      var child = haystack.firstChild;
      do {
        if (within(needle, child)) return true;
      } while(child = child.nextSibling);
    }

  }

  /* =DropDown
  ----------------------------------------------- */
  var DropDown = function(element) {

    if (!element) return;

    var headline = element.getElementsByTagName("h2");
    if (headline.length > 0) {
      headline = headline[0];
    } else {
      headline = element.getElementsByTagName("h3");
      if (headline.length > 0) {
        headline = headline[0];
      }
    }

    var detailsShowing;

    function hideDetails() {
      element.className += " summary";
      detailsShowing = false;
    };

    function showDetails() {
      element.className = element.className.replace(/summary/g, "");
      detailsShowing = true;
    };

    function toggle() {
      if (detailsShowing) hideDetails();
      else showDetails();
    }

    hideDetails();

    headline.addEventListener("click", function(e) {
      toggle();
      e.preventDefault();
    }, false);

    element.className += " scripted";

    document.addEventListener("click", function(e) {
      if (!within(e.target, element)) {
        hideDetails();
      }
    }, false);

  }

  new DropDown(document.getElementById("filter"));
  new DropDown(document.getElementById("account"));


  /* =DelayedHover
  ----------------------------------------------- */
  var DelayedHover = function(element, delay) {
    if (!element) return;

    var timer;
    var active = true;
    if (!delay) delay = 250;

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

  //new DelayedHover(document.getElementById("account"), 50);

})();


(function() {

  if (!document.body.addEventListener || !document.body.querySelector) return;

/*  =ToggleButton
  ----------------------------------------------- */
  var ToggleButton = function(element, activeLabel, inactiveLabel) {

    if (!element) return;

    var button = element.getElementsByTagName("button");
    if (button.length > 0) button = button[0];

    var active;

    function activate() {
      element.className += " active";
      button.innerHTML = activeLabel;
      active = true;
    };

    function deactivate() {
      element.className = element.className.replace(/active/g, "");
      button.innerHTML = inactiveLabel;
      active = false;
    };

    function toggle() {
      if (active) deactivate();
      else activate();
    }

    if (element.className.indexOf("active") >= 0) active = true;

    element.addEventListener("submit", function(e) { e.preventDefault(); }, false);
    button.addEventListener("click", function(e) {
      toggle();
      e.preventDefault();
    }, false);
  }

  var articles = document.getElementsByTagName("article");
  for (var index = 0; index < articles.length; index++) {

    var form = articles[index].querySelector(".social form");
    if (form) {
      if (articles[index].className.indexOf("do") >= 0) {
        new ToggleButton(form, "<span>Do</span>", "<span>Do</span> It");
      } else {
        new ToggleButton(form, "<span>Good</span>", "It’s <span>Good</span>");
      }
    }

    form = articles[index].querySelector(".source .details form");
    if (form) {
      new ToggleButton(form, "Following", "Follow");
    }

    forms = articles[index].querySelectorAll(".object form");
    for (var j = 0; j < forms.length; j++) {
      new ToggleButton(forms[j], "Following", "Follow");
    }

    forms = articles[index].querySelectorAll(".person form");
    for (var j = 0; j < forms.length; j++) {
      new ToggleButton(forms[j], "Following", "Follow");
    }

  }

})();


(function() {

  var messageDuration = 5; // seconds
  var timer;

  var messageElement = document.createElement("div");
  messageElement.className = "message";
  document.body.appendChild(messageElement);

  function showMessage(message) {
    messageElement.innerHTML = message;
    messageElement.className += " active";
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
      messageElement.className = messageElement.className.replace(/ *active/g, "");
    }, messageDuration * 1000);
  };

  var links = document.getElementsByTagName("a");
  for (var index = 0; index < links.length; index++) {
    (function() {   
      var link = links[index];
      link.addEventListener("click", function(e) {
        var title = link.getAttribute("title");
        if (title) {
          showMessage("Link to <strong>“" + link.title + "”</strong>");
          e.preventDefault();
        }
      }, false);
    })();
  }

  /*
  var forms = document.getElementsByTagName("form");
  for (var index = 0; index < forms.length; index++) {
    (function() {   
      var form = forms[index];
      form.addEventListener("submit", function(e) {
        //showMessage(form.href);
        e.preventDefault();
      }, false);
    })();
  }
  */

})();

