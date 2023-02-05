// $(document).ready(function () {
//     show_product_detail();
// });

// function abc(productId) {
//     window.location.href= "./product_detail"
//     show_product_detail(productId)
// }

function show_product_detail(productId) {
  $.ajax({
    type: "POST",
    url: `/product/detail/${productId}`,
    data: {},
    success: function (response) {
        // let rows = response["data"];
        // console.log(rows);

        // let productId = rows[0]["id"];
        // let Image = rows[0]["productImage"];
        // let nickname = rows[i]["productName"];
        // let price = rows[0]["price"];
        // let productInfo = rows[0]["productInfo"];

        // let temp_html = `
        //         <div id="${productId}" class="row">
        //             <div class="col-2">
        //                 <img src="/${Image}" width="400">
                        
        //             </div>
        //             <div class="col-2">
        //                 <h1>${nickname}</h1>
        //                 <h4>${price}</h4>

        //                 <select>
        //                     <option>사이즈</option>
        //                     <option>S</option>
        //                 </select>

        //                 <input type="number" value="1">
        //                 <a href="" class="btn">카트에 넣기</a>

        //                 <h3>자세히 보기 <i class="uil uil-right-indent-alt"></i></h3>
        //                 <br>
        //                 <p>${productInfo}</p>
        //             </div>
        //         </div>
        //         `;
        // $("#single-product").append(temp_html);
    },
  });
}
