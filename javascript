let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  const totalText = document.getElementById("total");

  cartList.innerHTML = "";
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.item} - $${product.price.toFixed(2)}`;
    cartList.appendChild(li);
  });

  totalText.textContent = `Total: $${total.toFixed(2)}`;
}

function checkout() {
  alert("Proceeding to checkout. Thank you for shopping at Sudes Supermarket!");
  cart = [];
  total = 0;
  updateCart();
}
document.getElementById("order-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("customer-name").value;
  const phone = document.getElementById("customer-phone").value;
  const paymentMethods = Array.from(document.querySelectorAll('input[name="payment"]:checked'))
                              .map(input => input.value);

  if (paymentMethods.length === 0) {
    alert("Please select a payment method.");
    return;
  }

  // Prepare product list
  const productList = cart.map(item => `${item.item} ($${item.price.toFixed(2)})`).join(", ");
  document.getElementById("order-products").value = productList;

  // Show alert for now (or send to server later)
  alert(`Thank you, ${name}!\nPhone: ${phone}\nOrder: ${productList}\nPayment Method: ${paymentMethods.join(", ")}`);

  // Reset everything
  document.getElementById("order-form").reset();
  checkout();
});
