<?php

function register_slider_block() {
    // Note: We point to the 'build' folder, not 'src'
    register_block_type( __DIR__ . '/image-slider/build' );
}
add_action( 'init', 'register_slider_block' );

function my_theme_enqueue_styles() {
    wp_enqueue_style('main-styles', get_template_directory_uri() . '/style.css');
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');

