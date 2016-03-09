<?php

function enqueue_scripts(){
  wp_enqueue_style( 'style', get_stylesheet_uri() );
  wp_enqueue_script( 'app', get_template_directory_uri() . '/js/app.js', array( 'jquery' ),  true );
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');
?>
