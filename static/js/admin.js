$(document).ready(function () {
  show_Product();
});

function show_Product() {
  $.ajax({
    type: "GET",
    url: "/admin/product",
    data: {},
    success: function (response) {
      let rows = response["data"];

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
                    <input id="name${productId}" class="product_input" type="text" name="" placeholder="${nickname}">
                    <input id="price${productId}" class="product_input" type="text" name="" placeholder="${price}">
                </div>
                <div class="row2">
                    <textarea id="Info${productId}" type="text" class="proAduct_input" placeholder="${Info}"></textarea>
                </div>
                <div class="row2">
                    <input id="create" onclick="update_product(${productId})" type="button" value="수정" class="btn">
                    <input id="delete" onclick="delete_product(${productId})" type="button" value="삭제" class="btn">
                </div>
            </div>
        `;

        $("#contactForm").append(temp_html);
      }
    },
  });
}

let refresh = 0;

function create_product() {
  const name = $("#name").val();
  const content = $("#content").val();
  const price = $("#price").val();
  const category = $("#category").val();
  const image = $('input[name="chooseFile"]').get(0).files[0];
  console.log(image);
  const formData = new FormData();

  formData.append("productName", name);
  formData.append("productInfo", content);
  formData.append("price", price);
  formData.append("productImage", image);
  formData.append("category", category);

  $.ajax({
    type: "POST",
    url: "/admin/product",
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    data: formData,
    success: function (response) {
        if(response["message"] === true) {
            refresh = 1;
            url = '/manage_product'
            modalOpen("상품 등록 성공 !");
        }
    },
  });
}

function update_product(productId) {
        let name = document.getElementById("name"+productId).value;
        let Info = document.getElementById("Info"+productId).value;
        let price = document.getElementById("price"+productId).value;
        console.log(name, Info, price)
        const data = {
            productName: name,
            productInfo: Info,
            price: price
        }

    $.ajax({
        type: "PATCH",
        url: `/admin/product/${productId}`,
        data: data,
        success: function (response) {
          refresh = 1;
          url = '/manage_product'
          modalOpen("상품 수정 성공 !");
        }
    })

}

function delete_product(productId) {
  $.ajax({
    type: "DELETE",
    url: `/admin/product/${productId}`,
    data: {},
    success: function (response) {
      refresh = 1;
      url = '/manage_product'
      modalOpen("상품 삭제 성공 !");
    }
  })
}