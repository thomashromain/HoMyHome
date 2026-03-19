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

function register_slider_block() {
    // Note: We point to the 'build' folder, not 'src'
    register_block_type( __DIR__ . '/image-slider/build' );
}
add_action( 'init', 'register_slider_block' );

