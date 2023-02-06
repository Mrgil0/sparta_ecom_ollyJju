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
                    <h1>${name}</h1>
                    <h4>${price}</h4>

                    <select>
                        <option>사이즈</option>
                        <option>S</option>
                    </select>

                    <input type="number" value="1" id="quantity">
                    <a href="#" class="btn" onclick="moveCart()">카트에 넣기</a>

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

function moveCart() {
    const productId = new URLSearchParams(location.search).get('id')
    console.log(productId);
    let product_quantity = $('#quantity').val()
    console.log(product_quantity)

    $.ajax({
        type: 'POST',           // 타입 (get, post, put 등등)
        url: `/product/index/cart/${productId}`,    // 요청할 서버url
        data: { 
            "product_quantity": product_quantity
        },
        success: function (response) { // 결과 성공 콜백함수
            alert(response['message'])
            window.location.reload()
        },
        error: function (error) { // 결과 에러 콜백함수
            alert('보내기 실패' + error)
        }
    })
}