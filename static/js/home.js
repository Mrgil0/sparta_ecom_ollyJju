$(document).ready(function () {
  show_newProduct();
});

function show_newProduct() {
  $.ajax({
    type: "GET",
    url: "/product/index",
    data: {},
    success: function (response) {
      let rows = response["data"];

      for (let i = 0; i < 4; i++) {
        let Image = rows[i]["productImage"];
        let nickname = rows[i]["productName"];
        let price = rows[i]["price"];

        let temp_html = `
                    <div class="row">
                        <img onclick="modal_open();" src="/${Image}">
                        <div class="fea-text">
                            <h5>${nickname}</h5>
                            <p>${price}</p>
                        </div>
                    </div>
                `;
        $("#newProduct").append(temp_html);
      }

      for (let i = 4; i < rows.length; i++) {
        let Image = rows[i]["productImage"];
        let nickname = rows[i]["productName"];
        let price = rows[i]["price"];

        let temp_html = `
                    <div class="row">
                        <img src="/${Image}">
                        <div class="fea-text">
                            <h5>${nickname}</h5>
                            <p>${price}</p>
                        </div>
                    </div>
                `;

        $("#bestProduct").append(temp_html);
      }
    },
  });
}
