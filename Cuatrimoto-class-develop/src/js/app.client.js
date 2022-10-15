//const API_URL = "http://localhost:8081/api/";
const API_URL = "http://193.122.145.65:8080/api/";

function getAllClients() {
  //elemento del DOM->document object model
  $.ajax({
    url: `${API_URL}Client/all`,
    type: "GET",
    datatype: "JSON",
    success: renderClient,
  });
}

function renderClient(response) {
  const $responseContainer = document.getElementById("response");
  $responseContainer.innerHTML = "";
  for (let x = 0; x < response.length; x++) {
    const row = response[x];
    $responseContainer.innerHTML += renderCard(
      row.name,
      row.email,
      row.age,
      row.idClient,
      row.password
    );
  }
}

function renderCard(name, email, age, id,password) {
  return `
  <div class="card">
      <h1>${name}</h1>
      <p class="price">${age}</p>
      <p>
      ${email}
      </p>
      <p><button onclick="renderClientToUpdate(${id},'${name}','${email}',${age},'${password}')">Actualizar</button></p>
      <p><button onclick="deleteClient(${id})" >Borrar</button></p>
    </div>
  `;
}

function createClient() {
  let dataToSend = {
    name: $("#name").val(), //obtengo el valor que tiene el campo de texto id="name"
    email: $("#email").val(),
    idClient: parseInt($("#id").val()),
    password: $("#password").val(),
    age: parseInt($("#age").val()),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Client/save`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Client registrada correctamente");
    $("#name").val(""); //limpio el valor que tenga el campo de texto
    $("#description").val("");
    getAllClients();
  });
}

function updateClient() {
  let dataToSend = {
    name: $("#name").val(),
    email: $("#email").val(),
    idClient: parseInt($("#id").val()),
    password: $("#password").val(),
    age: parseInt($("#age").val()),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Client/update`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Client actualizada correctamente");
    $("#name").val()
    $("#email").val(),
    $("#id").val()
    $("#password").val()
    $("#age").val()
    getAllClients();
  });
}

function renderClientToUpdate(id, name, email,age,password) {
  $("#id").val(id); //seteo el valor que tendrá el campo de texto
  $("#name").val(name);
  $("#email").val(email);
  $("#password").val(password);
  $("#age").val(age);    
}

function deleteClient(id) {
  const settings = {
    url: `${API_URL}Client/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  };

  $.ajax(settings)
    .done(function (response) {
      alert("Client eliminado correctamente");
      getAllClients();
    })
    .fail(function (response) {
      console.log(response.responseText);
      alert("algo falló");
    });
}

getAllClients();
