(() => {
    console.log("HI");

    class Product {
        constructor(name, price, expirationDate) {
            this.id = Math.floor(Math.random() * (99999 - 10000) + 10000);
            this.name = name.charAt(0).toUpperCase() + name.slice(1);
            this.price = parseFloat(price.toFixed(3));
            this.expirationDate = new Date(expirationDate);
        }
        getInfo() {
            let output = this.name.charAt(0).toUpperCase() + this.name.charAt(this.name.length - 1).toUpperCase() +
                +this.id + ", " + this.name + ", " + this.price + " din.";
            return output;
        }
    }

    class ShoppingBag {
        constructor() {
            this.shoppingList = [];
            this.listInfo = [];
        }

        addProduct(product) {
            let currentDate = new Date;
            if (!product && !product instanceof Product && !currentDate >= expirationDate) {
                throw Error("not valid product")
            }

            this.shoppingList.push(product);
        }
        info(product) {
            this.listInfo.push(product.getInfo());
        }
        calculateTotalPrice() {
            let totalPrice = 0;
            if (this.shoppingList.length === 0) {
                throw Error("shopping bag is empty")
            }
            this.shoppingList.forEach(function(product) {
                totalPrice += product.price;
            });

            return totalPrice;
        }
        getAveragePrice() {
            var averagePrice = 0;
            var totalPrice = this.calculateTotalPrice();
            var numberOfProducts = this.shoppingList.length;
            averagePrice = totalPrice / numberOfProducts;

            return parseFloat(averagePrice.toFixed(3));
        }
        getMostExpensive() {
            let sortProducts = this.shoppingList.slice().sort(function(currentProduct, nextProduct) {
                return currentProduct.price - nextProduct.price;
            })

            var mostExpensiveProduct = sortProducts[sortProducts.length - 1]
            return mostExpensiveProduct
        }
    }

    class PaymentCard {
        constructor(accountBalance, expirationDate) {
            this.accountBalance = accountBalance;
            this.expirationDate = new Date(expirationDate);
            this.status = this.expirationDate >= new Date();
        }
    }

    const checkOutAndPay = (paymentCard, shoppingBag) => {
        const status = paymentCard.status;
        const accountBalance = paymentCard.accountBalance;
        const expirationDate = paymentCard.expirationDate;
        const totalPriceOfProducts = shoppingBag.calculateTotalPrice();
        const ifPurchaseValid = accountBalance >= totalPriceOfProducts;

        if (!status) {
            throw Error("Payment card has expired !")
        }

        console.log("Total price of products for buying : " + totalPriceOfProducts + " din." + "\n" + "payment card balace : " + accountBalance + " din.")

        if (ifPurchaseValid) {
            const forPay = accountBalance - totalPriceOfProducts;
            const newAccountBalance = parseFloat(forPay.toFixed(2));
            console.log("remaining fonds on you're payment card after purchase: " + newAccountBalance + " din.")

            return "You have successfully purchased your items!";
        } else {
            const extraAmountForPaying = totalPriceOfProducts - accountBalance;
            return "You need " + extraAmountForPaying + " more to be able to buy your items!"
        }

        shoppingBag.productList = [];
        ShoppingBag.listInfo = [];
    }

    const banana = new Product("banana", 120, "12/12/2018");
    const mango = new Product("mango", 110, "12/12/2018");
    const orange = new Product("orange", 140, "12/12/2018");

    const shoppingBag = new ShoppingBag();


    shoppingBag.addProduct(banana)
    shoppingBag.addProduct(mango)
    shoppingBag.addProduct(orange)

    shoppingBag.info(banana)
    shoppingBag.info(mango)
    shoppingBag.info(orange)

    shoppingBag.calculateTotalPrice();
    shoppingBag.getAveragePrice();
    shoppingBag.getMostExpensive();

    const myPaymentCard = new PaymentCard(1700.50, "12/12/2019")
    const shoppingBagProducts = shoppingBag.listInfo;

    console.log(checkOutAndPay(myPaymentCard, shoppingBag));
    console.log(shoppingBagProducts);
})()