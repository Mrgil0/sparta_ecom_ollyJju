// ※※※※※※※※※※※※※※※※※※※※모달창 코드※※※※※※※※※※※※※※※※※※※※
function modal(id) {
    let zIndex = 999;
    let modal = document.getElementById(id);

    // 모달 div 뒤에 희끄무레한 레이어
    let bg = document.createElement('div');
    bg.setStyle({
        position: 'fixed',
        zIndex: zIndex,
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        // 레이어 색갈은 여기서 바꾸면 됨
        backgroundColor: 'rgba(0,0,0,0.4)'
    });
    document.body.append(bg);

    // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
    modal.querySelector('.modal_close_btn').addEventListener('click', function () {
        bg.remove();
        modal.style.display = 'none';
    });

    modal.setStyle({
        position: 'fixed',
        display: 'block',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

        // 시꺼먼 레이어 보다 한칸 위에 보이기
        zIndex: zIndex + 1,

        // div center 정렬
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        webkitTransform: 'translate(-50%, -50%)'
    });
}

// Element 에 style 한번에 오브젝트로 설정하는 함수 추가
Element.prototype.setStyle = function (styles) {
    for (let k in styles) this.style[k] = styles[k];
    return this;
};

document.getElementById('popup_open_btn').addEventListener('click', function () {
    // 모달창 띄우기
    modal('my_modal');
});
//// ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※

// ※※※※※※※※※※※※※※※※※※※※서버로 POST※※※※※※※※※※※※※※※※※※※※
function edit_btn() {
    let cur_password = $('#cur_password').val()
    let next_password = $('#next_password').val()
    let user_address = $('#address').val()
    let user_phone = $('#phone').val()
    if ([cur_password, next_password, user_address, user_phone].includes('')) { 
        modalOpen('내용을 입력하세요.')
        return
    }
    $.ajax({
        type: 'PATCH',           // 타입 (get, post, put 등등)
        url: '/users/mypage',    // 요청할 서버url
        data: { 
            "cur_password" : cur_password,
            "next_password": next_password,
            "user_address": user_address,
            "user_phone": user_phone
        },
        success: function (response) { // 결과 성공 콜백함수
            if(response["message"] == "불일치"){
                modalOpen('비밀번호가 일치하지 않습니다.')
                return
            }
            refresh = 1;
            url = '/users/mypage'
            modalOpen(response['message'])
        }
    })
}