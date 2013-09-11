
(function() {

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

   /*  =DropDown
    ----------------------------------------------- */
    var DropDown = function(element) {

      if (!element) return;

      var headline = element.getElementsByTagName("h2")[0];

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

      headline.addEventListener("click", toggle, false);

      element.className += " scripted";

      document.addEventListener("click", function(e) {
        if (!within(e.target, element)) {
          hideDetails();
        }
      }, false);

    }

    new DropDown(document.getElementById("filter"));

  })();
