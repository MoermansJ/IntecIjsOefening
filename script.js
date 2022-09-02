//The code written below is far from perfect and can be optimised in various aspects, which I will not be doing.
//This being my first project assignment it will serve as a point of reference as I grow and develop my skills as a web developer.

$(document).ready(() => {
  let a = 0;
  let b = 0;
  let c = 0;
  let som = 0;
  let max = 0;
  let containerKeuze = "";
  let smaakArray = [];
  let newIjsje;
  let cart = [];
  let prijs = 0;
  let geschept = false;

  containerActualValueCheck();

  const vanille = {
    _naam: "vanille",
    _kleurcode: "rgb(243, 229, 171)",
    get kleurcode() {
      return this._kleurcode;
    },
    _prijs: 1.0,
    get prijs() {
      return this._prijs;
    },
  };

  const chocolade = {
    _naam: "chocolade",
    _kleurcode: "rgb(123, 63, 0)",
    get kleurcode() {
      return this._kleurcode;
    },
    _prijs: 1.0,
    get prijs() {
      return this._prijs;
    },
  };

  const aardbei = {
    _naam: "aardbei",
    _kleurcode: "rgb(200, 63, 73)",
    get kleurcode() {
      return this._kleurcode;
    },
    _prijs: 1.0,
    get prijs() {
      return this._prijs;
    },
  };

  $("#hoorntje").on("click", () => {
    max = 3;
    $("#bolSet0-0").show();
    $("#bolSet0-1").show();
    $("#bolSet0-2").hide();
    $("#bolSet0-3").show();
    $("#bolSet0-4").hide();
  });

  $("#potje").on("click", () => {
    max = 5;
    $("#bolSet0-0").show();
    $("#bolSet0-1").show();
    $("#bolSet0-2").show();
    $("#bolSet0-3").show();
    $("#bolSet0-4").show();
  });

  $("#vanille").click(() => {
    if ($(this).is(":checked")) {
      $("#vanilleinput").toggle();
    } else {
      $("#vanilleinput").toggle();
      a -= parseInt(document.getElementById("vanilleinput").value); //vermindert bolletjes ijs als je uncheckt
      document.getElementById("vanilleinput").value = ""; // reset de waarde van aantal bolletjes op "" als je uitvinkt
    }
  });

  $("#chocolade").click(() => {
    if ($(this).is(":checked")) {
      $("#chocoladeinput").toggle();
    } else {
      $("#chocoladeinput").toggle();
      b -= parseInt(document.getElementById("chocoladeinput").value);
      document.getElementById("chocoladeinput").value = "";
    }
  });

  $("#aardbei").click(() => {
    if ($(this).is(":checked")) {
      $("#aardbeiinput").toggle();
    } else {
      $("#aardbeiinput").toggle();
      c -= parseInt(document.getElementById("aardbeiinput").value);
      document.getElementById("aardbeiinput").value = "";
    }
  });

  $("#vanilleinput").on("change", () => {
    a = parseInt(document.getElementById("vanilleinput").value);
  });

  $("#chocoladeinput").on("change", () => {
    b = parseInt(document.getElementById("chocoladeinput").value);
  });

  $("#aardbeiinput").on("change", () => {
    c = parseInt(document.getElementById("aardbeiinput").value);
  });

  $("#ok").on("click", () => {
    som = a + b + c;

    if (som > max) {
      alert(
        "Maximum " + max + " bolletjes ijs voor een " + containerKeuze + "!"
      );
    } else {
      ijsScheppen();
    }
  });

  $("#clear").on("click", () => {
    clearDisplay();
  });

  $("#toevoegen").on("click", () => {
    if (geschept == true) {
      $("#backerCart").removeClass("fade");
      addToCart();
      updateTotalCartPrice();
      displayCartItem();
    }
  });

  function containerActualValueCheck() {
    //checkt actuele containerwaarde elke 50ms
    let som = a + b + c;
    if (som > max || containerKeuze != "") {
      $("#waarschuwing").show();
      $("#ijsKnopGroen").css("filter", "saturate(0)");
      $("#ok").css("filter", "saturate(0)");
    } else {
      $("#waarschuwing").hide();
      $("#ijsKnopGroen").css("filter", "");
      $("#ok").css("filter", "");
    }

    if (geschept == true) {
      $("#ijsKnopBlauw").css("filter", "");
      $("#toevoegen").css("filter", "");
    } else if (geschept == false) {
      $("#ijsKnopBlauw").css("filter", "saturate(0)");
      $("#toevoegen").css("filter", "saturate(0)");
      $("#toevoegen").css("disabled", "true");
    }

    setTimeout(containerActualValueCheck, 50);
  }

  function clearDisplay() {
    $("#bolSet0-0").css("background-color", "transparent");
    $("#bolSet0-0").css("box-shadow", "none");
    $("#bolSet0-1").css("background-color", "transparent");
    $("#bolSet0-1").css("box-shadow", "none");
    $("#bolSet0-2").css("background-color", "transparent");
    $("#bolSet0-2").css("box-shadow", "none");
    $("#bolSet0-3").css("background-color", "transparent");
    $("#bolSet0-3").css("box-shadow", "none");
    $("#bolSet0-4").css("background-color", "transparent");
    $("#bolSet0-4").css("box-shadow", "none");
    $("#potjeDisplay").css("display", "none");
    $("#hoorntjeDisplay").css("display", "none");
    $("input[type=checkbox]").prop("checked", false);
    $("input[type=radio]").prop("checked", false);
    $("input[type=number]").hide();

    a = 0;
    b = 0;
    c = 0;
    containerKeuze = "";
    smaakArray = [];
    arrayBolIds = [];
    createIjsjeObject([], "");
    geschept = false;
  }

  function createSmaakArray() {
    let i;
    for (i = 0; i < a; i++) {
      smaakArray.push("vanille");
    }
    for (i = 0; i < b; i++) {
      smaakArray.push("chocolade");
    }
    for (i = 0; i < c; i++) {
      smaakArray.push("aardbei");
    }

    return smaakArray;
  }

  function getContainerKeuze() {
    return document.querySelector('input[name="container"]:checked').value;
  }

  function createIjsjeObject(SArr, Ck) {
    return {
      _smaakArray: SArr,
      set smaakArray(val) {
        this._smaakArray = val;
      },
      get smaakArray() {
        return this._smaakArray;
      },
      _container: Ck,
      set container(val) {
        this._container = val;
      },
      get container() {
        return this._container;
      },
    };
  }

  function ijsScheppen() {
    newIjsje = createIjsjeObject(createSmaakArray(), getContainerKeuze());

    if (newIjsje.container != "" && som != 0) {
      geschept = true;

      for (let i = 0; i < newIjsje.smaakArray.length; i++) {
        let bolId = "#bolSet0" + "-" + i;
        let smaak = eval(newIjsje.smaakArray[i]);
        if (i == 2 && newIjsje.container == "hoorntje") {
          $("#bolSet0-3").css("background-color", smaak.kleurcode);
          $("#bolSet0-3").css(
            "box-shadow",
            "1px 1px inset rgba(0, 0, 0, 0.733"
          );
        } else {
          $(bolId).css("background-color", smaak.kleurcode);
          $(bolId).css("box-shadow", "1px 1px inset rgba(0, 0, 0, 0.733");
        }
      }

      let containerDisplay = "#" + newIjsje.container + "Display";
      $(containerDisplay).show();

      for (let i = 0; i < newIjsje.smaakArray.length; i++) {
        let smaak = eval(newIjsje.smaakArray[i]);
        prijs += smaak.prijs;
      }
    }
  }
  function updateTotalCartPrice() {
    let priceDisplay = document.querySelector("#price");
    priceDisplay.innerHTML = "Totaal €" + prijs.toFixed(2);
    priceDisplay.addClass("centerText");
  }

  function addToCart() {
    let cartIndex = cart.length;
    cart.push(newIjsje);

    let cartRow = document.createElement("div");
    let cartDisplay = document.querySelector(".cartDisplay");
    let cartRowContents = "";

    if (cart[cartIndex].container == "hoorntje") {
      cartRowContents = `    
      <div class="ijsjeCartDisplay">
        <div class="ijsjeRowTop">
          <div class="bolCartSet" id="bolCartSet${cartIndex}-2"></div>
        </div>
        <div class="ijsjeRowBottom">      
          <div class="bolCartSet" id="bolCartSet${cartIndex}-0"></div>
          <div class="bolCartSet" id="bolCartSet${cartIndex}-1"></div>
        </div>

        <div class="containerCartDisplay">
          <img src="img/hoorntje.png" id="hoorntjeCart${cartIndex}Display" class="hoorntjeCartDisplay">
        </div>
      </div>`;
    } else {
      cartRowContents = `    
      <div class="ijsjeCartDisplay">
        <div class="ijsjeRowTop">
          <div class="bolCartSet" id="bolCartSet${cartIndex}-3"></div>
          <div class="bolCartSet" id="bolCartSet${cartIndex}-4"></div>
        </div>
        <div class="ijsjeRowBottom">      
          <div class="bolCartSet" id="bolCartSet${cartIndex}-0"></div>
          <div class="bolCartSet" id="bolCartSet${cartIndex}-1"></div>
          <div class="bolCartSet" id="bolCartSet${cartIndex}-2"></div>
        </div>
      </div>
      <div class="containerCartDisplay">
        <img src="img/${cart[cartIndex].container}.png" id="${cart[cartIndex].container}Cart${cartIndex}Display" class="${cart[cartIndex].container}CartDisplay">
      </div>`;
    }

    cartRow.innerHTML = cartRowContents;
    cartDisplay.append(cartRow);
    cartRow.classList.add("cartRow");

    for (let i = 0; i < cart.length; i++) {
      let currentCartItem = cart[i];

      for (let j = 0; j < currentCartItem.smaakArray.length; j++) {
        let bolId = "#bolCartSet" + i + "-" + j;
        let smaak = eval(currentCartItem.smaakArray[j]);
        $(bolId).css("background-color", smaak.kleurcode);
        $(bolId).css("box-shadow", "1px 1px inset rgba(0, 0, 0, 0.733");
      }
    }

    clearDisplay();
  }
});

/*
  for (const [key, value] of Object.entries(cart[i])) {
        alert(`${key} = ${value}`);
      }


for (let i = 0; i < smaakArray.length; i++) {
  let bolId = "#bolSet0" + "-" + i;
  arrayBolIds.push(bolId);
}

for (const [key, value] of Object.entries(cart[0])) {
  alert(`${key} = ${value}`);
}
*/

/*
    //code om HTML tags aan te maken van de items in cart
    let cartRow = document.createElement("div");
    let cartDisplay = document.querySelector(".cartDisplay");
    let cartRowContents = `    
    <div class="ijsjeDisplay">
    <div class="ijsjeRowBottom">
    `;

    for (let i = 0; i < cart.length; i++) {
      let currentCartItem = cart[i];

      for (let j = 0; j < currentCartItem.smaakArray.length; j++) {
        cartRowContents += `<div class="bolCartSet" id="bolCartSet${cartIndex}-${j}"></div>`;
      }
    }

    cartRowContents += `
    </div>
    </div>
    <div class="containerCartDisplay">
    <img src="img/${cart[cartIndex].container}.png" id="${cart[cartIndex].container}Cart${cartIndex}Display" class="${cart[cartIndex].container}CartDisplay">
    </div>`;

    cartRow.innerHTML = cartRowContents;
    cartDisplay.append(cartRow);
    cartRow.classList.add("cartDisplay");

    //code voor bolletjes in cart te printen
    for (let i = 0; i < cart.length; i++) {
      let currentCartItem = cart[i];

      for (let j = 0; j < currentCartItem.smaakArray.length; j++) {
        let bolId = "#bolCartSet" + i + "-" + j;
        let smaak = eval(currentCartItem.smaakArray[j]);
        $(bolId).css("background-color", smaak.kleurcode);
        $(bolId).css("box-shadow", "1px 1px inset rgba(0, 0, 0, 0.733");
      }
    }
    */

/*
        if (cart[cartIndex].container == "hoorntje") {
      cartRowContents = `    
      <div class="ijsjeCartDisplay">
        <div class="ijsjeCartRowTop">
          <div class="bolCartSet" id="bolCartSet${cartIndex}-2"></div>
        </div>
        <div class="ijsjeCartRowBottom">      
          <div class="bolCartSet" id="bolCartSet${cartIndex}-0"></div>
          <div class="bolCartSet" id="bolCartSet${cartIndex}-1"></div>
        </div>

        <div class="containerCartDisplay">
          <img src="img/${cart[cartIndex].container}.png" id="${cart[cartIndex].container}Cart${cartIndex}Display" class="${cart[cartIndex].container}CartDisplay">
        </div>
      </div>`;
    } else {
      cartRowContents = `    
      <div class="ijsjeCartDisplay">
        <div class="ijsjeCartRowTop">
          <div class="bolCartSet" id="bolCartSet${cartIndex}-3"></div>
          <div class="bolCartSet" id="bolCartSet${cartIndex}-4"></div>
        </div>
        <div class="ijsjeCartRowBottom">      
          <div class="bolCartSet" id="bolCartSet${cartIndex}-0"></div>
          <div class="bolCartSet" id="bolCartSet${cartIndex}-1"></div>
          <div class="bolCartSet" id="bolCartSet${cartIndex}-2"></div>
        </div>
      </div>
      <div class="containerCartDisplay">
        <img src="img/${cart[cartIndex].container}.png" id="${cart[cartIndex].container}Cart${cartIndex}Display" class="${cart[cartIndex].container}CartDisplay">
      </div>`;
    }
    */
