<?php
function quiz_plugin_register_post_type() {
    register_post_type('quiz', array(
        'labels' => array(
            'name' => __('Quizzes'),
            'singular_name' => __('Quiz'),
            'add_new' => __('Add New Quiz'),
            'add_new_item' => __('Add New Quiz'),
            'edit_item' => __('Edit Quiz'),
            'new_item' => __('New Quiz'),
            'view_item' => __('View Quiz'),
            'search_items' => __('Search Quizzes'),
            'not_found' => __('No quizzes found'),
            'not_found_in_trash' => __('No quizzes found in Trash'),
        ),
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'quizzes'),
        'show_in_rest' => true,
        'supports' => array('title', 'custom-fields'),
        'menu_icon' => 'dashicons-welcome-learn-more',
        'rest_base' => 'quiz',
    ));
}
add_action('init', 'quiz_plugin_register_post_type');
