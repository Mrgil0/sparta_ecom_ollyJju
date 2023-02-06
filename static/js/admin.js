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
        console.log(rows)
      for (let i = 0; i < rows.length; i++) {
        let productId = rows[i]["id"];
        let Image = rows[i]["productImage"];
        let nickname = rows[i]["productName"];
        let price = rows[i]["price"];
        let Info = rows[i]["productInfo"];

        let temp_html = `
        <div id=${productId} class="box">
            <div class="row">
                <input type="text" name="" placeholder="${nickname}">
                <input type="text" name="" placeholder="${price}">
            </div>
            <div class="row2">
                <textarea placeholder="${Info}"></textarea>
            </div>
            <div class="row2">
                <input type="submit" value="수정" class="btn">
                <input type="submit" value="삭제" class="btn">
            </div>
        </div>
        `

        $("#contactForm").append(temp_html);
      }
    },
  });
}
