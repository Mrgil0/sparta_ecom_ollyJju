$(document).ready(function () {
  cartProduct();  
  });

  function cartProduct() {
    
    $.ajax({
      type: 'GET',
      url: '/page/cartpagePro',
      data: {}, 
      success: function (response) {
        
        let rows = response["data"]
        let f = cartSum()
        console.log('으아ㅏㅏㅏㅏㅏ',cartSum())
        
        if (rows.length === 0) {
          alert('장바구니가 비었습니다.')
        }

        for (let i = 0; i < rows.length; i++) {
          let proIdx = rows[i].product_idx
          let proIdx2 = rows[i].product_idx
          let proName = rows[i].Product.productName
          let proImage = rows[i].Product.productImage
          let proPrice = rows[i].Product.price
          let proCount = rows[i].count
          let total = proPrice * proCount

          let temp_html = `                      
                           <table>
                              
                              <tr id="cart">
                                <td>
                                  <input type='checkbox' name='cart' value=${total} onclick='cartSum()'/>
                                  <!-- onchange 상태 변화 체크로 체크가 되면 상품의 가격을 아래 총 가격에 더한다. -->
                                </td>
                                <td>
                                  <div class="cart-info">
                                    <img src="/${proImage}">
                                    <div>
                                      <p>${proName}</p>
                                      <small>가격: ${proPrice}</small>
                                      <br>
                                      <a href="#" id=${proIdx} onclick="cartDelete_btn(this.id)">삭제</a> 
                                    </div>     
                                  </div>
                                </td>
                                  <td><input type="number" value=${proCount}></td>
                                  <td>${total}</td>
                                </tr>
                            </table>               
                          `;
          $("#product").append(temp_html)
        }
        
        let temp_html = `
                          <table>
                            <tr>
                              <td>총 상품 가격</td>
                              <td>${f}</td>
                            </tr>
                            <tr>
                              <td>배송비</td>
                              <td>0</td>
                            </tr>
                            <tr>
                              <td>총 주문 금액</td>
                              <td>0</td>
                            </tr>
                            <tr>
                              <td>
                                  <button type="button">구매하기</button>
                              </td>
                            </tr>
                          </table>
                        `
          $("#productPrice").append(temp_html)
      }
    })
  }
  

  function cartSum() {
    let To = []
    let len = $("input[name='cart']:checked").length;
    if (len > 0) {
      //개수를 체크하고 2개부터는 each함수를 통해 각각 가져온다.
      $("input[name='cart']:checked").each(function (e) {
        To.push($(this).val())
        // console.log($(this).val());
      });
    }
    console.log(To)
    let sum = Number('')
    for (i = 0; i < To.length; i++) {
      sum += Number(To[i])
    }

    let sumTotal = sum
    console.log('합계는:', sumTotal)
    return sumTotal
  }

  function cartPurchase_btn(proIdx2) {
    let proId = proIdx2
    console.log(proId)
    $.ajax({
      type: 'PATCH',           
      url: '/page/cartpagePro',    
      data: { "proId": proId },
      success: function (response) { 
        alert(response['message'])
        window.location.reload()
      },
      error: function (error) { 
        alert('보내기 실패' + error)
      }
    })
  }
  
  function cartDelete_btn(proIdx) {
    let proId = proIdx
    $.ajax({
      type: 'DELETE',          
      url: '/page/cartpagePro',    
      data: { "proId": proId },
      success: function (response) { 
        alert(response['message'])
        window.location.reload()
      },
      error: function (error) { 
        alert('보내기 실패' + error)
      }
    })
  }