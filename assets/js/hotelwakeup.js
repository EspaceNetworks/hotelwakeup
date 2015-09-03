$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	if(e.target.id == "settings") {
		$("#submit, #reset").removeClass("hidden");
	} else {
		$("#submit, #reset").addClass("hidden");
	}
});

var time = $("#servertime").data("time");
var updateTime = function() {
	var date = new Date(time*1000),
			hours = date.getHours(),
			minutes = "0" + date.getMinutes(),
			seconds = "0" + date.getSeconds(),
			formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	$("#servertime span").text(formattedTime);
	time = time + 1;
};

setInterval(updateTime,1000);

$(function() {
	$("#day").datepicker();
	$('#time').timepicker();
	$("#savecall").click(function() {
		if($("#destination").val().trim() === "") {
			warnInvalid($("#destination"), _("Destination can not be blank"));
			return false;
		}
		if($("#time").val().trim() === "") {
			warnInvalid($("#time"), _("Time can not be blank"));
			return false;
		}
		if($("#day").val().trim() === "") {
			warnInvalid($("day"), _("Day can not be blank"));
			return false;
		}


		$("#savecall").prop("disabled",true);
		$.post( "ajax.php", {command: "savecall", module: "hotelwakeup", destination: $("#destination").val(), time: $("#time").val(), day: $("#day").val()}, function( data ) {
			if(!data.status) {
				alert(data.message);
			} else {
				callform.reset();
				$("#myModal").modal("hide");
				$('#callgrid').bootstrapTable('refresh');
			}
			$("#savecall").prop("disabled",false);
		});

	});
});