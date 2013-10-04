
(function() {
	var quick = document.getElementById("quick");
	var detailed = document.getElementById("record");
	if (quick && detailed) {

		// Show the detailed form, when the quick form is submitted
		(function() {
			var form = quick.getElementsByTagName("form");
			form = form[0];
			form.addEventListener("submit", function(e) {
				quick.className += " hidden";
				detailed.className = detailed.className.replace(/hidden/g, "");
				e.preventDefault();
			});
		})();

		// Show the quick form, when the detailed form is submitted
		(function() {
			var form = detailed.getElementsByTagName("form");
			form = form[0];
			form.addEventListener("submit", function(e) {
				detailed.className += " hidden";
				quick.className = quick.className.replace(/hidden/g, "");
				e.preventDefault();
			});
			var link = form.querySelector(".submit a");
			if (link) link.addEventListener("click", function(e) {
				detailed.className += " hidden";
				quick.className = quick.className.replace(/hidden/g, "");
				e.preventDefault();
			});
		})();

		detailed.className += " hidden";
	}
})();
