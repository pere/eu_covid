    $('select').formSelect();

    $('.dropdown-trigger').dropdown({
        inDuration: 300,
        constrainWidth: false,
        closeOnClick: false,
        container: '#layers_menu',
        outDuration: 225,
        hover: false, // Activate on hover,
        stopPropagation: true,
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });

    $('#slide-out').sidenav({

        edge: 'left', // Choose the horizontal origin
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpenEnd: function(el) {
            $('.sidenav-trigger').addClass('on');

        },

        onCloseEnd: function(el) {}, // A function to be called when sideNav is closed
    });

    $('.sidenav-trigger').on('click', function(e) {

            if ($(this).hasClass('on')) {
                e.preventDefault()
                $('#slide-out').sidenav('close').removeClass('sidenav_on');
                $(this).removeClass('on')
                return false
            }
        })
        //  $('.collapsible').collapsible();