$(document).ready(() => {
  let a = 0;
  let b = 0;
  let c = 0;
  let max = 0;
  let containerKeuze = "";
  let ijsje = [];
  let prijs = 0;

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
    let som = a + b + c;
    if (som === 0 && containerKeuze == false) {
      alert("Je bent iets vergeten in te vullen in het formulier!");
    } else if (som > max) {
      alert(
        "Maximum " + max + " bolletjes ijs voor een " + containerKeuze + "!"
      );
    } else {
      let i = 0;
      for (i = 0; i < a; i++) {
        ijsje.push("vanille");
        prijs += vanille.prijs;
      }
      for (i = 0; i < b; i++) {
        ijsje.push("chocolade");
      }
      for (i = 0; i < c; i++) {
        ijsje.push("aardbei");
      }
      document.querySelector("#prijs").innerHTML = prijs;

      ijsScheppen();
    }
  });

  $("#clear").on("click", () => {
    clearDisplay();
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
  containerActualValueCheck();

  function ijsScheppen() {
    let arrayBolIds = [];

    for (let i = 0; i <= ijsje.length; i++) {
      let bolId = "#bol" + i;
      arrayBolIds.push(bolId);

      let smaak = eval(ijsje[i]); //is eval() wel een goed idee?
      $(arrayBolIds[i]).css("background-color", smaak.kleurcode);
      $(arrayBolIds[i]).css("box-shadow", "1px 1px inset rgba(0, 0, 0, 0.733");
    }
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

    ijsje = [];
  }
});
