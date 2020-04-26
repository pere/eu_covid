function update_rank_legend(sorted_code_color_arr, double_click) {

    $('.rank_legend_dropdown_button.dropdown-trigger').show();
    console.log(JSON.stringify(sorted_code_color_arr));
    $(".rank_legend_control_container svg.legend_svg").empty();
    var svg_width = ($('#map').width() / 3) + 100;

    $('.rank_legend_control').css('right', (svg_width - 100) + 'px');
    $('.rank_legend_control,.rank_legend_control_container,.rank_legend_control_container svg')
        .css('width', svg_width + 'px')
        .css('height', '70px')
    console.warn(svg_width)
    $('.rank_legend_dropdown_button.dropdown-trigger').find('i').trigger('click');


    var svg = d3.select(".rank_legend_control_container svg.legend_svg")
    var defs = svg.append("defs");
    var gradient = defs.append("linearGradient")
        .attr("id", "svgGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    //Append multiple color stops by using D3's data/enter step      
    gradient.selectAll("stop")
        // .data(colorScale.range())
        .data(sorted_code_color_arr)
        .enter().append("stop")
        //code_color_arr.push({ rank: this_rank, code: code, rank_color: color }) //, title: '< ' + length })
        .attr("offset", function(d, i) {
            console.log(sorted_code_color_arr.length)
            if (i == 0) {
                console.log(d)
                console.warn(d)
                return i / (sorted_code_color_arr.length - 1);
            } else {
                console.log(d)
                console.info(i / (sorted_code_color_arr.length - 1))
                return i / (sorted_code_color_arr.length - 1);
            }

        })
        .attr("stop-color", function(d) {
            return d.rank_color;
        });

    var rect = svg.append("rect")
        .attr('class', 'rect_legend')
        .attr('width', svg_width)
        //.attr('height', $(".rank_legend_control_container").height())
        .attr('height', 15)
        .attr("fill", "url(#svgGradient)")
        //.attr("transform", "translate(2, 0)") // + (10 + legendHeight) + ")")

    var s_domain = sorted_code_color_arr.map(function(d) {

        return parseInt(d.rank)
    });
    console.info(s_domain)

    var left = $('.rank_legend_control_container').width();
    console.log(left)
    var xScale = d3.scaleLinear()
        .domain([1, 38])
        //.domain(s_domain)

    .range([5, left - 8])

    console.log(xScale(1))
    console.log(xScale(38))

    //var yValues = data.map(function(d){return d.y;}); 
    //array of all y-values
    xValues = d3.set(s_domain).values();
    //use a d3.set to eliminate duplicate values


    var xAxis = d3.axisBottom(xScale);
    xAxis.tickValues(xValues);

    //.ticks(10); //.tickFormat(function(d) {
    //  var width = 700; //$('.rect_legend').width();

    var legendWidth = svg_width,
        legendHeight = 10;

    //Color Legend container
    var legendsvg = svg.append("g")
        .attr("class", "legendWrapper")
        // .attr("transform", "translate(-" + left + ", " + legendHeight + ")")


    legendsvg.append("g")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("class", "axis") //Assign "axis" class
        .attr("transform", "translate(0, " + legendHeight + ")")
        .call(xAxis)
        // d3.selectAll('.tick').on('mouseover', function(d) {
        //     console.log(d)
        // })

    //$('.rank_legend_control').show();
    //$('.rank_legend_dropdown_button.dropdown-trigger').find('i').trigger('click');

    $('.rank_legend_control')
        .attr('data-tooltip', function() {
            var container = $(".rank_legend_control_container").find('.btn-small.selected')
            if (container.hasClass('main_index_val')) {
                var param = 'Main index';
            } else {
                var parm = container.text() + ' index';
            }
            return '<div class="tooltip_rank_instructions">Country colors on the map are symbolized according to <div class="sel_matrix_order">' + container.text() + '</div> rank (based on a total of 38 countries rank)<p>You can change the index clicking on the legend labels</div>';

        })
        .tooltip({
            delay: 50,
            delayOut: 50000,
            position: 'bottom',
            html: true
        })

    console.log(arguments)
    if (double_click == true) {
        console.warn('double')
        setTimeout(function() {
            console.warn('trigger again first')
            $('.rank_legend_dropdown_button.dropdown-trigger').find('i').trigger('click');
            setTimeout(function() {
                $('.rank_legend_control').tooltip("close");

                var container = $(".tooltip_rank_instructions").parents().closest('.material-tooltip')
                $(this).tooltip('close');
                container.remove()
                $(this).removeAttr('data-tooltip');

            }, 5000)

        }, 800)

        if ($('.dropdown-trigger.rank_legend_dropdown_button').find('i').hasClass('on') == false) {


            setTimeout(function() {
                console.warn('trigger again second')

                $('.rank_legend_dropdown_button.dropdown-trigger').find('i').trigger('click');

            }, 1200)

            setTimeout(function() {
                $('.rank_legend_control').tooltip("open");

                setTimeout(function() {
                    $('.rank_legend_control').tooltip("close");

                    var container = $(".tooltip_rank_instructions").parents().closest('.material-tooltip')
                    $(this).tooltip('close');
                    container.remove()
                    $(this).removeAttr('data-tooltip');

                }, 5000)

            }, 1600)
        }
    }

    //  $('.rank_legend_control').tooltip("open")
    //$('.rank_legend_dropdown_button.dropdown-trigger').find('i').trigger('click');

}

function update_geom_by_rank(double_click) {

    map.flyTo({
        center: [5, -21],
        zoom: 2,
        speed: 0.4
    })
    d3.selectAll("#map path.country").attrs(app.normal_country_style)
    app_data.code_color_arr = [];
    app_data.rankScale = d3.scaleLinear().domain([1, 38])
        .interpolate(d3.interpolateHcl)
        .range(app_data.lollipop_obj.gradient);
    console.info(app_data.rankScale)

    var map_paths = d3.selectAll("#map path.country");
    //app_data.lollipop_obj
    // {
    //     index_code: 'main_index_val',
    //     rank_code: 'general_rank',
    //     color: "#f0d751",
    //     text: "Financial",
    //     //yellow to orange
    //     gradient: ['#eacf3d', '#ea663d']
    // })
    map_paths
        .transition()
        .duration(1250)
        .delay(function(d, i) {
            return i * 40;
        })
        .attr("delay", function(d, i) {
            return 100 * i
        })
        .attr('fill', function(d) {
            return get_rank_color(d.properties.code, app_data.lollipop_obj.rank_code)
        })
        .attr("stroke", "#fbfdfc")
        .attr('opacity', 1)



    var sorted_code_color_arr = app_data.code_color_arr.sort(function(a, b) {
        return a.rank - b.rank;
    })
    update_rank_legend(sorted_code_color_arr, double_click);

}

function get_rank_color(code, param) {
    //return get_rank_color(d.properties.code, this_obj.rank_code)
    var color;
    var length = all_data.length;

    all_data.forEach(function(d, i) {
        if (d.code == code) {

            for (var p in d.data_ranks) {
                if (param == p) {
                    var this_rank = d.data_ranks[param];
                    console.log(this_rank)

                    color = app_data.rankScale(this_rank);
                    if (app_data.code_color_arr.length < 8) {

                        if (this_rank == 1)
                            app_data.code_color_arr.push({ rank: this_rank, code: code, rank_color: color })
                        if (this_rank == 5)
                            app_data.code_color_arr.push({ rank: this_rank, code: code, rank_color: color }) //, title: '< ' + length })
                        if (this_rank == 10)
                            app_data.code_color_arr.push({ rank: this_rank, code: code, rank_color: color }) //, title: '> ' + code_color_arr[0].this_rank })
                        if (this_rank == 20)
                            app_data.code_color_arr.push({ rank: this_rank, code: code, rank_color: color })
                        if (this_rank == 30)
                            app_data.code_color_arr.push({ rank: this_rank, code: code, rank_color: color });
                        if (this_rank == 35)
                            app_data.code_color_arr.push({ rank: this_rank, code: code, rank_color: color });
                        if (this_rank == 38)
                            app_data.code_color_arr.push({ rank: this_rank, code: code, rank_color: color });
                    }
                }
            }
        }
    })
    return color;
}
app.setup_lollipop_graph = function() {
    app_state.matrix_indicators = false;
    $('.heatmap svg').empty();
    $('.legend_dropdown_button').hide();
    $('#lollipop_wrapper').show();
    app_state.country_facts = false;
    app_state.initial_state = false;

    app_state.lollipop_indicators = true;

    if ($('.profile_checkbox input').is(':checked')) {

        $('.profile_checkbox input').trigger('click')
    }

    app.matrix_map_popup.remove();

    //$('.dropdown-trigger').hide();

    var description_height = 20;
    //$('.lollipop_legend_description').height();

    $('.tooltip').remove();
    $('.tooltip .rect_popup').hide();
    $('.animated-icon').fadeOut();

    d3.selectAll('.lollipop_tooltip').remove();
    console.info(app_data.all_data)
    if ($('#lollipop_graph svg').length > 0) {
        $('#lollipop_graph svg').remove();
    } else {
        lollipop_colors_obj.push({
            index_code: 'main_index_val',
            rank_code: 'general_rank',
            color: "#f0d751",
            text: "Financial",
            //yellow to orange
            gradient: ['#eacf3d', '#ea663d']
        })
    }

    lollipop_tooltip = d3.select("body")
        .append("div").attr("class", "lollipop_tooltip");

    $('.tooltip').hide();
    //just used for positioning!
    var mx_w_h = $('#map').height() / 5;
    $('#lollipop_wrapper').height(mx_w_h + $('nav').height());
    var map_w = $('#map').width();

    var diff_h = $('#map').height() - mx_w_h - $('nav').height();
    var diff_w = map_w - (map_w / 4);

    $('#lollipop_wrapper').css('top', diff_h - 5).css('width', diff_w + 'px')
        //half of half map width!!
        .css('margin-left', (map_w / 8))

    $('#lollipop_wrapper').css('display', 'block').show();
    $('#matrix_wrapper').hide();
    var margin = {
        top: 0,
        right: 5,
        bottom: 5,
        left: 5
    };
    width = diff_w - margin.left - margin.right;

    var svg = d3.select("#lollipop_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", mx_w_h + 30 + $('nav').height())
        .append("g")
        .attr("transform",
            "translate(0," + margin.top + ")");

    $('.matrix_btn').unbind('click')
    $('.matrix_btn').click(function(e) {
        e.preventDefault();
        console.warn(e.target)
        if ($(e.target).hasClass('btn-small')) {
            $(this).find('.selected').removeClass('selected');
            var param = $(e.target).attr('class').split(' ')[1];

            $(e.target).addClass('selected');


            app.setup_lollipop_graph();

            app.lollipop_graph(param);

            app_data.lollipop_obj = lollipop_colors_obj.filter(function(d) {
                return d.index_code == param;
            })[0];

            // $('.rank_symbol_label').text(app_data.lollipop_obj.text + ' rank');

            app_data.rankScale = d3.scaleLinear().domain([1, 38])
                .interpolate(d3.interpolateHcl)
                .range(app_data.lollipop_obj.gradient);

            update_geom_by_rank(false);

        }
    })
}
app.lollipop_graph = function(param_to_order) {


    app_data.lollipop_obj = lollipop_colors_obj.filter(function(d) {
        return d.index_code == param_to_order;
    })[0];

    //$('.rank_legend_dropdown_button.dropdown-trigger').show();

    update_geom_by_rank(true);



    var sorted_obj = all_data.sort(function(a, b) {
        return b.data_val[param_to_order] - a.data_val[param_to_order]
    });
    console.log(JSON.stringify(sorted_obj))

    app_data.lollipop_data = [];
    all_data.filter(function(d, i) {
        var t_data = [];
        var titles_data = [];

        //  var sorted = d.data_val.sort(sort_by_value());
        for (var p in d.data_val) {
            //console.info(p)
            if (p !== 'main_index_val') {
                t_data.push(d.data_val[p])
                titles_data.push(p)
                    //else
            }
        }

        //

        // var popup = '<div class="popup_country_title">' + d.country + '</h3>';
        /*
                "data_ranks":{
        "general_rank":1,
        "rank_env":12,
        "rank_social":14,
        "rank_political":14,
        "rank_financial":2
        },
        ORDER IS IMPORTANT, HAS TO BE THE SAME!

        DATA_val:::

        "main_index_val":20.761,
        "env_index_val":0.048,
        "social_index_val":0.059,
        "political_index_val":0.091,
        "financial_index_val":0.562

        */

        var popup = '<div class="popup_country_title">' + d.country + '</div><div class="popup_rank_title">General rank   <span class="general_rank_popup" style="color:' + get_rank_color(d.code, 'general_rank') + '">' + d.data_ranks['general_rank'] + ' / 38</div>';
        popup += '<div class="profile-overview"><table class="responsive-table profile-overview"> <thead> <tr> <td>Environmental</td> <td>Social</td> <td>Political</td> <td>Financial</td> </tr> </thead> <tbody><tr>';
        var i = 0;

        for (var index in d.data_ranks) {
            switch (index) {
                case 'general_rank':
                    var title = 'Index';
                    var index_val = d.data_val['main_index_val'];
                    break;
                case 'rank_env':
                    var title = 'Environmental';
                    var index_val = d.data_val['env_index_val'];
                    break;
                case 'rank_social':
                    var title = 'Social';
                    var index_val = d.data_val['social_index_val'];

                    break;
                case 'rank_political':
                    var title = 'Political';
                    var index_val = d.data_val['political_index_val'];
                    break;
                case 'rank_financial':
                    var title = 'Financial';
                    var index_val = d.data_val['financial_index_val'];
                    break;
            }

            if (index !== 'general_rank') {
                i++;
                // popup += '<i style="background:' + lollipop_colors_obj[i - 1].color + '"></i>';
                popup += '<td class="medium general_rank" style="background:' + lollipop_colors_obj[i - 1].color + '">' + d.data_ranks[index] + '/38 <span class="popup_index_val"> ' + index_val + '</span></td>';
            } else {
                // popup += '<td class="medium general_rank">0.51</td>';
            }


            // popup += '<span class="lollipop_' + index + '">' + title + ' </span> rank  (' + d.data_ranks[index] + ' of 38)</div>';
        }

        popup += ' </tr> </tbody> </table> </div>';
        // console.info(popup)

        // console.log(app_data.lollipop_data)
        all_data.filter(function(this_data) {
            return this_data.code == d.code;
        })[0].lollipop_popup = popup;

        app_data.lollipop_data.push({
            country: d.country,
            code: d.code,
            data: t_data,
            lollipop_popup: popup,
            data_titles: titles_data
        });



    });

    //console.info(JSON.stringify(all_data))

    var width = $('#lollipop_graph').width();

    var description_height = 20;
    //$('.lollipop_legend_description').height();

    var mx_w_h = $('#map').height() / 5;
    $('#lollipop_wrapper').height(mx_w_h + $('nav').height());
    // var map_w = $('#map').width();

    // var diff_h = $('#map').height() - mx_w_h - $('nav').height();
    // var diff_w = map_w - (map_w / 4);

    //console.info(mx_w_h);

    console.info($('.lollipop_graph svg').height())
    var y = d3.scaleLinear()
        .domain([0, 0.6])
        .range([mx_w_h + description_height, 0]);
    //.range([0, w]);

    var svg = d3.select("#lollipop_graph svg");
    var yAxis = svg.append("g")
        .attr("class", "myYaxis")

    var x = d3.scaleBand()
        .range([0, width])
        .domain(app_data.lollipop_data.map(function(d) {
            //  console.log(d)
            /*
              code: "MDG"
            country: "Madagascar"
            data: (4) [0.071, 0.067, 0.099, 0.138]
            data_titles: (4) ["env_index_val", "social_index_val", "political_index_val", "financial_index_val"]
            lollipop_popup: "<div class="popup_cou
            */
            return d.code;
        }))
        .padding(2);


    var ScaleRadius = d3.scaleLinear()
        .domain([0, 0.6])
        .range([3, 8]);


    svg.append("g")
        .attr("transform", "translate(0," + (mx_w_h + description_height) + ")")
        .classed('x_axis', true)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(0,0)rotate(-45)")
        .style("text-anchor", "end")
        .attr('font-weight', 'normal')
        .style('fill', '#ffffff')


    svg.append("g")
        .call(d3.axisLeft(y))

    var lollipop_rects = svg.selectAll("#lollipop_wrapper rect")
        .data(app_data.lollipop_data)
        .enter()
        .append("rect")
        .attr("x", function(d) {
            return x(d.code)
        })
        .attr("y", function(d) {
            // return x(d.data[0]);
            return 0;
            // return height
        })
        .attr("width", 17)
        .attr("height", function(d) {
            // return y(d3.max(d.data));
            return mx_w_h + description_height
        })
        .attr("code", function(d) {

            return d.code;
        })
        .attr('class', 'myrect')
        .attr("transform",
            "translate(-9,0)")
        .style('fill', '#ffd451')
        .style('opacity', 0)


    // Lines
    var lines = svg.selectAll(".myline")
        .data(app_data.lollipop_data)
        .enter()
        .append("line")

    console.log(lines)

    lines

        .attr("x1", function(d) {
            return x(d.code);
        })
        .attr("x2", function(d) {
            return x(d.code);
        })
        .attr("y1", function(d) {
            // return x(d.data[0]);
            return y(0);
            // return height
        })
        .attr("y2", function(d) {

            return y(d3.max(d.data));
        })

    .attr("stroke", "white")
        .attr("stroke-width", "0.5px");

    lines.nodes().forEach(function(line, i) {

        var line_d = line.__data__;

        /*
        country: "South Sudan"
        code: "SSD"
        data: (4) [0.048, 0.062, 0.049, 0.187]
        lollipop_popup: "<div class="popup_country_title">South Sudan</div><div>General rank   <span class="general_rank_popup" style="color:rgb(235, 105, 60)">37 / 38</div><div class="profile-overview"><table class="responsive-table profile-overview"> <thead> <tr> <td>Environmental</td> <td>Social</td> <td>Political</td> <td>Financial</td> </tr> </thead> <tbody><tr><td class="medium general_rank" style="background:#a763d7">13/38 <span class="popup_index_val"> 0.048</span></td><td class="medium general_rank" style="background:#2FA37D">11/38 <span class="popup_index_val"> 0.062</span></td><td class="medium general_rank" style="background:#979d9c">36/38 <span class="popup_index_val"> 0.049</span></td><td class="medium general_rank" style="background:#eacf3d">33/38 <span class="popup_index_val"> 0.187</span></td> </tr> </tbody> </table> </div>"
        data_titles: Array(4)
        0: "env_index_val"
        1: "social_index_val"
        2: "political_index_val"
        3: "financial_index_val"
        */

        svg.selectAll("mycircle")
            .data(line_d.data)
            .enter()
            .append("circle")
            .attr('code', function(d, i) {
                //console.warn(d)
                // d = 0.033
                return line_d.code
            })
            .attr('param', function(d, i) {

                return lollipop_colors_obj[i].index_code;
            })
            .attr('class', 'mycircle')

        .attr("cx", function(d, i) {

                return x(line_d.code);
            })
            .attr("cy", function(d, i) {
                return y(d);
            })
            .transition()
            .duration(700)
            .attr("r", function(d) {
                return 5
                    //ScaleRadius(d)
            })
            .style("fill", function(d, i) {
                return lollipop_colors_obj[i].color
            })
            .style('opacity', function(d, i) {
                // console.log(lollipop_colors_obj[i].index_code)
                // console.warn(param_to_order)
                if (param_to_order !== 'main_index_val') {
                    if (lollipop_colors_obj[i].index_code == param_to_order) {
                        return 0.9
                    } else {
                        return 0.2
                    }
                } else {
                    return 0.9;
                }

            });
        setTimeout(function() {
            d3.selectAll('.mycircle').style('opacity', 0.9)
        }, 3000)


    });
    var lollipop_mouseout = function(d) {
        var code = d3.select(this).attr('code');
        console.log('mouseout lollipop rect')

        d3.selectAll('.myrect')
            .style('opacity', 0);
        $('.lollipop_tooltip').hide();

    }

    var lollipop_mouseover = // app.throttle(
        function(d) {
            d3.selectAll('.myrect')
                .style('opacity', 0)
            var code = d3.select(this).attr('code');

            var _this = '.myrect[code=' + code + ']';
            d3.selectAll(_this)
                // .transition()
                //     .duration(100)
                .style('opacity', 0.3)



            // var param = d3.select(this).attr('param').split('_')[0];

            var this_info = app_data.lollipop_data.filter(function(_d) {
                return _d.code == code;
            })[0]

            console.log($(_this))
            var pos = $(_this).offset();
            var pos = this.getBoundingClientRect();
            //same result
            console.warn(d3.select(_this).node().getBoundingClientRect())
            console.log(pos)



            var $html = $.parseHTML(this_info.lollipop_popup);

            lollipop_tooltip
                .html('<div class="lollipop_popup"></div>')
                .style("position", "absolute")

            // .style("top", (pos.top - (d3.select(this).attr('height' / 2))) + "px")
            .style("top", (pos.y + (pos.height / 6) + "px"))
                //.style("top", "70px")

            $('.lollipop_popup').empty().append($html);

            if (pos.x > ($('#map').width() / 2)) {

                var xpos = (pos.x - $('.lollipop_tooltip').width() - 20) + "px";
                console.info(xpos)
            } else {
                var xpos = (pos.x + 20) + "px";
                console.info(xpos)
            }

            lollipop_tooltip.style("left", xpos)

            $('.lollipop_tooltip').show();
            lollipop_tooltip.style("opacity", 1);

        };
    // svg.selectAll('.lollipop_popup').on('mouseenter',function()
    // {

    // })

    svg.selectAll("rect.myrect")
        .on('mouseover', app.throttle(lollipop_mouseover, 100))
        .on('mouseout', lollipop_mouseout)
        .on('mouseleave', lollipop_mouseout)
    lines.on('mouseover', function(d) {
            console.warn(d)
        })
        // index_code: 'political_index_val',
        // rank_code: 'rank_political',
        // color: "#979d9c",
        // text: "Political",
        // //greys to balck
    gradient: ['#d8dfdd', '#2a2d2c']
    var container = d3.selectAll('.lollipop_graph_legend svg');

    var width = $('.lollipop_graph_legend svg').width() - 100;
    console.log(width)


    var obj = lollipop_colors_obj.slice(0, -1);
    console.info(obj)
    var xScale = d3.scaleLinear()
        .domain([0, obj.length])
        .range([0, width]);
    var each_scale = xScale(1);
    console.log(each_scale)
        //var width = $('.lollipop_graph_legend').width() - each_scale;
    var gs = container.selectAll('g')
        .data(obj)
        .enter()
        .append('g')
        .attr("transform",
            function(d, i) {
                if (i > 0)
                    return "translate(" + xScale(i) + 18 + ",0)"
                else
                    return "translate(0,0)";
            })
        .on('mouseover', function(d) {
            console.warn(d)

            console.log(d3.selectAll('.mycircle[param=' + d.index_code + ']'))
            d3.selectAll('.mycircle').style('opacity', 0.2)
            d3.selectAll('.mycircle[param=' + d.index_code + ']').style('opacity', 1)
            $('.lollipop_tooltip').hide();
            d3.selectAll('.myrect').style('opacity', 0)

        })
        .on('mouseout', function(d) {

            d3.selectAll('.mycircle').style('opacity', 0.9)
        })
        //gs.
    gs.append('circle')
        .style('fill', function(d) {

            return d.color
        })
        .style('opacity', 1)
        .attr('r', 6)
        .attr('cx', function(d, i) {
            // if (i == 0)
            //     return xScale(i) + 10
            // else
            //     return xScale(i)
            return 10
        })
        .attr('cy', 10)
    gs.append('text')
        .attr('x', function(d, i) {
            return 15
                // if (i == 0)
                //     return xScale(i) + 20
                // else

            //     return xScale(i) + 10
        })

    .attr('y', 17)
        .attr("transform",
            function(d, i) {

                return "translate(10,-3)";
            })
        .text(function(d) { return d.text; })
        .style("font-size", '0.7em')
        .attr("fill", "white")
}