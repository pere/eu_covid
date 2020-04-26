$('.modal').modal({
    opacity: 0.8
})

$('#intro_modal').modal({
    opacity: 0.8,
    onCloseEnd: function() {
        $('.country_li.main_li')
            .attr('data-tooltip', function() {
                return '<div class="init_instructions">Use the lateral navigation bar to start visualizing data <p>or click a country to get its profile </div>';

            })
            .tooltip({
                delay: 50,
                delayOut: 50000,
                position: 'right',
                html: true
            });


        setTimeout(function() {
            $(".country_li.main_li").tooltip("open");
            var container = $(".init_instructions").parents().closest('.material-tooltip')

            //container.hide();

            setTimeout(function() {
                container.css('top', container.position().top - ($(".country_li.main_li").height() / 2));
                container.show();

                $('.sidenav').on('mouseover', function() {
                    $(this).removeAttr('data-tooltip');
                    container.remove()
                    $('.sidenav').unbind('mouseover')
                })

            }, 100)
        }, 400)
    }
})

$('#country_modal').modal({
    opacity: 0.8,
    onOpenEnd: function() {
        console.warn('action on modal country open')
            // if (app_state.lollipop_indicators == true) {
            //     $('#lollipop_wrapper,.lollipop_tooltip').hide();
            // }
            // if (app_state.matrix_indicators == true) {
            //     $('#matrix_wrapper,.tooltip').hide();
            // }
    },
    onCloseEnd: function() {
        console.warn(app_state)
        if (app_state.lollipop_indicators == true) {
            $('#lollipop_wrapper,.lollipop_tooltip').show();
            $('.i_lollipop').hide();
        }
        if (app_state.matrix_indicators == true) {
            $('#matrix_wrapper,.tooltip').show();
            $('.i_matrix').hide();
        }
    }
})

// Callback for Modal close});
// $('.country_popup').on('mouseover mouseenter mouseleave mouseup mousedown', function() {
//     return false
// });

$('.icon_info').hide();
$('.icon_info').trigger('click');
$('.profile_checkbox input').on('click', function(e) {
    console.warn(e)

    if (e.originalEvent.isTrusted == false) {
        console.warn('checkbox triggered')
    }
    if ($(this).is(':checked')) {
        app_state.country_facts = true;
        // app_state.matrix_indicators = false;
        // app_state.lollipop_indicators = false;

        if ($('.heatmap svg g').length > 0) {

            //$('#matrix_wrapper').hide();
            // $('.tooltip').hide();
        }


        if ($('#lollipop_graph svg g').length > 0) {
            //$('#lollipop_wrapper').hide();
            //$('.lollipop_tooltip').hide();
        }


    } else {
        app_state.country_facts = false;
        // if ($('.heatmap svg g').length > 0) {
        //     // $('.heatmap svg').hide();
        //     app_state.matrix_indicators = true;
        //     $('#matrix_wrapper').show();
        // }


        // if ($('#lollipop_graph svg g').length > 0) {
        //     app_state.lollipop_indicators = true;
        //     $('#lollipop_wrapper').show();
        // }
    }
})

$('.legend_dropdown_button.dropdown-trigger,.rank_legend_dropdown_button.dropdown-trigger').dropdown({
    inDuration: 300,
    constrainWidth: false,
    closeOnClick: false,
    onOpenEnd: function(el) {

        $(el).find('i').addClass('on');
        if ($(el).hasClass('rank_legend_dropdown_button'))
            $('.rank_legend_control').show();

    },
    onCloseEnd: function(el) {
        $(el).find('i').removeClass('on');
    },
    // container: '#layers_menu',
    outDuration: 225,
    hover: false, // Activate on hover,
    stopPropagation: true,
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'right',
    //alignLeft: false
    // function(el) {
    //     if ($(el).hasClass('rank_legend_dropdown_button'))
    //         return 'left' // Displays dropdown with edge aligned to the left of button
    //     else
    //         return 'left'

    // }
});

$('.legend_dropdown_button.dropdown-trigger')
    .attr('data-tooltip', function() {
        return 'Show/hide index legend';
    })
    .tooltip({
        delay: 50,
        delayOut: 50000,
        position: 'bottom',
        html: true
    });


$('.icon_lollipop_close').click(function() {

    $('#lollipop_wrapper').fadeOut();
    $('.lollipop_tooltip').hide();
    app_state.lollipop_indicators = false;
    $('.mapboxgl-ctrl-bottom-right').show();
    $('.mapboxgl-ctrl-bottom-right div.i_matrix').hide();
    $('.mapboxgl-ctrl-bottom-right div.i_lollipop').show();
})
$('.icon_matrix_close').click(function() {
    $('#matrix_wrapper').fadeOut();
    $('.tooltip').hide();
    $('.mapboxgl-ctrl-bottom-right').show();
    $('.mapboxgl-ctrl-bottom-right div.i_lollipop').hide();
    $('.mapboxgl-ctrl-bottom-right div.i_matrix').show();
})


// setTimeout(function() {
//     var container = $(".init_instructions").parents().closest('.material-tooltip')
//     console.warn(container.position())

//     setTimeout(function() {
//         container.css('top', container.position().top - ($(".country_li.main_li").height() / 2))
//     }, 2000)

// }, 800)


$('.rank_legend_dropdown_button.dropdown-trigger')
    .attr('data-tooltip', function() {
        return 'Show/hide index ranking scale';

    })
    .tooltip({
        delay: 50,
        delayOut: 50000,
        position: 'bottom',
        html: true
    })

$('.dropdown-trigger').hide();



$('#slide-out').sidenav({

    edge: 'left', // Choose the horizontal origin
    draggable: true, // Choose whether you can drag to open on touch screens,
    onOpenEnd: function(el) {
        $('.sidenav-trigger').addClass('on');
        console.log(el)
            //calc(85%) !important
            //if ($('.country_info').is(':visible'))
            // if ($('#matrix_wrapper').is(':visible')) {
            //     alert('vis')
            //     $('#slide-out').attr('height', '65%!important')
            // }
            // else {
            //     $('#slide-out').attr('height', 'auto!important')
            // }

    },

    onCloseEnd: function(el) {}, // A function to be called when sideNav is closed
})

$('#slide-out').sidenav('open');


$('.sidenav-trigger').on('click', function(e) {
        if ($(this).hasClass('on')) {
            e.preventDefault()
            $('#slide-out').sidenav('close').removeClass('sidenav_on');
            $(this).removeClass('on')
            return false
        }
    })
    .attr('data-tooltip', function() {
        return 'Show/hide lateral sidebar';
    })
    .tooltip({
        delay: 50,
        delayOut: 50000,
        position: 'bottom',
        html: true
    });

$('.collapsible').collapsible({
    onCloseEnd: function() {
        if ($('.country_info').is(':visible') == false) {
            $('.country_li').css('min-height', '0px')
        }
    }
})


$('.light_mode').on('click', function(e) {

    if ($(this).hasClass('nightlight')) {
        $(this).removeClass('nightlight').addClass('daylight');
        $('.mapboxgl-map').css("background-color", "rgb(161, 180, 193)");
        // map.setPaintProperty('gaul_0_simple', 'fill-color', '#dae0e4');
        // map.setPaintProperty('gaul_0_simple', 'fill-outline-color', '#a1b4c1');
        // map.setPaintProperty('gaul_0_simple', 'fill-opacity', 0.8);
    } else {
        $(this).removeClass('daylight').addClass('nightlight');
        $('.mapboxgl-map').css("background-color", "rgb(4, 22, 32)");
    }
})


$('.other_description,.matrix_description').css('visibility', 'hidden')

$('.indicators_list > div').each(function() {
    $(this).on('mouseover', function() {

        // $('.matrix_indicator_select,.other_indicator_select ').removeClass('on');
        console.log($(this).attr('class'))

        if ($(this).hasClass('matrix_indicator_select')) {
            // $('.matrix_description').css('visibility', 'visible');
            // $(this).removeClass('off').addClass('on');


            // $('.other_description').css('visibility', 'hidden')
        } else {
            // $('.matrix_description').css('visibility', 'hidden')
            // $('.other_description').css('visibility', 'visible')
            // $(this).removeClass('off').addClass('on');
        }
    }).on('click', function() {
        $('.matrix_indicator_select,.other_indicator_select ').removeClass('on');

        if ($(this).hasClass('matrix_indicator_select')) {
            $('.matrix_description').css('visibility', 'visible');
            $(this).addClass('on').removeClass('off');


            $('#matrix_wrapper').show();

            // //    $('#slide-out').sidenav('close');
            app.update_by_index('main_index_class');
            //app.generate_data('main_index_class');
            // $('.other_description').css('visibility', 'hidden')
        } else {
            $('.matrix_description').css('visibility', 'hidden');
            $('.mapboxgl-ctrl-bottom-right').hide();

            $(this).addClass('on').removeClass('off');
            $('#matrix_wrapper').hide();
            app.setup_lollipop_graph();
            app.lollipop_graph('financial_index_val');
            $('.other_description').css('visibility', 'visible')
        }
    })
});