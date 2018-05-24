"use strice";

(function() {
    console.log("Hi");

    function Product(name, price, expirationDate) {
        this.id = Math.floor(Math.random() * (99999 - 10000) + 10000);
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.price = parseFloat(price.toFixed(3));
        this.expirationDate = new Date(expirationDate);
    }

    Product.prototype.getInfo = function() {
        var productName = this.name.split("");
        var firstLetter = productName[0].toUpperCase();
        var lastLetter = productName[productName.length - 1].toUpperCase();
        var output = firstLetter + lastLetter + this.id + ", " + this.name + ", " + this.price + " din.";
        return output;
    }

    function ShoppingBag() {
        this.shoppingList = [];
        this.listInfo = [];
    }

    ShoppingBag.prototype.addProduct = function(product) {
        var currentDate = new Date();
        var expirationDate = this.expirationDate;

        if (!product && !product instanceof Product && !currentDate >= expirationDate) {
            throw Error("product is not valid !")
        }

        this.shoppingList.push(product);
        return this.shoppingList;
    }

    ShoppingBag.prototype.info = function(product) {
        this.listInfo.push(product.getInfo())
        return this.listInfo;
    }

    ShoppingBag.prototype.calculateTotalPrice = function(product) {
        var totalPrice = 0;
        if (this.shoppingList.length === 0) {
            throw Error("shopping bag is empty")
        }

        var totalPrice = 0;
        this.shoppingList.forEach(function(product) {
            totalPrice += product.price;
        });

        return totalPrice;
    }

    ShoppingBag.prototype.getAveragePrice = function() {
        var averagePrice = 0;
        var totalPrice = this.calculateTotalPrice();
        var numberOfProducts = this.shoppingList.length;
        averagePrice = totalPrice / numberOfProducts;

        return parseFloat(averagePrice.toFixed(3));
    }

    ShoppingBag.prototype.getMostExpensive = function() {
        var sortProducts = this.shoppingList.slice().sort(function(currentProduct, nextProduct) {
            return currentProduct.price - nextProduct.price;
        })

        var mostExpensiveProduct = sortProducts[sortProducts.length - 1]
        return mostExpensiveProduct
    }

    function PaymentCard(accountBalance, expirationDate) {
        this.accountBalance = accountBalance;
        this.expirationDate = new Date(expirationDate);
        this.status = this.expirationDate >= new Date();
    }

    function checkOutAndPay(paymentCard, shoppingBag) {
        var status = paymentCard.status;
        var accountBalance = paymentCard.accountBalance;
        var expirationDate = paymentCard.expirationDate;
        var totalPriceOfProducts = shoppingBag.calculateTotalPrice();
        var ifPurchaseValid = accountBalance >= totalPriceOfProducts;

        if (!status) {
            throw Error("payment card has expired !")
        }

        console.log("totol price of products for buying : " + totalPriceOfProducts + " din." + "\n" + "payment card balace : " + accountBalance + " din.")

        if (ifPurchaseValid) {
            var forPay = accountBalance - totalPriceOfProducts;
            var newAccountBalance = parseFloat(forPay.toFixed(2));
            console.log("remaining fonds on you're payment card after purchase: " + newAccountBalance + " din.")

            return "You have successfully purchased your items!";
        } else {
            var extraAmountForPaying = totalPriceOfProducts - accountBalance;
            return "You need " + extraAmountForPaying + " more to be able to buy your items!"
        }

        shoppingBag.productList = [];
        ShoppingBag.listInfo = [];
    }

    var banana = new Product("banana", 120, "12/12/2018");
    var mango = new Product("mango", 110, "12/12/2018");
    var orange = new Product("orange", 140, "12/12/2018");

    var shoppingBag = new ShoppingBag();


    shoppingBag.addProduct(banana)
    shoppingBag.addProduct(mango)
    shoppingBag.addProduct(orange)

    shoppingBag.info(banana)
    shoppingBag.info(mango)
    shoppingBag.info(orange)

    shoppingBag.calculateTotalPrice();
    shoppingBag.getAveragePrice();
    shoppingBag.getMostExpensive();

    var myPaymentCard = new PaymentCard(1700.50, "12/12/2019")
    var shoppingBagProducts = shoppingBag.listInfo;

    console.log(checkOutAndPay(myPaymentCard, shoppingBag));
    console.log(shoppingBagProducts);


})()