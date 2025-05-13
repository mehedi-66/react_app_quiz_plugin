<?php

add_action('rest_api_init', function () {
    
    register_rest_route('custom/v1', '/quizzes', [
        'methods' => 'GET',
        'callback' => 'get_basic_quizzes',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('custom/v1', '/quiz/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => 'get_quiz_by_id',
        'permission_callback' => '__return_true',
    ]);
});


function expose_quiz_questions_meta_to_rest() {
    register_post_meta('quiz', '_quiz_questions', [
        'type'         => 'array',
        'single'       => true,
        'show_in_rest' => [
            'schema' => [
                'type'  => 'array',
                'items' => [
                    'type'       => 'object',
                    'properties' => [
                        'text' => [ 'type' => 'string' ],
                        'choices' => [
                            'type'  => 'array',
                            'items' => [ 'type' => 'string' ],
                        ],
                        'correct' => [ 'type' => 'integer' ],
                    ]
                ]
            ]
        ],
    ]);
}
add_action('init', 'expose_quiz_questions_meta_to_rest');

function get_basic_quizzes() {
    $quizzes = get_posts([
        'post_type' => 'quiz',
        'numberposts' => -1,
        'post_status' => 'publish',
    ]);

    return array_map(function ($quiz) {
        return [
            'id' => $quiz->ID,
            'title' => get_the_title($quiz),
            'slug' => $quiz->post_name,
            'link' => get_permalink($quiz),
        ];
    }, $quizzes);
}

function get_quiz_by_id($data) {
    $quiz_id = $data['id'];
    $post = get_post($quiz_id);

    if (!$post || $post->post_type !== 'quiz') {
        return new WP_Error('not_found', 'Quiz not found', ['status' => 404]);
    }

    return [
        'id' => $post->ID,
        'title' => get_the_title($post),
        'slug' => $post->post_name,
        'link' => get_permalink($post),
        'questions' => get_post_meta($post->ID, '_quiz_questions', true),
    ];
}
