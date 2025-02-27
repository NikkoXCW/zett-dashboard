function fetchData() {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '<p>Loading data...</p>';

    // Fetch the CSV data
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            // Parse the CSV data
            const parsedData = Papa.parse(data, {
                header: true,
                dynamicTyping: true
            });

            // Generate HTML table from parsed data
            let html = '<table>';
            html += '<thead><tr>';
            for (const header of parsedData.meta.fields) {
                html += `<th>${header}</th>`;
            }
            html += '</tr></thead>';
            html += '<tbody>';
            for (const row of parsedData.data) {
                html += '<tr>';
                for (const header of parsedData.meta.fields) {
                    html += `<td>${row[header]}</td>`;
                }
                html += '</tr>';
            }
            html += '</tbody>';
            html += '</table>';

            dataContainer.innerHTML = html;
        })
        .catch(error => {
            dataContainer.innerHTML = `<p>Error loading data: ${error.message}</p>`;
        });
}

// Initial fetch
fetchData();

// Fetch data every 60 seconds
setInterval(fetchData, 60000);
