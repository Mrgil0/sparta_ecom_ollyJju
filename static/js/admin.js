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
      console.log(rows);
      for (let i = 0; i < rows.length; i++) {
        let productId = rows[i]["id"];
        let nickname = rows[i]["productName"];
        let price = rows[i]["price"];
        let Info = rows[i]["productInfo"];

        let temp_html = `
            <div id=${productId} class="box">
                <div>
                    <a> 상품 번호 : ${productId}</a>
                </div>
                <div class="row">
                    <input id="name1" class="product_input" type="text" name="" placeholder="${nickname}">
                    <input id="price1" class="product_input" type="text" name="" placeholder="${price}">
                </div>
                <div class="row2">
                    <textarea id="Info1" class="proAduct_input" placeholder="${Info}"></textarea>
                </div>
                <div class="row2">
                    <input onclick="update_product(${productId})" type="submit" value="수정" class="btn">
                    <input type="submit" value="삭제" class="btn">
                </div>
            </div>
        `;

        $("#contactForm").append(temp_html);
      }
    },
  });
}

function create_product() {
  const name = $("#name").val();
  const content = $("#content").val();
  const price = $("#price").val();
  const image = $('input[name="chooseFile"]').get(0).files[0];
  console.log(image);
  const formData = new FormData();

  formData.append("productName", name);
  formData.append("productInfo", content);
  formData.append("price", price);
  formData.append("productImage", image);

  $.ajax({
    type: "POST",
    url: "/admin/product",
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    data: formData,
    success: function (response) {
      window.location.href("/page/manage_product");
    },
  });
}

function update_product(productId) {
        const name = $("#name1").val()
        const Info = $("#Info1").val()
        const price = $("#price1").val()
        console.log(name, Info, price)
        // const data = {
        //     productName: name,
        //     productInfo: Info,
        //     productprice: price
        // }
        console.log(data)
    // const name = $("#name").val();
    // const Info = $("#content").val();
    // const price = $("#price").val();
    $.ajax({
        type: "PATCH",
        url: `/admin/product/${productId}`,
        data: data,
        success: function (response) {
            window.location.reload();
        }
    })

}