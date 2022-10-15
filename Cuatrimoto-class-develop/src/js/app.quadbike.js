//const API_URL = "http://localhost:8081/api/";
const API_URL = "http://193.122.145.65:8080/api/";

function getQuadbike() {
  //elemento del DOM->document object model
  $.ajax({
    url: `${API_URL}Quadbike/all`,
    type: "GET",
    datatype: "JSON",
    success: renderQuadbike,
  });
}

function renderQuadbike(response) {
  const $responseContainer = document.getElementById("response");
  $responseContainer.innerHTML='';
  for (let x = 0; x < response.length; x++) {
    const row = response[x];
    $responseContainer.innerHTML += `
    <tr>
        <td>
            ${row.id}
        </td>
        <td>
            ${row.name}
        </td>
        <td>
            ${row.description}
        </td>
        <td>
            ${row.brand}
        </td>
        <td>
            ${row.year}
        </td>
        <td>
            <button onclick="renderQuadbikeToUpdate(${row.id},'${row.name}','${row.description}','${row.brand}',${row.year},${row.category?.id})">Actualizar</button>
        </td>
        <td>
            <button onclick="deleteQuadbike(${row.id})">Eliminar</button>
        </td>
    </tr>
        `;
  }
}

function createQuadbike() {
  let dataToSend = {
    name: $("#name").val(),
    description: $("#description").val(),
    brand: $("#brand").val(),
    year: parseInt($("#year").val()),
    category: {
      id: parseInt($("#category").val()),
    },
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Quadbike/save`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Quadbike registrada correctamente");
    $("#name").val("");
    $("#description").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#category").val("");
  });
}

function updateQuadbike() {
  let dataToSend = {
    name: $("#name").val(),
    description: $("#description").val(),
    brand: $("#brand").val(),
    year: parseInt($("#year").val()),
    id:parseInt($("#id").val())
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Quadbike/update`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Quadbike actualizada correctamente");
    $("#id").val("");
    $("#name").val("");
    $("#description").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#category").val("");
    getQuadbike()
  });
}

function renderQuadbikeToUpdate(id, name, description, brand, year, category) {
  $("#id").val(id);
  $("#name").val(name);
  $("#brand").val(brand);
  $("#year").val(year);
  $("#description").val(description);
  $("#category").val(category);
}

function deleteQuadbike(id) {
  const settings = {
    url: `${API_URL}Quadbike/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  };

  $.ajax(settings).done(function (response) {
    alert("Quadbike eliminado correctamente");
  });
}

getQuadbike();
