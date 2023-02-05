$(document).ready(function () {
  show_Product();
});

function show_Product() {
  $.ajax({
    type: "GET",
    url: "/product/index",
    data: {},
    success: function (response) {
      let rows = response["data"];
      
      for (let i = 0; i < 4; i++) {
        let productId = rows[i]["id"];
        let Image = rows[i]["productImage"];
        let nickname = rows[i]["productName"];
        let price = rows[i]["price"];
        console.log(productId)
        let temp_html = `
                    <a href='/page/product_detail?id=${productId}'>
                      <div id="${productId}" class="row">
                          <img src="/${Image}">
                          <div class="fea-text">
                              <h5>${nickname}</h5>
                              <p>${price}</p>
                          </div>
                      </div>
                    </a>
                `;
        $("#newProduct").append(temp_html);
      }

      for (let i = 4; i < rows.length; i++) {
        let productId = rows[i]["id"];
        let Image = rows[i]["productImage"];
        let nickname = rows[i]["productName"];
        let price = rows[i]["price"];

        let temp_html = `
                  <a href='/page/product_detail?id=${productId}'>
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
