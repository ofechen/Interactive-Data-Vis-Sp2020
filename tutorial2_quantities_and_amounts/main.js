  
// data load
// reference for d3.autotype: https://github.com/d3/d3-dsv#autoType
d3.csv("iowa_results.csv", d3.autoType).then(data => {
    console.log(data);
  
    /** CONSTANTS */
    // constants help us reference the same values throughout our code
    const width = window.innerWidth * 0.9,
      height = window.innerHeight / 2,
      paddingInner = 0.2,
      margin = { top: 20, bottom: 40, left: 40, right: 100 }
      min_rect_width = 1
      Label_width = 40
      maxDelegates = d3.max(data, d=>d.Delegates);
  
    /** SCALES */
    // reference for d3.scales: https://github.com/d3/d3-scale
    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.Candidate))
      .range([margin.top, height-margin.bottom])
      .paddingInner(paddingInner);
  
    const xScale = d3
      .scaleLinear()
      .domain([0, maxDelegates])
      .range([margin.left, width-margin.right]);
  
    const blues = d3
    .scaleOrdinal(d3.schemeBlues[6])
    .domain(data.map(d => d.Candidate).reverse())
    //.range(d3.schemeBlues[1],d3.schemeBlues[9])

    // reference for d3.axis: https://github.com/d3/d3-axis
    const yAxis = d3.axisLeft(yScale).ticks(data.length);
    const xAxis = d3.axisBottom(xScale).ticks(maxDelegates);
  
    /** MAIN CODE */
    const svg = d3
      .select("#d3-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // append rects
    const rect = svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("y", d => yScale(d.Candidate))
      .attr("x", d => margin.left+Label_width+min_rect_width)
      .attr("height", yScale.bandwidth())
      .attr("width", d => xScale(d.Delegates)-margin.left+1)
      .attr("fill", d => blues(d.Candidate))
  
    // append text
    const text = svg
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("class", "label")
      // this allows us to position the text in the center of the bar
      .attr("y", d => yScale(d.Candidate) + (yScale.bandwidth() / 2))
      .attr("x", d => xScale(d.Delegates))
      .text(d => d.Delegates)
      .attr("dy", "0.3em")
      .attr("dx",d => (width-margin.left-Label_width)/xScale(d.Delegates)+min_rect_width+Label_width);
  
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${2*Label_width}, 0)`)
      .call(yAxis);
    
    svg.append("g")
    .attr("class","axis")
    .attr("transform",`translate(${Label_width}, ${height-margin.bottom})`)
    .call(xAxis)
  });