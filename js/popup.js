$(document).ready(function(){

	$('input[type=button]').on('click',function(){
		var ntype = $(this).attr('id');
		chrome.runtime.sendMessage({cmd: "notify",type:ntype},function(response) {
		});
		
	})
	

});