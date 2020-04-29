function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
    //+'.00';
};


var indexes_arrays = {};
var hovering_map = true;

// ["env_index_class", "financial_index_class", "political_index_class", 'social_index_class', 'main_index_class'];
var markers_obj_arr = [];


var mouseovered_path = { code: null };
var mouseovered_rect = {};
var app_data = { matrix_current_param: 'main_index_val' };
var app_state = {

    initial_state: true

};
var app = {};
app.initial_region_style = {
    "stroke": "#ffff",
    "fill": "black",
    "opacity": 0.2,
    'stroke-width': 0.4
}

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function round_this(someNumber, digits) {
    switch (digits) {
        case 1:
            var p = 1e1;
            break;
        case 2:
            var p = 1e2;
            break;
        case 3:
            var p = 1e3;
            break;
        case 4:
            var p = 1e4;
            break;
    }
    return Math.round(someNumber * p) / p;
}