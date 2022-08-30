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
  let bolCartIdArray = []; //altijd type "[]" zetten bij het declareren + initialiseren van een array!

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
    $("#bolSet0-2").show();
    $("#bolSet0-3").hide();
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
    /*
    if (som === 0 || containerKeuze == false) {
      alert("Je bent iets vergeten in te vullen in het formulier!");
    } else */
    if (som > max) {
      alert(
        "Maximum " + max + " bolletjes ijs voor een " + containerKeuze + "!"
      );
    } else {
      //document.querySelector("#prijs").innerHTML = prijs;

      ijsScheppen();
    }
  });

  $("#clear").on("click", () => {
    clearDisplay();
  });

  $("#toevoegen").on("click", () => {
    addToCart();
    displayCartItem();
  });

  function containerActualValueCheck() {
    //checkt actuele containerwaarde elke 50ms
    let som = a + b + c;
    if (som > max || containerKeuze != "") {
      $("#waarschuwing").show();
    } else {
      $("#waarschuwing").hide();
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

    a = 0;
    b = 0;
    c = 0;
    containerKeuze = "";
    smaakArray = [];
    arrayBolIds = [];
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

    for (let i = 0; i < newIjsje.smaakArray.length; i++) {
      let bolId = "#bolSet0" + "-" + i;
      let smaak = eval(newIjsje.smaakArray[i]);
      $(bolId).css("background-color", smaak.kleurcode);
      $(bolId).css("box-shadow", "1px 1px inset rgba(0, 0, 0, 0.733");
    }

    let containerDisplay = "#" + newIjsje.container + "Display";
    $(containerDisplay).show();
  }

  function addToCart() {
    let cartIndex = cart.length;
    cart.push(newIjsje);

    let cartRow = document.createElement("div");
    let cartDisplay = document.querySelector(".cartDisplay");
    let cartRowContents = `    
      <div class="ijsjeDisplay">
        <div class="ijsjeRowBottom">
          <div class="bolCartSet" id="bolCartSet${cartIndex}-0"></div>
          <div class="bolCartSet" id="bolCartSet${cartIndex}-1"></div>
          <div class="bolCartSet" id="bolCartSet${cartIndex}-3"></div>
        </div>
        <div class="ijsjeRowTop">
         <div class="bolCartSet" id="bolCartSet${cartIndex}-2"></div>
         <div class="bolCartSet" id="bolCartSet${cartIndex}-4"></div>
        </div>
      </div>

      <div class="containerCartDisplay">
        <img src="img/hoorntje.png" id="hoorntjeCart${cartIndex}Display" class="hoorntjeCartDisplay">
        <img src="img/potje.png" id="potjeCart${cartIndex}Display" class="potjeCartDisplay">
      </div>`;

    cartRow.innerHTML = cartRowContents;
    cartDisplay.append(cartRow);
    cartRow.classList.add("cartDisplay");

    //code voor bolletjes in cart te printen
    bolCartIdArray = [];

    for (let i = 0; i < cart.length; i++) {
      let currentCartItem = cart[i];

      for (let j = 0; j < currentCartItem.smaakArray.length; j++) {
        let bolId = "#bolCartSet" + i + "-" + j;
        let smaak = eval(currentCartItem.smaakArray[j]);
        $(bolId).css("background-color", smaak.kleurcode);
        $(bolId).css("box-shadow", "1px 1px inset rgba(0, 0, 0, 0.733");
      }
    }

    //code voor hoorntje/potje in cart te printen
    let a = "#hoorntjeCart" + cartIndex + "Display";
    let b = "#potjeCart" + cartIndex + "Display";

    $(a).hide();
    $(b).hide();

    if (cart[cartIndex].container == "hoorntje") {
      $(a).show();
    } else {
      $(b).show();
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
