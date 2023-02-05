
// function sendChat(){
// 	let msg = $('#msg').val()
// 	$.ajax({
// 		type : "POST",
// 		url : "/users/chat",
// 		data : {"message" : msg},
// 		success : function (response){
// 			let result = response['msg']
//         if(result === false){
// 					modalOpen('채팅 생성에 실패했습니다.')
// 					return
// 				}
// 				var msgLine = $('<div class="msgLine">');
// 				var msgBox = $('<div class="me">');

// 				msgBox.append(msg);
// 				msgBox.css('display', 'inline-block');
// 				msgLine.css('text-align', 'right');
// 				msgLine.append(msgBox);

// 				$('#chatView').append(msgLine);
// 		}
// 	})
// }