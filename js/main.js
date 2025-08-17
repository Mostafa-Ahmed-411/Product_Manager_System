let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let create_btn = document.querySelector(".create");
let save_btn = document.querySelector(".save");
let searchBy = document.querySelector(".search-by");
let searchByTitleBtn = document.querySelector(".search-by-title");
let searchByCategortBtn = document.querySelector(".search-by-category");
let resetBtn = document.querySelector(".reset");
let footer = document.getElementById("footer");

searchByTitleBtn.addEventListener("click", () => handelSearchByBtn("title"));
searchByCategortBtn.addEventListener("click", () =>
  handelSearchByBtn("categor")
);
create_btn.addEventListener("click", handelCreateBtn);
resetBtn.addEventListener("click", handelResetBtn);
save_btn.addEventListener("click", handelSaveBtn);

let allProducts = [];
// let productData = {
//     title ,
//     price ,
//     taxes ,
//     ads   ,
//     discount ,
//     total ,
//     count ,
//     category ,
// };
/* -------------------------- adjustFooterPosition -------------------------- */
function adjustFooterPosition() {
  if (document.body.scrollHeight <= window.innerHeight) {
    footer.style.position = "absolute";
    console.log("absolute");
  } else {
    footer.style.position = "relative";
    console.log("relative");
  }
}
/* -------------------------- searchBtnsVisibility -------------------------- */
function searchBtnsVisibility(style) {
  searchBy.style.display = style;
  resetBtn.style.display = style;
  searchByTitleBtn.style.display = style;
  searchByCategortBtn.style.display = style;
}
/* -------------------------------------------------------------------------- */
/*                             MakeInputsRequired                             */
/* -------------------------------------------------------------------------- */

// function MakeInputsRequired() {
//   let inputsfield = Array.from(document.querySelector(".container form"));
//   inputsfield.forEach((field) => {
//     if (field.value != "create") field.setAttribute("required", true);
//   });
// }
// MakeInputsRequired();
/* -------------------------------------------------------------------------- */
/*                             check-empty-inputs                             */
/* -------------------------------------------------------------------------- */
function checkEmptyInputs(productData) {
  let isValide = true;
  for (const key in productData) {
    if (Object.prototype.hasOwnProperty.call(productData, key)) {
      if (productData[key] == "") {
        alert("fill " + key + " input");
        isValide = false;
        break;
      }
    }
  }
  return isValide;
}
/* -------------------------------------------------------------------------- */
/*                                Total Change                                */
/* -------------------------------------------------------------------------- */
price.addEventListener("keyup", () => {
  total.innerHTML = totalChange();
  taxes.addEventListener("keyup", () => {
    total.innerHTML = totalChange();
    ads.addEventListener("keyup", () => {
      total.innerHTML = totalChange();
      discount.addEventListener("keyup", () => {
        total.innerHTML = totalChange();
      });
    });
  });
});
function totalChange() {
  let total =
    Number(price.value) +
    Number(taxes.value) +
    Number(ads.value) -
    Number(discount.value);
  return total;
}
/* -------------------------------------------------------------------------- */
/*                                window.onload                               */
/* -------------------------------------------------------------------------- */
window.onload = function () {
  if (JSON.parse(localStorage.getItem("productData")) != null) {
    allProducts = JSON.parse(localStorage.getItem("productData"));
  } else {
    allProducts = [];
    resetBtn.style.display = "none";
  }
  save_btn.classList.toggle("hidden-btn");
  searchBy.value = "";
  searchBy.disabled = true;
  updateUI();
};
/* -------------------------------------------------------------------------- */
/*                               handelCreateBtn                              */
/* -------------------------------------------------------------------------- */
function handelCreateBtn(e) {
  e.preventDefault();
  let isValide = true;
  let productData = {};

  productData.title = title.value;
  productData.price = price.value;
  productData.taxes = taxes.value;
  productData.ads = ads.value;
  productData.discount = discount.value;
  productData.total =
    Number(productData.price) +
    Number(productData.taxes) +
    Number(productData.ads) -
    Number(productData.discount);
  productData.count = count.value;
  productData.category = category.value;
  productData.currentIndex = allProducts.length + 1;
  let counter = e.target.form[5].value;

  /* -------------------------------------- */
  isValide = checkEmptyInputs(productData);
  if (isValide) {
    let counter = Number(count.value);
    while (counter--) {
      allProducts.push(productData);
    }
    localStorage.setItem("productData", JSON.stringify(allProducts));
    updateUI();
  }
}
/* -------------------------------------------------------------------------- */
/*                                   update                                   */
/* -------------------------------------------------------------------------- */
function updateUI() {
  if (allProducts.length == 0) {
    document.getElementById("showData").innerHTML = "";
    searchBtnsVisibility("none");
  } else {
    searchBtnsVisibility("block");
  }

  searchBy.value = "";
  searchBy.disabled = true;
  document.getElementById("all-counter").innerHTML = allProducts.length;

  let drsh = "";
  for (let index = 0; index < allProducts.length; index++) {
    drsh += `
				<tr>
					<td>${index + 1}</td>
					<td>${allProducts[index].title}</td>
					<td>${allProducts[index].price}</td>
					<td>${allProducts[index].taxes}</td>
					<td>${allProducts[index].ads}</td>
					<td>${allProducts[index].discount}</td>
					<td>${allProducts[index].total}</td>
                    <td>${allProducts[index].category}</td>
        <td><button class="update-btn"  onclick="handelUpdateBtn(this)" title=${index} key=${index}>update</button></td>
        <td><button class="delete-btn"  onclick="handelDeleteBtn(this)" title=${index} key=${index}>delete</button></td>
				</tr>
        `;
    document.getElementById("showData").innerHTML = drsh;
  }
  clearFormInputs();
  adjustFooterPosition();
}
function toggleBtnsVisibility() {
  save_btn.classList.toggle("hidden-btn");
  create_btn.classList.toggle("hidden-btn");
}
function setSearchBtnsDisabled(status) {
  searchByTitleBtn.disabled = status;
  searchByCategortBtn.disabled = status;
  searchBy.disabled = status;
}
function setConrolBtnsDisabled(status) {
  let update_btn = document.querySelectorAll(".update-btn");
  let delete_btn = document.querySelectorAll(".delete-btn");

  update_btn.forEach((btn) => {
    btn.setAttribute("disabled", status);
    btn.classList.toggle("disapled-btn");
  });
  delete_btn.forEach((btn) => {
    btn.setAttribute("disabled", status);
    btn.classList.toggle("disapled-btn");
  });
}
function fillInputsBySelectedProduct(newSpecificProduct) {
  title.value = newSpecificProduct.title;
  price.value = newSpecificProduct.price;
  taxes.value = newSpecificProduct.taxes;
  ads.value = newSpecificProduct.ads;
  discount.value = newSpecificProduct.discount;
  total.innerHTML = newSpecificProduct.total;
  count.value = newSpecificProduct.count;
  category.value = newSpecificProduct.category;
}
function countInputVisibility(style) {
  count.style.visibility = style;
}

/* -------------------------------------------------------------------------- */
/*                              handle_update_btn                             */
/* -------------------------------------------------------------------------- */
function handelUpdateBtn(e) {
  toggleBtnsVisibility();
  setSearchBtnsDisabled(true);
  setConrolBtnsDisabled(true);

  let updateProductIndex = e.getAttribute("key");
  let newSpecificProduct = allProducts.find((product, key) => {
    return key == updateProductIndex;
  });

  fillInputsBySelectedProduct(newSpecificProduct);
  form.setAttribute("data-update-index", updateProductIndex);
  countInputVisibility("hidden");
}
/* -------------------------------------------------------------------------- */
/*                               handel Delete Btn                              */
/* -------------------------------------------------------------------------- */
function handelDeleteBtn(e) {
  let deleteProductIndex = e.getAttribute("key");
  let newAllProducts = allProducts.filter((product, key) => {
    return key != deleteProductIndex;
  });
  allProducts = [...newAllProducts];
  localStorage.setItem("productData", JSON.stringify(allProducts));
  updateUI();
}
/* -------------------------------------------------------------------------- */
/*                                handel Save Btn                               */
/* -------------------------------------------------------------------------- */
function handelSaveBtn(e) {
  e.preventDefault();
  toggleBtnsVisibility();
  setSearchBtnsDisabled(false);
  setConrolBtnsDisabled(false);

  let updateIndex = form.getAttribute("data-update-index");
  if (updateIndex !== null) {
    // Update the product
    allProducts[updateIndex] = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };
    localStorage.setItem("productData", JSON.stringify(allProducts));
    form.removeAttribute("data-update-index");
    updateUI();
    countInputVisibility("visible");
  }
}
/* -------------------------------------------------------------------------- */
/*                            handel Search By Btn                            */
/* -------------------------------------------------------------------------- */

function handelSearchByBtn(searchFilter) {
  searchBy.disabled = false;
  searchBy.focus();
  searchBy.setAttribute("placeholder", `Search by ${searchFilter}`);
  let ProductResult = JSON.parse(localStorage.getItem("productData"));

  searchBy.addEventListener("keyup", (e) => {
    let searchWord = e.target.value;
    let sreachedResult;

    if (searchFilter === "title") {
      sreachedResult = ProductResult.filter((obj) =>
        obj.title.toLowerCase().includes(searchWord.toLowerCase())
      );
    } else {
      sreachedResult = ProductResult.filter((obj) =>
        obj.category.toLowerCase().includes(searchWord.toLowerCase())
      );
    }
    let drsh = "";

    if (sreachedResult.length == 0) {
      drsh = `
                <tr style="text-align: center; background-color: rgba(50, 3, 3, 0.52);">
                    <td> </td>
                    <td></td>
                    <td> </td>
                    <td>❌</td>
                    <td>no</td>
                    <td>result</td>
                    <td>founded</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
             `;
    } else {
      for (let index = 0; index < sreachedResult.length; index++) {
        drsh += `
          <tr>
            <td>${index + 1}</td>
            <td>${sreachedResult[index].title}</td>
            <td>${sreachedResult[index].price}</td>
            <td>${sreachedResult[index].taxes}</td>
            <td>${sreachedResult[index].ads}</td>
            <td>${sreachedResult[index].discount}</td>
            <td>${sreachedResult[index].total}</td>
                      <td>${sreachedResult[index].category}</td>
          <td><button class="update-btn"  onclick="handelUpdateBtn(this)" key=${index}>update</button></td>
          <td><button class="delete-btn"  onclick="handelDeleteBtn(this)" key=${index}>delete</button></td>
          </tr>
          `;
      }
    }
    document.getElementById("showData").innerHTML = drsh;
  });
}
/* ---------------------------- clear form inputs --------------------------- */
function clearFormInputs() {
  const formInputs = [title, price, taxes, ads, discount, count, category];
  formInputs.forEach((input) => (input.value = ""));
  total.textContent = "";
}
/* --------------------------- clear local storage -------------------------- */
function handelResetBtn() {
  let confirm = window.confirm("are you sure you want to reset all products");
  if (confirm) {
    allProducts = [];
    localStorage.removeItem("productData");
    updateUI();
  }
}
