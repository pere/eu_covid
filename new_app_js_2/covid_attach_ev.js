$('.modal').modal({
    opacity: 0.8
})

$('#intro_modal').modal({
    opacity: 0.8,
    onCloseEnd: function() {
        $('.map_legend_control_container')
            .attr('data-tooltip', function() {
                return '<div class="init_instructions">Start exploring model results by clicking a parameter!</div>';

            })
            .tooltip({
                delay: 50,
                delayOut: 50000,
                position: 'left',
                html: true
            });


        setTimeout(function() {
            $(".map_legend_control_container").tooltip("open");
            var container = $(".init_instructions").parents().closest('.material-tooltip')

            //container.hide();

            setTimeout(function() {
                // container.css('top', container.position().top - ($(".country_li.main_li").height() / 2));
                container.show();

                $('.map_legend_control_container').on('mouseenter', function() {
                    $(this).removeAttr('data-tooltip');
                    container.remove()
                    $('.map_legend_control_container').unbind('mouseenter')
                })

            }, 100)
        }, 400)
    }
})

//navbar_events


//$('#slide-out').sidenav('close');
$('.indicators_li .collapsible-header').trigger('click')


$('#slide-out').sidenav({

    edge: 'left', // Choose the horizontal origin
    draggable: true, // Choose whether you can drag to open on touch screens,
    onOpenEnd: function(el) {

        //covid missing $('.sidenav-trigger')
        $('.sidenav-trigger').addClass('on');

    },

    onCloseEnd: function(el) {
        $('.sidenav-trigger').removeClass('on');
    }, // A function to be called when sideNav is closed
});



//covid missing icon?
//$('.icon_info').hide();
$('.icon_info').trigger('click');

//covid change class name
$('.icon_lollipop_close').click(function() {

    $('#lollipop_wrapper').fadeOut();

})

$('.collapsible').collapsible();

// {
//     onCloseEnd: function() {
//         if ($('.country_info').is(':visible') == false) {
//             $('.country_li').css('min-height', '0px')
//         }
//     }
// }