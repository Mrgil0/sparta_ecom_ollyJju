$(document).ready(function () {
    show_Product_detail();
  });

function show_Product_detail() {
    const productId = new URLSearchParams(location.search).get('id')
    console.log(productId);

    $.ajax({
        type: "GET",
        url: `/product/index/${productId}`,
        data: {},
        success: function (response) {
            const data = response["data"];
            const productId = data.id;
            const image = data.productImage;
            const name = data.productName;
            const price = data.price;
            const info = data.productInfo;
            console.log(productId, image, name, price, info)

            let temp_html = `
            <div id="${productId}" class="row">
                <div class="col-2">
                    <img src="/${image}" width="400">

                </div>
                <div class="col-2">
                    <div>상품이름</div>
                    <h1>${name}</h1>
                    <div>가격</div>
                    <h4>${price}</h4>

                    <select>
                        <option>사이즈</option>
                        <option>S</option>
                    </select>

                    <input type="number" value="1">
                    <a href="" class="btn">카트에 넣기</a>

                    <h3>자세히 보기 <i class="uil uil-right-indent-alt"></i></h3>
                    <br>
                    <p>${info}</p>
                </div>
            </div>
            `
            $("#single-product").append(temp_html);
        }
    })
}