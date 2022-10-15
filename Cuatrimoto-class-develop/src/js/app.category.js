const API_URL = "http://localhost:8081/api/";

function getAllCategories() {
  //elemento del DOM->document object model
  $.ajax({
    url: `${API_URL}Category/all`,
    type: "GET",
    datatype: "JSON",
    success: renderCategory,
  });
}

function renderCategory(response) {
  const $responseContainer = document.getElementById("response");
  $responseContainer.innerHTML = "";
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
            <button onclick="renderCategoryToUpdate(${row.id},'${row.name}','${row.description}')">Actualizar</button>
        </td>
        <td>
            <button onclick="deleteCategory(${row.id})">Eliminar</button>
        </td>
    </tr>
        `;
  }
}

function createCategory() {
  let dataToSend = {
    name: $("#name").val(), //obtengo el valor que tiene el campo de texto id="name"
    description: $("#description").val(),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Category/save`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Category registrada correctamente");
    $("#name").val(""); //limpio el valor que tenga el campo de texto
    $("#description").val("");
    getAllCategories();
  });
}

function updateCategory() {
  let dataToSend = {
    name: $("#name").val(),
    description: $("#description").val(),
    id: parseInt($("#id").val()),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Category/update`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Category actualizada correctamente");
    $("#id").val("");
    $("#name").val("");
    $("#description").val("");
    getAllCategories();
  });
}

function renderCategoryToUpdate(id, name, description) {
  $("#id").val(id); //seteo el valor que tendrá el campo de texto
  $("#name").val(name);
  $("#description").val(description);
  //$(".test").val(description);
}

function deleteCategory(id) {
  const settings = {
    url: `${API_URL}Category/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  };

  $.ajax(settings)
    .done(function (response) {
      alert("Category eliminado correctamente");
      getAllCategories();
    })
    .fail(function (response) {
      console.log(response.responseText);
      alert("algo falló");
    });
}

function addClass(){
  $(".testi").addClass("mensaje")
}

getAllCategories();
