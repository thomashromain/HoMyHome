<?php
/**
 * Plugin Name:       Atelier Iris Blocks
 * Description:       Example blocks scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Thomas ROMAIN
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       image-slider
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function create_block_image_slider_block_init() {
    // This looks for the block.json directly inside the build folder
    register_block_type( __DIR__ . '/build/image-slider' );
}
function create_block_map() {
    register_block_type( __DIR__ . '/build/map-caen' );
}

function create_block_email() {
    register_block_type( __DIR__ . '/build/email-form' );
}

add_action( 'init', 'create_block_image_slider_block_init' );
add_action( 'init', 'create_block_map' );
add_action( 'init', 'create_block_email' );

wp_enqueue_style( 'leaflet-css', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css' );

add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/send-email', [
        'methods' => 'POST',
        'callback' => 'atelier_iris_handle_email',
        'permission_callback' => '__return_true' // Consider adding a nonce check here later
    ]);
});

function atelier_iris_handle_email($request) {
    $params = $request->get_json_params();
    
    // 1. Basic validation: Check if required sections exist
    if ( !isset($params['header']) || !isset($params['body']) ) {
        return new WP_Error('invalid_data', 'Missing email sections', ['status' => 400]);
    }

    $to = get_option('admin_email');
    $subject = "Self-Sending Block Submission";
    
    // 2. Build the message with Sanitization
    $message = "--- HEADER SECTION ---\n";
    foreach($params['header'] as $title => $value) {
        $message .= sanitize_text_field($title) . ": " . sanitize_text_field($value) . "\n";
    }
    
    $message .= "\n--- BODY SECTION ---\n";
    foreach($params['body'] as $title => $value) {
        $message .= sanitize_text_field($title) . ": " . sanitize_textarea_field($value) . "\n";
    }

    // 3. Send
    $sent = wp_mail($to, $subject, $message);

    return rest_ensure_response(['success' => $sent]);
}
