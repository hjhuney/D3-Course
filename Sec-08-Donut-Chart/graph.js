// dimensions
const dims = { height: 300, width: 300, radius: 150 };

// center
const cent = { x: (dims.width / 2 + 5), y: (dims.width / 2 + 5)};

// svg container
const svg = d3.select('.canvas')
    .append('svg')
    // add 150 px on right for legend
    .attr('width', dims.width + 150)
    // 150 extra pixels on bottom for "breathing room"
    .attr('height', dims.height + 150)

const graph = svg.append('g')
    .attr('transform', `translate(${cent.x}, ${cent.y})`);

// pie generator
const pie = d3.pie()
    // don't want it to automatically resort data
    .sort(null)
    .value(d => d.cost);

// // dummy data
// const angles = pie([
//     { name: 'rent', cost: 500 },
//     { name: 'bills', cost: 300 },
//     { name: 'gaming', cost: 200 }
// ]);

// create arc path
const arcPath = d3.arc()
    .outerRadius(dims.radius)
    .innerRadius(dims.radius / 2);

// ordinal scale
const color = d3.scaleOrdinal(d3['schemeSet3']);

// update function

const update = (data) => {

    // update color scale domain
    color.domain(data.map(d => d.name));

    // join enhanced (pie) data to path elements
    const paths = graph.selectAll('path')
        .data(pie(data));

    paths.enter()
        .append('path')
            .attr('class', 'arc')
            .attr('d', arcPath)
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)
            // fill color defined by color scale above
            .attr('fill', d => color(d.data.name));

}

// data array and firestore
var data = [];

db.collection('expenses').orderBy('cost').onSnapshot(res => {

    res.docChanges().forEach(change => {

        const doc = {...change.doc.data(), id: change.doc.id };

        switch (change.type) {
            case 'added': 
                data.push(doc);
                break;
            case 'modified':
                const index = data.findIndex(item => item.id == doc.id);
                data[index] = doc;
                break;
            case 'removed':
                data = data.filter(item => item.id !== doc.id);
                break;
            default: 
                break;
        }
    });

    // call update function
    update(data);

})
    
