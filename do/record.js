
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

(function() {

	var header = document.querySelector(".text.action > header");
	if (!header) return;

	var offset = header.offsetTop;

	var fixed = false;

	window.addEventListener("scroll", function(e) {
		console.log("window.scrollY: " + window.scrollY);
		console.log("offset: " + offset);
		if (window.scrollY > offset) {
			document.body.className += " fixed";
			fixed = true;
		} else {
			document.body.className = document.body.className.replace(/fixed/g, "");
			fixed = false;
		}
	});

})();


