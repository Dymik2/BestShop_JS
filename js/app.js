const products = document.querySelector("#products");
const orders = document.querySelector("#orders");
const calcSelect = document.querySelector(".select__input");
const package = document.querySelector("#package");
const selectDropdown = [...document.querySelectorAll("#package .select__dropdown li")];
const accounting = document.querySelector("#accounting");
const terminal = document.querySelector("#terminal");
const calcSummary = [...document.querySelectorAll(".calc__summary li")];
const summaryTotal = document.querySelector(".summary__total");

console.log(selectDropdown);

calcSelect.addEventListener("click", openSelect);
products.addEventListener("input", addProducts);
orders.addEventListener("input", addOrders);
accounting.addEventListener("click", addAccounting);
terminal.addEventListener("click", addTerminal);

function costProducts() {
    return parseInt(products.value) ? parseInt(products.value) / 2 : 0;
}

function costOrders() {
    return parseInt(orders.value) ? parseInt(orders.value) / 4 : 0;
}

function addProducts() {
    if (products.value) {

        calcSummary[0].classList.add("open");
        calcSummary[0].children[1].innerText = `${products.value} * $0.5`;
        calcSummary[0].children[2].innerText = `$ ${costProducts()}`;
    }
    else {
        calcSummary[0].classList.remove("open");
    }
    checkValues();
}

function addOrders() {
    if (orders.value) {
        calcSummary[1].classList.add("open");
        calcSummary[1].children[1].innerText = `${orders.value} * $0.25`;
        calcSummary[1].children[2].innerText = `$ ${costOrders()}`;
    }
    else {
        calcSummary[1].classList.remove("open");
    }
    checkValues();
}

function addAccounting() {
    if (accounting.checked) {
        calcSummary[3].classList.add("open");
    }
    else {
        calcSummary[3].classList.remove("open");
    }
    checkValues();
}

function addTerminal() {
    if (terminal.checked) {
        calcSummary[4].classList.add("open");
    }
    else {
        calcSummary[4].classList.remove("open");
    }
    checkValues();
}

function openSelect() {
    package.classList.toggle("open");
}

selectDropdown.forEach(function (el) {
    el.addEventListener("click", choosePackage);
})

let costPackage = 0;
let activePackage = false;

function choosePackage(event) {
    if (event.target.dataset.value === 'basic') {
        costPackage = 0;
        calcSummary[2].children[1].innerText = `Basic`;
        calcSummary[2].children[2].innerText = `$ ${costPackage}`;
        activePackage = true;
    }
    if (event.target.dataset.value === 'professional') {
        costPackage = 25;
        calcSummary[2].children[1].innerText = `Professional`;
        calcSummary[2].children[2].innerText = `$ ${costPackage}`;
        activePackage = true;
    }
    if (event.target.dataset.value === 'premium') {
        costPackage = 60;
        calcSummary[2].children[1].innerText = `Premium`;
        calcSummary[2].children[2].innerText = `$ ${costPackage}`;
        activePackage = true;
    }
    calcSummary[2].classList.add("open");
    checkValues();
    package.classList.remove("open");
    calcSelect.setAttribute("id", "active__input")
    calcSelect.innerText = calcSummary[2].children[1].innerText;
}

function checkValues() {
    if (products.value || orders.value || accounting.checked || terminal.checked || activePackage) {
        let nrp = costProducts();
        let nro = costOrders();
        let sum = nrp + nro + costPackage;
        if (accounting.checked) {
            sum += 35;
        }
        if (terminal.checked) {
            sum += 5;
        }
        summaryTotal.children[1].innerText = `${sum}`;
        summaryTotal.classList.add("open");
    }
    else {
        summaryTotal.classList.remove("open");
    }
}
