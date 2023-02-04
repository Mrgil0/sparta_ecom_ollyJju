let navToggle = 0;
function toggleNav(){
	if(navToggle === 0){
		$('.sideNav').css('opacity', '1');
		$("#mySidenav").css('display', 'block');
		$(".closeBtn").html('&times;')
		$(".sideNav").css('background-color', 'rgb(255, 255, 255)')
		navToggle = 1;
	} else{
		$('.sideNav').css('opacity', '0');
		$("#mySidenav").css('display', 'none');
		$(".closeBtn").html('&equals;')
		$(".sideNav").css('background-color', 'rgb(245, 237, 231)')
		navToggle = 0;
	}
}