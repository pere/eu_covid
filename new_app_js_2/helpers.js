function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
    //+'.00';
};



//numberWithCommas('945897221')
//.range(["#e0347c", "#f5621c", "#f7c717", "#6ee282", "#5aa066"]);
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
    //color: '#f7c717',
    color: '#f7c717',
    title: 'Middle'
}, {
    value: 4,
    //color: '#6ee282',
    color: '#9dd9a7',
    title: 'Upper middle'
}, {
    value: 5,
    //color: '#2196f3',
    //color: '#2196f3',
    color: '#24a9e5',
    title: 'Higher performance'
}];

//have to be the sameo ordering than data_class! (popup)
var indexes_info = [{
        name: 'main_index_class',
        title: 'General Index'
    },
    {
        name: 'env_index_class',
        title: 'Environmental'
    },
    {
        name: 'social_index_class',
        title: 'Social'
    }, {
        name: 'political_index_class',
        title: 'Political'
    },
    {
        name: 'financial_index_class',
        title: 'Financial'
    }
];

var indexes_arrays = {};
var hovering_map = true;


var y_elements = indexes_info.map(function(d) {
        return d.name;
    })
    // ["env_index_class", "financial_index_class", "political_index_class", 'social_index_class', 'main_index_class'];
var markers_obj_arr = [];


var mouseovered_path = { code: null };
var mouseovered_rect = {};
var app_data = { matrix_current_param: 'main_index_val' };
var app_state = {
    lollipop_indicators: false,
    matrix_indicators: false,
    country_facts: true,
    initial_state: true

};
var app = {};
app.initial_country_style = {
    "stroke": "#ffff",
    "fill": "black",
    "opacity": 0.4,
    'stroke-width': 0.4
}
app.initial_no_fill_country_style = {
    "stroke": "#ffff",

    "opacity": 0.4,
    'stroke-width': 0.4
}
app.highlighted_country_style = {
        "stroke": "#ffff",
        "fill": "yellow",
        "opacity": 0.9,
        'stroke-width': 0.4
    }
    //like initial_country_style but keeping color
app.normal_country_style = {
    //purple
    "fill": "black",
    "stroke": "#ffff",
    'stroke-width': 1,
    'opacity': 0.6
};

app.sel_country_style = {
    //purple
    "stroke": "white",
    'stroke-width': 2,
    'opacity': 1
};
app.unsel_country_style = {
    'opacity': 0.1,
    "stroke": "#ffff",
    'stroke-width': 0.8
};



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

var lollipop_colors_obj = [{
        index_code: 'env_index_val',
        rank_code: 'rank_env',
        //medium purple
        color: "#a763d7",
        text: "Environmental",
        //purples
        gradient: ['#d2aaee', '#8e08ec']
    },
    {
        index_code: 'social_index_val',
        rank_code: 'rank_social',
        color: "#2FA37D",
        text: "Social",
        //kind of greens
        gradient: ['#a5ecd8', '#04956c']
    },
    {
        index_code: 'political_index_val',
        rank_code: 'rank_political',
        color: "#979d9c",
        text: "Political",
        //greys to balck
        gradient: ['#d8dfdd', '#2a2d2c']
    },
    {
        index_code: 'financial_index_val',
        rank_code: 'rank_financial',
        color: "#eacf3d",
        text: "Financial",
        //yellows
        gradient: ['#f7eca3', '#f5d507']
    }
];