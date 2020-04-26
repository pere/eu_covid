  //.range(["#e0347c", "#f5621c", "#f7c717", "#6ee282", "#5aa066"]);
  var scale_values = [{
      value: 0,
      color: '#444243',
      title: '0- No data'
  }, {
      value: 1,
      color: '#e0347c',
      title: '1- Critical'
  }, {
      value: 2,
      color: '#f5621c',
      title: '2- Bad'
  }, {
      value: 3,
      color: '#f7c717',
      title: '3- Neutral'
  }, {
      value: 4,
      color: '#6ee282',
      title: '4- Good'
  }, {
      value: 5,
      color: '#5aa066',
      title: '5- Very good'
  }];



  var indexes_info = [{
      name: 'env_index_class',
      title: 'Environmental'
  }, {
      name: 'financial_index_class',
      title: 'Financial'
  }, {
      name: 'political_index_class',
      title: 'Political'
  }, {
      name: 'social_index_class',
      title: 'Social'
  }, {
      name: 'main_index_class',
      title: 'General'
  }];

  var indexes_arrays = {};
  var hovering_map = true;


  var y_elements = indexes_info.map(function(d) {
          return d.name;
      })
      // ["env_index_class", "financial_index_class", "political_index_class", 'social_index_class', 'main_index_class'];
  var markers_obj_arr = [];


  var mouseovered_path = {};
  var mouseovered_rect = {};
  var app_data = {};

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