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
  let bolCartIdArray = []; //altijd type "[]" zetten bij het declareren + initialiseren van een array!
  let bolSet = 0;

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

  function createArrayBolIds() {
    for (let i = 0; i < smaakArray.length; i++) {
      let bolId = "#bolSet" + bolSet + "-" + i;
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

  function getContainerKeuze() {
    return document.querySelector('input[name="container"]:checked').value;
  }

  function createIjsjeObject(SArr, BArr, Ck) {
    return {
      _smaakArray: SArr,
      set smaakArray(val) {
        this._smaakArray = val;
      },
      get smaakArray() {
        return this._smaakArray;
      },
      _bolArray: BArr,
      set bolArray(val) {
        this._bolArray = val;
      },
      get bolArray() {
        return this._bolArray;
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
    newIjsje = createIjsjeObject(
      createSmaakArray(),
      createArrayBolIds(),
      getContainerKeuze()
    );

    for (let i = 0; i < newIjsje.bolArray.length; i++) {
      let smaak = eval(newIjsje.smaakArray[i]); //is eval() wel een goed idee?
      $(arrayBolIds[i]).css("background-color", smaak.kleurcode);
      $(arrayBolIds[i]).css("box-shadow", "1px 1px inset rgba(0, 0, 0, 0.733");
    }

    let containerDisplay = "#" + newIjsje.container + "Display";
    $(containerDisplay).show();
  }

  function addToCart() {
    //aos fade-left toevoegen on click?

    cart.push(newIjsje);

    for (let i = 0; i < newIjsje.bolArray.length; i++) {
      let bolCartId = "#bolSet1-" + i; //bolSet dynamisch maken!!
      bolCartIdArray.push(bolCartId);
    }

    clearDisplay();

    let containerCartDisplay = "#" + newIjsje.container + "CartDisplay";
    $(containerCartDisplay).show();

    /*
    for (const [key, value] of Object.entries(cart[0])) {
      alert(`${key} = ${value}`);
    }
    */
  }

  function displayCartItem() {
    let currentCartItem = cart[0];
    for (let i = 0; i < currentCartItem.bolArray.length; i++) {
      let smaak = eval(currentCartItem.smaakArray[i]);
      $(bolCartIdArray[i]).css("background-color", smaak.kleurcode);
      $(bolCartIdArray[i]).css(
        "box-shadow",
        "1px 1px inset rgba(0, 0, 0, 0.733"
      );
    }
  }
});
