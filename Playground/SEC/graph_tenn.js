// TO DO
// 1. change INTModYPA metric name; taking up too much space on Tooltip


// set chart width
var canvasWidth = 900;
var titleWidth = canvasWidth.toString() + "px";
var barColor = '#74ABD6';
const volsColor = '#f77f00';

// select the svg container
const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', canvasWidth)
    .attr('height', 600);

// set title container and width
document.getElementById('title').style.width=titleWidth;

// set dropdown container and width
document.getElementById('drop').style.width=titleWidth;

// create margins on dimensons
const margin = {
    top: 40, right: 40, 
    bottom: 100, left: 60
}

const graphWidth = canvasWidth - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    //es6 template string - use backticks not quotes
    .attr('transform', `translate(${margin.left},${margin.top})`)

// create x and y axis
const xAxisGroup = graph.append('g')
    // shift x axis to the bottom
    .attr('transform', `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append('g');

const qbs_csv = 'sec_qbs_2018.csv'
const qbs_csv_v2 = 'sec_qbs_2018_mod.csv'
const team_rush_csv = 'sec_team_stats_2018.csv'

// grab the data
d3.csv(qbs_csv_v2).then(data => {

    // sort data based on date object
    data.sort((a,b) => parseFloat(b.INTModYPA) - parseFloat(a.INTModYPA));

    var min = d3.min(data, d => parseFloat(d.INTModYPA));
    var max = d3.max(data, d => parseFloat(d.INTModYPA));

    var elements = Object.keys(data[0]).slice(7,40);
    var selection = elements[0];


    // create a linear scale
    var y = d3.scaleLinear()
        // domain is total scale of values
        .domain([0,max])
        // range is our new adjusted scale of values
        .range([graphHeight,0]);

    var x = d3.scaleBand()
        // cycle thru objects and take "name" key out of each item
        .domain(data.map(item => item.Player))
        // width of overall chart
        .range([0,graphWidth])
        // add padding to bars
        .paddingInner(0.2)
        .paddingOuter(0.2);

    
    // join data to rect
    var rects = graph.selectAll('rect')
        .data(data)

    // we don't use the parenthesis for x.bandwith this time
    rects.attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.INTModYPA))
        .attr('fill', d => d.TennColor)
        .attr('x', d => x(d.Player))
        .attr('y', d => y(d.INTModYPA));

    // append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.INTModYPA))
        .attr('fill', d => d.TennColor)
        .attr('x', (d,i) => x(d.Player))
        .attr('y', d => y(d.INTModYPA));



    // add tooltip
    const tip = d3.tip()
        .attr('class', 'tooltip-container')
        .html(d => {
            let content = `<div class="tooltip-left"><strong>Player: </strong><span class="tooltip-right">${d.Player}</span></div>`;
            content += `<div class="tooltip-left"><strong>Team: </strong><span class="tooltip-right">${d.TeamName}</span></div>`;
            content += `<div class="tooltip-left"><strong>Completion Rate: </strong><span class="tooltip-right">${d.CompletionPct + "%"}</span></div>`;
            content += `<div class="tooltip-left"><strong>Atts per INT: </strong><span class="tooltip-right">${d.AttemptsPerINT}</span></div>`;
            content += `<div class="tooltip-left"><strong>YPA: </strong><span class="tooltip-right">${d.YPA}</span></div>`;
            content += `<div class="tooltip-left"><strong>INT-Mod YPA: </strong><span class="tooltip-right">${d.INTModYPA}</span></div>`;
            
            return content;
        })
    
    graph.call(tip);

    // add events
    graph.selectAll('rect')
        // mouse hover event
        .on('mouseover', (d,i,n) => {
            tip.show(d, n[i])
            handleMouseOver(d,i,n);
        })
        // remove mouse hover
        .on('mouseout', (d,i,n) => {
            tip.hide();
            handleMouseOut(d,i,n);
        });


    // create and call the axes
    const xAxis = d3.axisBottom(x);
    
    const yAxis = d3.axisLeft(y)
        // add tick marks
        .ticks(5)
        .tickFormat(d => d);

    // call the axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
        .attr('fill', 'black')
        .attr('font-size', 12)
        .style('font-weight', 'bold');

    yAxisGroup.selectAll('text')
        .attr('fill', 'black')
        .attr('font-size', 12);


    // update function

    var update = (data) => {

        // sort data
        data.sort((a,b) => parseFloat(b[selection.value]) - parseFloat(a[selection.value]));

        // set new min and max
        min = d3.min(data, d => parseFloat(d[selection.value]));

        max = d3.max(data, d => parseFloat(d[selection.value]));


        // update scales (domains) if they rely on our data
        y.domain([0,max])
            .range([graphHeight,0]);

        x.domain(data.map(item => item.Player))


        // join updated data to elements
        const rects = graph.selectAll('rect').data(data);

        // remove unwanted (if any) shapes using the exit selection
        rects.exit().remove();

        // update current shapes in the dom
        rects.attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d[selection.value]))
        .attr('fill', d => d.TennColor)
        .attr('x', d => x(d.Player))
        .attr('y', d => y(d[selection.value]));



        // append the enter selection to the dom
        rects.enter()
            .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d => graphHeight - y(d[selection.value]))
            .attr('fill', d => d.TennColor)
            .attr('x', (d,i) => x(d.Player))
            .attr('y', d => y(d[selection.value]));

        // call the axes
        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);

        // update tooltip

            tip.html(d => {
                let content = `<div class="tooltip-left"><strong>Player: </strong><span class="tooltip-right">${d.Player}</span></div>`;
                content += `<div class="tooltip-left"><strong>Team: </strong><span class="tooltip-right">${d.TeamName}</span></div>`;
                content += `<div class="tooltip-left"><strong>${selection.value}: </strong><span class="tooltip-right">${d[selection.value]}</span></div>`;
                content += `<div class="tooltip-left"><strong>Completion Rate: </strong><span class="tooltip-right">${d.CompletionPct + "%"}</span></div>`;
                content += `<div class="tooltip-left"><strong>YPA: </strong><span class="tooltip-right">${d.YPA}</span></div>`;
                content += `<div class="tooltip-left"><strong>INT-Mod YPA: </strong><span class="tooltip-right">${d.INTModYPA}</span></div>`;
                
                return content;
            })

            console.log(selection.value);

        function populateTitle(){
            document.getElementById('drop_select').innerHTML = selection.value;
        }

        populateTitle();

    }


    // dropdown menu interface
    var selector = d3.select("#drop")
        .append("select")
        .attr("id","dropdown")
        .on("change", function(d){
            selection = document.getElementById("dropdown"); 
            update(data);    

        
     });

     // create menu options
     selector.selectAll("option")
        .data(elements)
        .enter().append("option")
        .attr("value", function(d){
        return d;
        })
        .text(function(d){
        return d;
        }) ;

})


// event handlers;
const handleMouseOver = (d, i, n) => {
    d3.select(n[i])
        .transition('changeSliceFill').duration(500)
            .attr('fill', d.TeamColor);
}

const handleMouseOut = (d, i, n) => {
    d3.select(n[i])
        .transition('changeSliceFill').duration(500)
            .attr('fill', d.TennColor);
}