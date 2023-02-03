let toggle = 0;
function toggleChat(){
	if(toggle === 0){
		$('#openChat').css('display', 'none');
		$('#chatBox').css('display', 'inline-block');
		toggle = 1;
	} else{
		$('#openChat').css('display', 'inline-block');
		$('#chatBox').css('display', 'none');
		toggle = 0;
	}
}