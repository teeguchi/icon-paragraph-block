<?php
/*
 * Plugin Name: Icon Paragraph Block
 * Description: ブロックエディターに、アイコン付きのカスタム段落ブロックを追加します。
 * Version:     1.0
 * Author:      TeeGuchi
 * Author URI:  https://teeguchi.com/
 * License:     GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: icon-paragraph-block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function icon_paragraph_block_register_block() {
	
	// Gutenberg is not active.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	
	wp_register_script(
        'icon-paragraph-options',
        plugins_url( 'ipb-options.js', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'ipb-options.js' )
    );
    
    wp_register_script(
        'icon-paragraph-block',
        plugins_url( 'icon-paragraph-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'icon-paragraph-options' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'icon-paragraph-block.js' )
    );
    
     wp_register_style(
        'icon-paragraph-block-font',
        plugins_url( 'fontawesome/css/all.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'fontawesome/css/all.css' )
    );
 
    wp_register_style(
        'icon-paragraph-block-editor',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks', 'icon-paragraph-block-font' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );
 
    wp_register_style(
        'icon-paragraph-block',
        plugins_url( 'style.css', __FILE__ ),
        array( 'icon-paragraph-block-font' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );
 
    register_block_type( 'icon-paragraph/block', array(
        'style' => 'icon-paragraph-block',
        'editor_style' => 'icon-paragraph-block-editor',
        'editor_script' => 'icon-paragraph-block',
    ) );
}
add_action( 'init', 'icon_paragraph_block_register_block' );
