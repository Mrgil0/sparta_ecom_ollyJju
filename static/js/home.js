let page = 0;
$(document).ready(function () {
  page = 1
  show_Product(1, '');
});
let searchText = '';
function show_Product(page, text) {
  $.ajax({
    type: "POST",
    url: "/product/index",
    data: {"page": page, "text": text, "full_width": screen.width, "window_width": top.window.outerWidth},
    success: function (response) {
      let rows = response["data"];

      if((text != '' || text != undefined) && page == 1){
        $(document).scrollTop(0);
      }

      for (let i = 0; i < rows.length; i++) {
        let productId = rows[i]["id"];
        let Image = rows[i]["productImage"];
        let nickname = rows[i]["productName"];
        let price = rows[i]["price"];

        let temp_html = `
                  <a href='/product_detail?id=${productId}'>
                    <div class="row">
                        <img src="/${Image}">
                        <div class="fea-text">
                            <h5>${nickname}</h5>
                            <p>${price}</p>
                        </div>
                    </div>
                  </a>
                `;

        $("#bestProduct").append(temp_html);
        $('#targetBox').css('display', 'block')
      }
    },
  });
}

const sentinel = document.getElementById('targetBox')

const option = {
  root: null, //viewport
  rootMargin: "0px",
  threshold: 1, // 전체(100%)가 viewport에 들어와야 callback함수 실행
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return; 
    }
    if(entry.isIntersecting) {
        page ++; // 2부터 시
        show_Product(page, searchText)
    }
  });
};

// IntersectionsObserver 생성
const observer = new IntersectionObserver(callback, option);

// target 관찰
observer.observe(sentinel);

$('#searchBtn').keyup(function(e){
  if(e.which == 13) {
    searchText = $('#searchBtn').val()
    if(searchText == '') {
      modalOpen('검색할 단어를 입력해주세요.')
      return;
    }
    $("#bestProduct").html('');
    page = 1;
    show_Product(page, searchText)
  }
})

function clickMenu(category){
  page = 1;
  searchText = category
  $("#bestProduct").html('');
  show_Product(page, category)
}