<?php
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

