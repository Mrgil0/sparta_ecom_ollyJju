$(document).ready(function () {
  cartProduct();  
});

function cartProduct() {
  $.ajax({
    type: 'GET',
    url: '/users/cartpagePro',
    data: {}, 
    success: function (response) {
      
      let rows = response["data"]
      let f = cartSum()
      
      for (let i = 0; i < rows.length; i++) {
        let proIdx = rows[i].product_idx
        let proName = rows[i].Product.productName
        let proImage = rows[i].Product.productImage
        let proPrice = rows[i].Product.price
        let proCount = rows[i].count
        let total = proPrice * proCount
        
        let temp_html = `   
                          <table>
                            <tr>
                              <td>
                                <input type='checkbox' name='cart' value=${total},${proIdx},${proCount} onclick='cartSum()'/>
                                <!-- onchange 상태 변화 체크로 체크가 되면 상품의 가격을 아래 총 가격에 더한다. -->
                              </td>
                              <td>
                                <div class="cart-info">
                                  <img src="/${proImage}">
                                  <a href="#" class="exception">
                                  <div>
                                    <p>${proName}</p>
                                    <small>가격: ${proPrice}원</small>
                                    <br>
                                    <a href="#" id=${proIdx} onclick="cartDelete_btn(this.id)">삭제</a> 
                                  </div>
                                  </a>     
                                </div>
                              </td>
                                <td><div id="cnt">${proCount} 개</div></td>
                                <td>${total}원</td>
                            </tr>
                          </table>               
                        `;
        $("#product").append(temp_html)
      }
    }
  })
}

// ●●●●●●●●●●●●●● 장바구니 부분 체크 ●●●●●●●●●●●●●●●●●●●●●
function cartSum() {
  let addPrice = []
  addProductId = []
  sendCount = []
  sumTotal = Number()
  let len = $("input[name='cart']:checked").length;
  let delivery = 0

  if (len > 0) {
    $("input[name='cart']:checked").each(function () {
      division = $(this).val().split(',')
      addPrice.push(division[0])
      addProductId.push(division[1])
      sendCount.push(division[2])
      delivery = 2500
    });
  }

  let sum = Number('')
  
  
  for (i = 0; i < addPrice.length; i++) {
    sum += Number(addPrice[i])
  }

  sumTotal = sum
  
  let addd = sumTotal + delivery

  $('#testTable').remove();
  let temp_html = `
                        <table id="testTable">
                          <tr>
                            <td>총 상품 가격</td>
                            <td>${sumTotal}원</td>
                          </tr>
                          <tr>
                            <td>배송비</td>
                            <td>${delivery}원</td>
                          </tr>
                          <tr>
                            <td>총 주문 금액</td>
                            <td>${addd}원</td> 
                          </tr>
                          <tr>
                            <td>
                              <button type="button" onclick="cartPurchase_btn()">구매하기</button>
                            </td>
                          </tr>
                        </table>
                      `
    $("#productPrice").append(temp_html)
  return sumTotal
}

// ●●●●●●●●●●●●●● 장바구니 구입 ●●●●●●●●●●●●●●●●●●●●●
function cartPurchase_btn() {
  addProductId
  sumTotal
  sendCount
  let user_name = $('#content1').val()
  let user_phone = $('#content3').val()
  let user_address = $('#content2').val()
  
  if (addProductId.length === 0) {
    return modalOpen('구매할 상품을 체크해주세요.')
  }
  $.ajax({
    type: 'PATCH',           
    url: '/users/cartpagePro',    
    data: { 
      "addProductId": addProductId,
      "sumTotal": sumTotal,
    },
    success: function (response) { 
    },
    error: function (error) { 
      modalOpen('보내기 실패')
    }
  })

  $.ajax({
    type: 'POST',           
    url: '/users/cartpagePro',    
    data: { 
      "addProductId": addProductId,
      "sendCount": sendCount,
      "user_name": user_name, 
      "user_phone": user_phone, 
      "user_address": user_address
    },
    success: function (response) { 
      if(response['message']){
        refresh = 1
        url = '/users/cart'
        modalOpen('주문이 정상적으로 처리되었습니다.')
      }
    },
    error: function (error) { 
      alert('보내기 실패' + error)
    }
  })
}

// ●●●●●●●●●●●●●● 장바구니 삭제 ●●●●●●●●●●●●●●●●●●●●●
function cartDelete_btn(proIdx) {
  let proId = proIdx
  $.ajax({
    type: 'DELETE',          
    url: '/users/cartpagePro',    
    data: { "proId": proId },
    success: function (response) { 
      refresh = 1
      url='/users/cart'
      modalOpen(response['message'])
    },
    error: function (error) { 
      alert('보내기 실패' + error)
    }
  })
}

// ●●●●●●●●●●●●●● 장바구니 전체 체크 ●●●●●●●●●●●●●●●●●●●●●
function selectAll(selectAll) {
  const checkboxes = document.getElementsByName('cart')

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked
  }) 

  let addPrice = []
  addProductId = []
  sumTotal = Number()
  sendCount
  let len = $("input[name='cart']:checked").length;
  let delivery = 0

  if (len > 0) {
    $("input[name='cart']:checked").each(function () {
      division = $(this).val().split(',')
      addPrice.push(division[0])
      addProductId.push(division[1])
      sendCount.push(division[2])
      delivery = 2500
    });
  }

  let sum = Number('')
  
  
  for (i = 0; i < addPrice.length; i++) {
    sum += Number(addPrice[i])
  }

  sumTotal = sum
  
  let addd = sumTotal + delivery

  $('#testTable').remove();
  let temp_html = `
                        <table id="testTable">
                          <tr>
                            <td>총 상품 가격</td>
                            <td>${sumTotal}원</td>
                          </tr>
                          <tr>
                            <td>배송비</td>
                            <td>${delivery}원</td>
                          </tr>
                          <tr>
                            <td>총 주문 금액</td>
                            <td>${addd}원</td> 
                          </tr>
                          <tr>
                            <td>
                                <button type="button" onclick="cartPurchase_btn()">구매하기</button>
                            </td>
                          </tr>
                        </table>
                      `
    $("#productPrice").append(temp_html)
  return sumTotal
}