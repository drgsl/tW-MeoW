function on(el) {
    let div = el.parentElement.children[1];
    div.style.display = "block";
    div.style.width = "100%";
  }
  
  function off(el) {
    el.style.display = "none";
    el.style.width = "0";
  }
  
  function buildProductHtml(nume, imagine, taguri) {
    let taguletse = "";
  
    let tag = taguri.split(",");
    tag.pop();
  
    for (let i of tag) {
      taguletse += '<div class="tag">' + i + "</div>";
    }
    let s = `<div class="col">
                              <div class="product-container">
                                  <div class="wrap">
                                      <img class="product-img" onclick="on(this)" src="${imagine}">
                                      <div class="hide" id="overlay" onclick="off(this)">
                                          <h3> ${nume} </h3>
                                      </div>
                                  </div>
                                  <div class="details"> ${nume} </div>
                                  <div class="tags">
                                        ${taguletse}
                                  </div>
                              </div>
                          </div>`;
    return s;
  }
  
  function allWordsInString(words, string) {
    for (let word of words) {
      if (string.indexOf(word) == -1) {
        return false;
      }
    }
    return true;
  }
  
  function filterByName() {
    populateData(() => {
      let currentValue = document.getElementById("searchbar").value.toLowerCase();
      console.log(currentValue);
  
      let products = [];
      let currentSplit = currentValue.split(" ");
  
      for (let a of window.products) {
        let name = a["name"].toLowerCase();
        if (allWordsInString(currentSplit, name)) {
          products.push(a);
          console.log(a);
        }
      }
      showProducts(products);
    });
  }
  
  function updateSlider(value) {
    document.getElementById("agep").innerText = "Age: " + value;
    window.sliderValue = value;
  }
  
  function disableSlider() {
    document.getElementById("megaSlider").disabled =
      !document.getElementById("megaSlider").disabled;
    document.getElementById("agep").innerText = "Age filter disabled";
    window.sliderValue = undefined;
  }
  
  function ageFilter(element, ageValue) {
    if (ageValue === undefined) return true;
    let iz_ok = false;
    element["tags"]
      .filter((x) => x.match(/[0-9]+-[0-9]+/g))
      .map((x) => {
        let start_age = parseInt(x.split("-")[0]);
        let end_age = parseInt(x.split("-")[1]);
        if (start_age <= ageValue && ageValue <= end_age) {
          iz_ok = true;
        }
      });
    return iz_ok;
  }
  
  function filterByAnything() {
    populateData(() => {
      let checkboxes = document.getElementsByClassName("checkboxfilter");
      checkboxes = Array.prototype.slice.call(checkboxes);
      let filterValues = checkboxes.filter((x) => x.checked).map((x) => x.value);
  
      let products = [];
      for (let a of window.products) {
        let objectString = JSON.stringify(a).toLowerCase();
        if (
          allWordsInString(filterValues, objectString) &&
          ageFilter(a, window.sliderValue)
        ) {
          products.push(a);
          console.log(a);
        }
      }
      showProducts(products);
    });
  }
  
  function showProducts(products) {
    window.products = products;
    document.getElementById("productSection").innerHTML = "";
    for (let element of products) {
      var product = document.createElement("div");
      var tag = element["tags"] + ",";
      product.innerHTML = buildProductHtml(
        element["name"],
        element["path"],
        tag
      );
      document.getElementById("productSection").appendChild(product);
    }
  }
  
  async function populateData(callback=undefined) {
    const response = (
      await fetch("https://raw.githubusercontent.com/BobuDragos/tW-MeoW/main/animals.txt", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    )
      .json().then((data) => {
        showProducts(data["products"]);
        console.log("mata");
        if (callback !== undefined) {
          callback();
        }
      });
  }