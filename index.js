document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const startDate = document.getElementById("start_date").value;
    const endDate = document.getElementById("end_date").value;
    const resultsTable = document.createElement("table"); 
    const resultsSection = document.getElementById("results");

    try {
      const response = await fetch(
        `/api?start_date=${startDate}&end_date=${endDate}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
      }
      const data = await response.json();

      // Limpa a seção de resultados antes de exibir a nova tabela
      resultsSection.innerHTML = "";

      const tableHeader = `
        <table class="table table-light">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Quant.</th>
              <th>Entrada</th>
              <th>Saída</th>
           </tr>
          </thead>
          <tbody>
      `;
      resultsTable.innerHTML = tableHeader;

      data.forEach((item, i) => {
        const entrada = new Date(item.datalote).toLocaleDateString("pt-BR"); 
        const saida = new Date(item.datavenda).toLocaleDateString("pt-BR"); 
        const row = `
          <tr class="${i % 2 === 0 ? 'odd' : 'even'}">
            <td class='lista'>${item.id}</td>
            <td class='lista'>${item.item}</td>
            <td class='lista'>${item.quant}</td>
            <td class='lista'>${entrada}</td>
            <td class='lista'>${saida}</td>
         </tr>
        `;
        resultsTable.innerHTML += row;
      });

      resultsTable.innerHTML += `</tbody></table>`;
      resultsSection.appendChild(resultsTable);

    } catch (error) {
      console.error(error);
      resultsSection.textContent = "Erro ao buscar os dados";
    }
  });
