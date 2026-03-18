<?php
if ( ! function_exists( 'mytheme_fonts' ) ) :
    function mytheme_fonts() {
    wp_enqueue_style(
        'mytheme-fonts',
        get_template_directory_uri() . '/assets/fonts/fonts.css'
    );
}
add_action('wp_enqueue_scripts', 'mytheme_fonts');
endif;


