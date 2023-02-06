let page = 0;
$(document).ready(function () {
  page = 1
  show_Product(1);
});
function show_Product(page) {
  $.ajax({
    type: "POST",
    url: "/product/index",
    data: {"page": page},
    success: function (response) {
      console.log(response["data"][0])
      let rows = response["data"];

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
          //console.log(page);
          show_Product(page)
      }
  });
};

// IntersectionsObserver 생성
const observer = new IntersectionObserver(callback, option);

// target 관찰
observer.observe(sentinel);