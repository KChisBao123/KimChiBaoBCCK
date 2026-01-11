// Database JSON --> Mảng và Object 
const products = [
    {
        id: 1, 
        name: "Mưa Đỏ",
        price: 184500,
        image: "images/MuaDo.png",
        best: true,
        link: "MuaDo.html"
    },
    {
        id: 2, 
        name: "Hồ Điệp Và Kình Ngư",
        price: 111600,
        image: "images/HoDiepVaKinhNgu.png",
        best: true,
        link: "HoDiepVaKinhNgu.html"
    },
    {
        id: 3, 
        name: "Nhà Giả Kim",
        price: 67000,
        image: "images/NhaGiaKim.png",
        best: false,
        link: "NhaGiaKim.html"
    },
    {
        id: 4, 
        name: "Cây Cam Ngọt Của Tôi",
        price: 91500,
        image: "images/CayCamNgotCuaToi.png",
        best: true,
        link: "CayCamNgotCuaToi.html"
    }
]

function renderProducts() {
    let container = document.getElementById("product-list");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {
        let html = `
        <div class="col-md-3 col-sm-6">
            <a href="${product.link}" style="text-decoration: none;">
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top" style="height: 300px;">
                    <div class="card-body text-center d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <span class="price-tag mt-auto">${product.price.toLocaleString()} đ</span>
                        <button class="btn btn-primary w-100 mt-2" onClick = "addToCart(${product.id})">Thêm vào giỏ</button>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-md-3 col-sm-6">
            <a href="${product.link}" style="text-decoration: none;">
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top" style="height: 300px;">
                    <div class="card-body text-center d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <span class="price-tag mt-auto">${product.price.toLocaleString()} đ</span>
                        <button class="btn btn-primary w-100 mt-2" onClick = "addToCart(${product.id})">Thêm vào giỏ</button>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-md-3 col-sm-6">
            <a href="${product.link}" style="text-decoration: none;">
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top" style="height: 300px;">
                    <div class="card-body text-center d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <span class="price-tag mt-auto">${product.price.toLocaleString()} đ</span>
                        <button class="btn btn-primary w-100 mt-2" onClick = "addToCart(${product.id})">Thêm vào giỏ</button>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-md-3 col-sm-6">
            <a href="${product.link}" style="text-decoration: none;">
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top" style="height: 300px;">
                    <div class="card-body text-center d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <span class="price-tag mt-auto">${product.price.toLocaleString()} đ</span>
                        <button class="btn btn-primary w-100 mt-2" onClick = "addToCart(${product.id})">Thêm vào giỏ</button>
                    </div>
                </div>
            </a>
        </div>
        `;
        container.innerHTML += html;
    });
}

renderProducts();

function renderBestProduct() {
    let bestContainer = document.getElementById("BestProduct");

    if (!bestContainer) return;

    bestContainer.innerHTML = "";

    products.forEach(product =>{
        if (product.best == true){
            let html = `
            <div class="col-md-4">
                <div class="card product-card">
                    <img src="${product.image}" class="card-img-top" style="height: 400px;">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted">Tác gi</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="price-tag mb-0">${product.price.toLocaleString()}đ</span>
                            <button class="btn btn-primary mt-2" onClick = "addToCart(${product.id})">Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            bestContainer.innerHTML += html;
        };
    });
}

renderBestProduct();

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
    let item = cart.find(i => i.id === id);

    if (item) {
        item.quantity++; 
    } else {
        cart.push({ id: id, quantity: 1 }); 
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    
    alert("Đã thêm vào giỏ hàng!");
}

function renderCart() {
    let tbody = document.getElementById("cart-body");
    let totalSpan = document.getElementById("total-price");

    if (!tbody) return; 

    tbody.innerHTML = "";
    let sum = 0;

    cart.forEach((item, index) => {
        let info = products.find(p => p.id === item.id);
        
        if (info) {
            // Tính thành tiền
            let money = info.price * item.quantity;
            sum += money;

            tbody.innerHTML += `
                <tr>
                    <td>${info.name}</td>
                    <td>${info.price.toLocaleString()}đ</td>
                    <td>
                        <input type="number" value="${item.quantity}" 
                               onchange="updateCart(${index}, this.value)"
                               style="width: 60px">
                    </td>
                    <td>${money.toLocaleString()}đ</td>
                    <td>
                        <button onclick="removeCart(${index})" class="btn btn-danger btn-sm">Xóa</button>
                    </td>
                </tr>
            `;
        }
    });

    totalSpan.innerText = `Tổng cộng: ${sum.toLocaleString()}đ`;
}


renderCart();

function updateCart(index, quantity) {
    if (quantity < 1){
        alert("Số lượng sản phẩm tối thiểu là 1");
        renderCart();
        return;
    }
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeCart(index) {
    let confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng không?");

    if (confirmDelete) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

function validatePassword(Password) {
    const passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
    );

    return passwordRegex.test(Password)
}

function Register() {
    let FullName = document.getElementById("registerName").value;
    let Email = document.getElementById("registerEmail").value;
    let Password = document.getElementById("registerPassword").value;

    if (!FullName || !Email || !Password) {
        alert("Vui lòng điền đầy đủ thông tin!!!");
        return;
    }
    else{
        if (validatePassword(Password) == false) {
            alert("Mật khẩu không hợp lệ!!!");
            return;
        }
    }
    
    let users = JSON.parse(localStorage.getItem(users));
    let exist = users.find(u => u.Email === Email);
    if (exist) {
        alert("Email đã tồn tại");
        return;
    }
    users.push({name: FullName, email: Email, password: Password});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng nhập thành công")
    window.location.href = "login.html"
}

var myCarousel = document.getElementById('myCarousel');
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 5000, // 5 seconds
  pause: 'hover' // Pauses on hover
});
