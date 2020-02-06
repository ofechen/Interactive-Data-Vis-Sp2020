d3.csv("Dataset.csv").then(data => {
    console.log("data", data);

    const table = d3.select("#d3-table");

    const thead = table.append("thead");
    thead.append("tr").append("th").attr("colspan", "7").text("The numbers I came up with by myself");

    thead.append("tr").selectAll(data.columns).join("td").text (d => d);

    const rows = table.append("tbody").selectAll("tr").data(data).join("tr");
    
    rows.selectAll("td").data(d => Object.values(d)).join("td").attr("class", d => +d > 1000 ? 'high' : null).text(d => d);

})