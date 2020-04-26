function bubble_chart() {

    var reduced = countries_info.reduce(function(memo, d, i) {
        // console.info(i)
        //memo.countries.push(d.country)
        var main_index_class = d.data_class['main_index_class'];
        var facts = d.country_facts[0];

        memo.lcoe_average_arr.push(facts.lcoe_average);
        memo.pop_noelect_minigrid_arr.push(facts.pop_noelect_minigrid / 1000);
        memo.co2_tonnes_minigrid_arr.push(facts.co2_tonnes_minigrid);

        memo.countries_data.push({
            code: d.code,
            country: d.country,
            rank_index: d.rank_index,
            main_index_class: main_index_class,
            lcoe_average: facts.lcoe_average,

            pop_noelect_minigrid: facts.pop_noelect_minigrid / 1000,
            co2_tonnes_minigrid: facts.co2_tonnes_minigrid

        })
        if (i == countries_info.length - 1) {
            console.log('last')
        }

        return memo

    }, {
        countries_data: [],
        lcoe_average_arr: [],
        pop_noelect_minigrid_arr: [],
        co2_tonnes_minigrid_arr: []
    });
    // console.log(JSON.stringify(reduced))
    console.warn(reduced.lcoe_average_arr)
    var max_lcoe_average = Math.max.apply(Math, reduced.lcoe_average_arr);
    var min_lcoe_average = Math.min.apply(Math, reduced.lcoe_average_arr);

    var max_pop_noelect_minigrid = Math.max.apply(Math, reduced.pop_noelect_minigrid_arr);
    var min_pop_noelect_minigrid = Math.min.apply(Math, reduced.pop_noelect_minigrid_arr);

    var max_co2_tonnes_minigrid = Math.max.apply(Math, reduced.co2_tonnes_minigrid_arr);
    console.log('max ' + max_co2_tonnes_minigrid)
    var min_co2_tonnes_minigrid = Math.min.apply(Math, reduced.co2_tonnes_minigrid_arr);

    var margin = {
            top: 20,
            right: 190,
            bottom: 20,
            left: 70
        },
        width = $('.profile-overview').width() - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom;

    $("#bubble_chart").empty();

    // append the svg object to the body of the page
    var svg = d3.select("#bubble_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    console.log([min_lcoe_average, max_lcoe_average])
        // Add X axis
    var x = d3.scaleLinear()
        .domain([min_lcoe_average, max_lcoe_average])
        .range([0, width]);
    console.info(x(0.3))
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(3));

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 50)
        .text("Gdp per Capita");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([min_pop_noelect_minigrid, max_pop_noelect_minigrid])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", 0)
        .attr("y", -20)
        .text("Market size: decentralized technologies ")
        .attr("text-anchor", "start")
        .attr("transform", "translate(-30," + (height - 100) + ") rotate(-90)")


    // Add a scale for bubble size
    var z = d3.scaleSqrt()
        .domain([min_co2_tonnes_minigrid, max_co2_tonnes_minigrid])
        .range([2, 30]);


    var scale_values = [{
        value: 1,
        // color: '#e73232',
        color: 'hsl(0,79%,55.1%,70%)',
        title: 'Lower performance'
    }, {
        value: 2,
        //color: '#f5621c',
        color: '#e78150',
        title: 'Lower-middle'
    }, {
        value: 3,
        color: '#f7c717',
        title: 'Middle'
    }, {
        value: 4,
        color: '#9dd9a7',
        title: 'Upper middle'
    }, {
        value: 5,
        color: '#24a9e5',
        title: 'Higher performance'
    }];
    svg.append('g')
        .attr('fill', 'black')
        .attr("class", 'g_data')
        .selectAll("dot")
        .data(reduced.countries_data)
        .enter()
        .append("circle")
        .attr('code', function(d) {
            return d.code
        })
        .attr("class", function(d) {
            return "bubbles main_index_class_" + d.main_index_class
        })

    .style("fill", function(d) {
            //return myColor(d.continent);
            return scale_values.filter(function(d2) {
                return d2.value == d.main_index_class;
            })[0].color;

        })
        .attr("stroke", "white")
        .on("mouseover",
            //     showTooltip
            // )
            // -3- Trigger the functions for hover
            // .on("mouseover", 
            function(d) {
                console.warn(this)
                var elem = d3.select(this);
                console.log(d)
                showTooltip(d, this, elem)
            })
        //.attr("cx", 0)
        .attr("cx", function(d) {
            // console.info(d)
            return x(d.lcoe_average); // lcoe_average  LCOE (EUR/kWh) 
        })
        .attr("cy", height)
        .attr("r", 0)
        //  .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
        .transition()
        .ease(d3.easeSin)
        .duration(3200)
        .attr("delay", function(d, i) {

            return 300 * i
        })

    .attr("cy", function(d) {
            return y(d.pop_noelect_minigrid); //pop_noelect_minigrid Market size: decentralized technologies ('000 people)
        })
        .attr("r", function(d) {
            return z(d.co2_tonnes_minigrid); //co2_tonnes_minigrid GHG emissions avoided per year (ktons CO2eq)

        })
        .on("end", function() {
            var _this = '.bubbles[code=NGA]';
            d3.select(_this)
                //d3.select(this)
                .dispatch('mouseover');
        });

    // Add legend: circles
    var valuesToShow = [min_co2_tonnes_minigrid, parseInt(max_co2_tonnes_minigrid / 2), max_co2_tonnes_minigrid];
    var xCircle = 590
    var xLabel = 640
    var circle_legend_container = svg.select('g.g_data');
    console.warn(circle_legend_container);
    circle_legend_container
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d) {
            return height - 300 - z(d)
        })
        .attr("r", function(d) {
            return z(d)
        })
        .style("fill", "none")
        .attr("stroke", "black")

    // Add legend: segments
    svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("line")
        .attr('x1', function(d) {
            return xCircle + z(d)
        })
        .attr('x2', xLabel)
        .attr('y1', function(d) {
            return height - 300 - z(d)
        })
        .attr('y2', function(d) {
            return height - 300 - z(d)
        })
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("text")
        .attr('x', xLabel)
        .attr('y', function(d) {
            return height - 300 - z(d)
        })
        .text(function(d) {
            return d + ' avoided Co2 emission';
        })
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle');

    var size = 20
        //  var allgroups = ["Asia", "Europe", "Americas", "Africa", "Oceania"]
    svg.selectAll("myrect")
        .data(scale_values)
        .enter()
        .append("circle")
        .attr("cx", 390)
        .attr("cy", function(d, i) {
            return 10 + i * (size + 5)
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d) {
            return d.color
        })
        .on("mouseover", function(d) {

            console.log(d)
            highlight(d)
        })
        // .on("click", noHighlight)
        .on("mouseout", function(d) {

            noHighlight(d)
        })

    // Add labels beside legend dots
    svg.selectAll("mylabels")
        .data(scale_values)
        .enter()
        .append("text")
        .attr('class', 'main_index_class_legend')
        .attr("x", 390 + size * .8)
        .attr("y", function(d, i) {
            return i * (size + 5) + (size / 2)
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d) {
            return d.color
        })
        .text(function(d) {
            return d.title
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseleave", noHighlight)
        .on("mouseout", noHighlight)
        .on("mouseover", function(d) {

            console.log(d)
            highlight(d)
        })
        .on("mouseout", function(d) {

            noHighlight(d)
        })
        // ---------------------------//
        //       HIGHLIGHT GROUP      //
        // ---------------------------//

    // What to do when one group is hovered
    var highlight = function(d) {
        // reduce opacity of all groups
        d3.selectAll(".bubbles").style("opacity", .3)
            // expect the one that is hovered
        console.info(d)
        d3.selectAll(".main_index_class_" + d.value).style("opacity", 1)
    }

    // And when it is not hovered anymore
    var noHighlight = function(d) {

        d3.selectAll(".bubbles").style("opacity", 1)
    }

    var tooltip = d3.select("#energy_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")

    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    var showTooltip = function(d, _this, elem) {

        var node = elem.node();
        //console.log(elem.attr('cx'))
        //console.warn(d3.mouse(_this))
        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("opacity", 1)
            .html("Country: " + d.country)
            .style("left", (node + 30) + "px")
            // .style("top", (d3.mouse(_this)[1] + 30) + "px")
            .style("left", (elem.attr('cx') + 30) + "px")
            .style("top", (elem.attr('cy') + 30) + "px")
    }
    var hideTooltip = function(d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)

    }
}