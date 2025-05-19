const products = [
  {
    id: 1,
    name: "Stainless Steel Water Bottle",
    price: 499,
    img: "images/water-bottle.jpg",
    desc: "Durable 1L stainless steel water bottle, ideal for travel and gym.",
  },
  {
    id: 2,
    name: "Bluetooth Earbuds",
    price: 1499,
    img: "images/earbuds.jpg",
    desc: "Wireless Bluetooth earbuds with noise cancellation and charging case.",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    price: 699,
    img: "images/mouse.jpg",
    desc: "Ergonomic wireless mouse with adjustable DPI and silent clicks.",
  },
  {
    id: 4,
    name: "Notebook (A5 - 200 pages)",
    price: 199,
    img: "images/notebook.jpg",
    desc: "Spiral-bound A5 notebook with ruled pages and durable cover.",
  },
  {
    id: 5,
    name: "Ceramic Coffee Mug",
    price: 249,
    img: "images/mug.jpg",
    desc: "300ml printed ceramic coffee mug, microwave and dishwasher safe.",
  },
  {
    id: 6,
    name: "Portable Power Bank (10000mAh)",
    price: 1299,
    img: "images/powerbank.jpg",
    desc: "High-capacity power bank with dual USB outputs and fast charging.",
  },
  {
    id: 7,
    name: "LED Desk Lamp",
    price: 999,
    img: "images/desk-lamp.jpg",
    desc: "Adjustable LED desk lamp with brightness control and USB charging.",
  },
  {
    id: 8,
    name: "Yoga Mat (6mm)",
    price: 799,
    img: "images/yoga-mat.jpg",
    desc: "Non-slip eco-friendly yoga mat, ideal for home workouts.",
  },
  {
    id: 9,
    name: "USB-C Charging Cable (1m)",
    price: 299,
    img: "images/usb-c-cable.webp",
    desc: "Fast-charging USB-C cable compatible with all Type-C devices.",
  },
  {
    id: 10,
    name: "Digital Alarm Clock",
    price: 649,
    img: "images/alarm-clock.webp",
    desc: "LED display digital alarm clock with snooze and night light features.",
  },
  {
    id: 11,
    name: "Phone Holder",
    price: 199,
    img: "images/phone-holder.webp",
    desc: "Adhesive wall phone holder, ideal for charging stations.",
  },
  {
    id: 12,
    name: "Reusable Grocery Bag",
    price: 149,
    img: "images/grocery-bag.webp",
    desc: "Eco-friendly foldable grocery bag with large capacity.",
  },
  {
    id: 13,
    name: "Handheld Milk Frother",
    price: 399,
    img: "images/milk-frother.webp",
    desc: "Battery-operated milk frother for coffee and beverages.",
  },
  {
    id: 14,
    name: "3-in-1 Charging Cable",
    price: 349,
    img: "images/3in1-cable.webp",
    desc: "Multi-connector cable with Lightning, Micro-USB, and USB-C ends.",
  },
  {
    id: 15,
    name: "Mobile Stand Holder",
    price: 179,
    img: "images/mobile-stand.webp",
    desc: "Adjustable stand for smartphones, perfect for video calls or browsing.",
  },
  {
    id: 16,
    name: "Kitchen Cutting Board",
    price: 299,
    img: "images/cutting-board.webp",
    desc: "Antibacterial plastic cutting board for vegetables and meat.",
  },
  {
    id: 17,
    name: "Stainless Steel Lunch Box",
    price: 899,
    img: "images/lunch-box.webp",
    desc: "Leak-proof lunch box with compartments and thermal insulation.",
  },
  {
    id: 18,
    name: "Insulated Travel Mug",
    price: 699,
    img: "images/travel-mug.webp",
    desc: "Double-walled stainless steel travel mug keeps drinks hot/cold.",
  },
  {
    id: 19,
    name: "Desk Organizer Tray",
    price: 349,
    img: "images/desk-organizer.webp",
    desc: "Multi-slot desktop organizer for pens, paper, and accessories.",
  },
  {
    id: 20,
    name: "Microfiber Cleaning Cloths (Pack of 5)",
    price: 199,
    img: "images/cleaning-cloths.webp",
    desc: "Soft, absorbent microfiber cloths for cleaning screens and surfaces.",
  },
];

const getCart = () => JSON.parse(localStorage.getItem("cart") || "[]");
const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

$(document).ready(function () {
  const path = window.location.pathname;

  if (path.includes("index.html") || path === "/" || path === "/project/") {
    products.forEach((p) => {
      $("#product-grid").append(`
        <div class="col-md-4 mb-4">
          <div class="card h-100" data-id="${p.id}" style="cursor:pointer;">
            <img src="${p.img}" class="card-img-top" />
            <div class="card-body ">
            <div class="multiple-div">
                        <div class="left-div">
                <h5>${p.name}</h5>
                <p>₹ ${p.price}</p>
            </div>
            <div class="right-div">
                <input type="number" min="1" value="1" class="form-control qty" />
            </div>
            </div>

              
              <button class="btn btn-sm btn-primary mt-2 add-cart">Add to Cart</button>
            </div>
          </div>
        </div>
      `);
    });

    // Card click -> product.html
    $(".card").click(function (e) {
      if (!$(e.target).hasClass("add-cart") && !$(e.target).hasClass("qty")) {
        const id = $(this).data("id");
        localStorage.setItem("viewProduct", id);
        window.location.href = "product.html";
      }
    });

    // Add to cart logic
    $(".add-cart").click(function () {
      const card = $(this).closest(".card");
      const id = card.data("id");
      const qty = parseInt(card.find(".qty").val());
      const cart = getCart();
      const index = cart.findIndex((item) => item.id === id);
      if (index > -1) {
        cart[index].qty += qty;
      } else {
        const prod = products.find((p) => p.id === id);
        cart.push({ ...prod, qty });
      }
      saveCart(cart);
      alert(
        `Added ${qty} of ${products.find((p) => p.id === id).name} to cart!`
      );
    });
  }

  // Product detail page
  if (path.includes("product.html")) {
    const id = parseInt(localStorage.getItem("viewProduct"));
    const prod = products.find((p) => p.id === id);
    $("#product-detail").html(`
        <div class="col-md-6">
            <img src="${prod.img}" class="img-fluid" alt="${prod.name}">
        </div>
        <div class="col-md-6">
            <h2>${prod.name}</h2>
            <p>${prod.desc}</p>
            <p><strong>₹ ${prod.price}</strong></p>
            <div class="input-group mb-3" style="max-width: 200px;">
            <input type="number" id="detail-qty" class="form-control" value="1" min="1">
            </div>
            <button class="btn btn-success" id="add-detail-cart">Add to Cart</button>
        </div>
`);

    $("#add-detail-cart").click(() => {
      const qty = parseInt($("#detail-qty").val());
      const cart = getCart();
      const index = cart.findIndex((item) => item.id === prod.id);
      if (index > -1) {
        cart[index].qty += qty;
      } else {
        cart.push({ ...prod, qty });
      }
      saveCart(cart);
      alert(`Added ${qty} of ${prod.name} to cart!`);
    });
  }

  // Cart Page
  if (path.includes("cart.html")) {
    const renderCart = () => {
      const cart = getCart();
      let total = 0;
      $("#cart-table tbody").empty();
      cart.forEach((item) => {
        const itemTotal = item.qty * item.price;
        total += itemTotal;
        $("#cart-table tbody").append(`
        <tr data-id="${item.id}">
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>₹ ${item.price}</td>
          <td>₹ ${itemTotal}</td>
          <td><button class="btn btn-danger btn-sm delete-item"><i class="fa-solid fa-xmark"></i></button></td>
        </tr>
      `);
      });
      $("#grand-total").text("Grand Total: ₹ " + total);
    };

    renderCart();

    // Delete item handler
    $(document).on("click", ".delete-item", function () {
      const id = $(this).closest("tr").data("id");
      let cart = getCart();
      cart = cart.filter((item) => item.id !== id);
      saveCart(cart);
      renderCart();
    });
  }
});

$(document).on("click", "tbody tr", function () {
  $(this).addClass("clicked");
  setTimeout(() => {
    $(this).removeClass("clicked");
  }, 500);
});
