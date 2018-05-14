"use strict";

(function() {
    console.log("HI");

    function Product(name, price, expirationDate, ) {
        this.id = Math.floor(Math.random() * (99999 - 10000) + 10000);
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.price = price;
        this.expirationDate = new Date(expirationDate)
        this.getInfo = function() {
            var nameSlice = this.name.split("");
            nameSlice = nameSlice[0].toUpperCase() + nameSlice[name.length - 1].toUpperCase();
            var productId = nameSlice + this.id + ", " + this.name + ", " + this.price;
            return productId;
        }
    }

    function shoppingBag() {
        this.shoppingList = [];
        this.addProduct = function(product) {
            var currentDate = new Date();
            var expirationDate = product.expirationDate;

            if (!product && !product instanceof Product && !currentDate > expirationDate) {
                throw Error("invalid product");
            }

            this.shoppingList.push(product)
            return this.shoppingList;
        }


        this.getTotalPrice = function(product) {
            var totalPrice = 0;
            this.shoppingList.forEach(function(product) {
                totalPrice += product.price;
            });
            return totalPrice;
        }

        this.getAveragePrice = function() {
            var averagePrice = 0;
            var totalPrice = this.getTotalPrice();
            averagePrice = totalPrice / this.shoppingList.length;
            return averagePrice.toFixed(2)
        }

        this.getMostExpensive = function() {
            if (this.shoppingList.length === 0) {
                throw Error("shopping bag is empty")
            }
            var sortProducts = this.shoppingList.slice().sort(function(currentProduct, nextProduct) {
                return currentProduct.price - nextProduct.price;
            })
            var mostExpensiveProduct = sortProducts[sortProducts.length - 1]
            return mostExpensiveProduct
        }

    }

    function PaymentCard(accountBalance, expirationDate) {
        this.accountBalance = parseFloat(accountBalance.toFixed(2));
        this.expirationDate = new Date(expirationDate);
        this.status = this.expirationDate > new Date();
    }

    function checkOutAndPay(myPaymentCard, myBag) {

        if (!myPaymentCard.status) {
            throw Error("payment card is expired")
        }

        var accountBalance = myPaymentCard.accountBalance;
        var totalPriceOfProducts = myBag.getTotalPrice();
        var ifPurchaseValid = accountBalance >= totalPriceOfProducts;

        console.log("totol price of products for buying : " + totalPriceOfProducts + "\n" + "payment card balace : " + accountBalance + " din.")

        if (ifPurchaseValid) {
            var forPay = accountBalance - totalPriceOfProducts;
            var newAccountBalance = parseFloat(forPay.toFixed(2));
            console.log("remaining fonds on you're payment card after purchase: " + newAccountBalance + " din.")

            shoppingBag.productList = [];
            return "You have successfully purchased your items!";
        } else {
            var extraAmountForPaying = totalPriceOfProducts - accountBalance;
            return "You need " + extraAmount + " more to be able to buy your items!"
        }

    }

    var banana = new Product("banana", 120, "12/12/2018")
    var mango = new Product("mango", 110, "12/12/2018")
    var orange = new Product("orange", 140, "12/12/2018")

    banana.getInfo();
    mango.getInfo();
    orange.getInfo();

    var myBag = new shoppingBag();

    myBag.addProduct(banana)
    myBag.addProduct(mango)
    myBag.addProduct(orange)
    myBag.getTotalPrice();
    myBag.getAveragePrice();
    myBag.getMostExpensive();

    var myPaymentCard = new PaymentCard(1700.50, "12/12/2019")
    var myBayProducts = myBag.shoppingList;

    console.log(checkOutAndPay(myPaymentCard, myBag));
    console.log(myBayProducts);


})();