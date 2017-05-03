if ($("#g-recaptcha").length) {
	var onloadCallback = function() {
		
		grecaptcha.render("g-recaptcha", {
			"sitekey" : $("#siteKey").val(),
			"callback" : captchaSuccess
		});
	};
	var captchaSuccess = function(response) {
		$("#captchaCheck").val(Boolean(response)).attr("disabled", true).valid();
		//$("#captchaCheck").valid();
	};
}