let quoationData = [];

function addItem() {
  let description = document.getElementById("newItemDescription").value;
  let quantity = parseFloat(document.getElementById("newItemQty").value);
  let unitPrice = parseFloat(document.getElementById("newItemPPU").value);
  
  if (!description || quantity <= 0 || unitPrice <= 0) {
    alert("Please fill out all fields correctly.");
    return;
  }

  quoationData.push({ description, quantity, unitPrice });
  $('#exampleModal').modal('hide');
  renderTable();
}

function deleteItem(index) {
  quoationData.splice(index, 1);
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector("tbody");
  document.querySelectorAll(".data-row").forEach(e => e.remove());

  let subTotal = 0;
  quoationData.forEach((item, i) => {
    let amount = item.quantity * item.unitPrice;
    subTotal += amount;
    let row = `
      <tr class="data-row">
        <td class="text-center">${item.quantity}</td>
        <td>
          <button onclick="deleteItem(${i})" class="btn btn-sm btn-danger">X</button>
          ${item.description}
        </td>
        <td class="text-right">${item.unitPrice.toFixed(2)}</td>
        <td class="text-right">${amount.toFixed(2)}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", row);
  });

  document.getElementById("subTotal").innerText = subTotal.toFixed(2);
  document.getElementById("vat").innerText = (subTotal * 0.07).toFixed(2);
  document.getElementById("total").innerText = (subTotal * 1.07).toFixed(2);
}

$(document).ready(function () {
  if (window.location.pathname.includes("index2.html")) {
    $.getJSON("data/data.json", data => {
      quoationData = data;
      renderTable();
    });
  }
});