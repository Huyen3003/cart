const product=document.getElementById("product");
const cmt = document.getElementById("comment");
const sum = document.getElementById("summary"); 
const ttsum = document.getElementById("title-sum");
const mycart = document.getElementById("mycart");
fetch('http://localhost:3000/product')
    .then ( response => response.json())
    .then (JSON => {
        let sumcart = Number(0); 
        let total = Number(0);
        for (const key of JSON) {
            if (key.cart != 0) {
                var subtotal = parseFloat (key.price) * parseFloat(key.cart);
                product.innerHTML += `
                <ul> 
                <div class="img">
                    <img class="product-img" src="${key.img}" alt="">
                    <div> 
                    <p class="product-title"> ${key.title}</p>
                    <p class="product-cost">${key.price}${key.currency}</p>
                    </div>
                </div>
                 
                <div class="cart">
                    <input class="minus is-form" type="button" value="-" >
                    <input aria-label="quantity" class="input-qty" max="${key.quantity}" min="0" name="" type="number" value="${key.cart}">
                    <input class="plus is-form" type="button" value="+">
                </div>
                <p class="product-subtotal">${subtotal}${key.currency}</p>
                <button id="delete"> x </button>
    
                </ul>`
                total = parseFloat(total) + subtotal; 
                sumcart = sumcart + key.cart;
            }
            }
        if (sumcart != 0) {
            ttsum.innerHTML = `Order Summary`
            sum.innerHTML = `
            <table> 
                <tr> 
                    <td width=330>Subtotal</td>
                    <td>$ ${total}</td>
                </tr> 
                <tr> 
                    <td>Shipping</td>
                    <td>FREE</td>
                </tr> 
                <tr> 
                    <td style="font-st" >Vietnam</td>
                </tr>
            </table>
            <table style="font-size:30px"> 
                <tr> 
                    <td width=330>Total</td>
                    <td>$ ${total}</td>
                </tr> 
            </table>
            <button id="checkout">
            <i class="fas fa-shopping-bag">  Checkout</i>
            </button>
            `
        } else {
            ttsum.style.border="none";
            mycart.style.width="1200px";
            mycart.style.margin="200px 0px 30px 350px"
            product.innerHTML=`
            <div class ="noproduct"> 
            <p> Cart is empty </p> 
            <a href="./home"> Continue Shopping </a>
            </div>`
            cmt.style.display="none";
        }
    }
       )

