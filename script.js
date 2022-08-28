$(document).ready(() => {
  let a = 0;
  let b = 0;
  let c = 0;
  let som = 0;
  let max = 0;
  let containerKeuze = "";
  let arrayBolIds = [];
  let smaakArray = [];
  let newIjsje;
  let cart = [];
  let prijs = 0;
  let tempArr = []; //altijd type "[]" zetten bij het initialiseren van een array!

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
    containerKeuze = "hoorntje";
    $("#bol0").show();
    $("#bol1").show();
    $("#bol2").show();
    $("#bol3").hide();
    $("#bol4").hide();
  });

  $("#potje").on("click", () => {
    max = 5;
    containerKeuze = "potje";
    $("#bol0").show();
    $("#bol1").show();
    $("#bol2").show();
    $("#bol3").show();
    $("#bol4").show();
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
    if (som === 0 || containerKeuze == false) {
      alert("Je bent iets vergeten in te vullen in het formulier!");
    } else if (som > max) {
      alert(
        "Maximum " + max + " bolletjes ijs voor een " + containerKeuze + "!"
      );
    } else {
      //document.querySelector("#prijs").innerHTML = prijs;

      if (containerKeuze === "hoorntje") {
        $("#hoorntjeDisplay").show();
      } else if (containerKeuze === "potje") {
        $("#potjeDisplay").show();
      }

      createIjsjeObject();
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
    if (som > max && containerKeuze != "") {
      $("#waarschuwing").show();
    } else {
      $("#waarschuwing").hide();
    }

    setTimeout(containerActualValueCheck, 50);
  }

  function clearDisplay() {
    $("#bol0").css("background-color", "transparent");
    $("#bol1").css("background-color", "transparent");
    $("#bol2").css("background-color", "transparent");
    $("#bol3").css("background-color", "transparent");
    $("#bol4").css("background-color", "transparent");
    $("#bol0").css("box-shadow", "none");
    $("#bol1").css("box-shadow", "none");
    $("#bol2").css("box-shadow", "none");
    $("#bol3").css("box-shadow", "none");
    $("#bol4").css("box-shadow", "none");
    $("#potjeDisplay").css("display", "none");
    $("#hoorntjeDisplay").css("display", "none");

    a = 0;
    b = 0;
    c = 0;
    containerKeuze = "";
    smaakArray = [];
    arrayBolIds = [];
  }

  function createArrayBolIds() {
    for (let i = 0; i < smaakArray.length; i++) {
      let bolId = "#bol" + i;
      arrayBolIds.push(bolId);
    }

    return arrayBolIds;
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

  function createIjsjeObject() {
    return {
      _smaakArray: [],
      set smaakArray(val) {
        this._smaakArray = val;
      },
      get smaakArray() {
        return this._smaakArray;
      },
      _bolArray: [],
      set bolArray(val) {
        this._bolArray = val;
      },
      get bolArray() {
        return this._bolArray;
      },
      _container: "",
      set container(val) {
        this._container = val;
      },
      get container() {
        return this._container;
      },
    };
  }

  function ijsScheppen() {
    newIjsje = createIjsjeObject();
    newIjsje.smaakArray = createSmaakArray();
    newIjsje.bolArray = createArrayBolIds();
    newIjsje.container = containerKeuze;

    for (let i = 0; i < newIjsje.bolArray.length; i++) {
      let smaak = eval(newIjsje.smaakArray[i]); //is eval() wel een goed idee?
      $(arrayBolIds[i]).css("background-color", smaak.kleurcode);
      $(arrayBolIds[i]).css("box-shadow", "1px 1px inset rgba(0, 0, 0, 0.733");
    }
  }

  function addToCart() {
    //aos fade-left toevoegen on click?

    cart.push(newIjsje);

    for (let i = 0; i < newIjsje.bolArray.length; i++) {
      let bolCartId = "#bolCart" + i;
      tempArr.push(bolCartId);
    }

    clearDisplay();

    /*
    for (const [key, value] of Object.entries(cart[0])) {
      alert(`${key} = ${value}`);
    }
    */
  }

  function displayCartItem() {
    let currentCartItem = cart[0];
    for (let i = 0; i < currentCartItem.bolArray.length; i++) {
      let smaak = eval(currentCartItem.smaakArray[i]); //is eval() wel een goed idee?
      $(tempArr[i]).css("background-color", smaak.kleurcode);
      $(tempArr[i]).css("box-shadow", "1px 1px inset rgba(0, 0, 0, 0.733");
    }
  }
});
