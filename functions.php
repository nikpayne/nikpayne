<?php

function enqueue_scripts(){
  wp_enqueue_style( 'style', get_stylesheet_uri() );
  wp_enqueue_script( 'app', get_template_directory_uri() . '/js/app.js', array( 'jquery' ),  false );
  wp_enqueue_script( 'handlebars', 'http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.min.js', array(),  false );
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');
?>
