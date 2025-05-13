<?php


function quiz_plugin_add_meta_boxes() {
    add_meta_box(
        'quiz_questions_meta_box',
        'Quiz Questions',
        'quiz_plugin_render_questions_meta_box',
        'quiz',
        'normal',
        'default'
    );
}
add_action('add_meta_boxes', 'quiz_plugin_add_meta_boxes');


function quiz_plugin_render_questions_meta_box($post) {
    $questions = get_post_meta($post->ID, '_quiz_questions', true);
    if (!is_array($questions)) {
        $questions = [[]];
    }

    echo '<div id="quiz-questions-container">';
    foreach ($questions as $i => $q) {
        $q_text = $q['text'] ?? '';
        $choices = $q['choices'] ?? ['', '', '', ''];
        $correct = $q['correct'] ?? 1;

        echo '<div class="quiz-question" style="margin-bottom:20px;padding:10px;border:1px solid #ddd;background:#fafafa;">';
        echo '<label>Question Text:</label><br/>';
        echo '<input type="text" name="quiz_questions[' . $i . '][text]" value="' . esc_attr($q_text) . '" style="width:100%; margin-bottom:8px;" /><br/>';

        for ($j = 0; $j < 4; $j++) {
            $choice = esc_attr($choices[$j] ?? '');
            echo 'Answer ' . ($j + 1) . ': ';
            echo '<input type="text" name="quiz_questions[' . $i . '][choices][]" value="' . $choice . '" style="width:90%; margin-bottom:5px;" /><br/>';
        }

        echo '<label>Correct Answer (1-4):</label><br/>';
        echo '<input type="number" name="quiz_questions[' . $i . '][correct]" value="' . esc_attr($correct) . '" min="1" max="4" /><br/>';
        echo '</div>';
    }
    echo '</div>';

    echo '<button type="button" id="add-question-button" class="button">+ Add Question</button>';

    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function () {
        const addButton = document.getElementById('add-question-button');
        const container = document.getElementById('quiz-questions-container');

        let questionIndex = <?php echo count($questions); ?>;

        addButton.addEventListener('click', function () {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.style.marginBottom = '20px';
            questionDiv.style.padding = '10px';
            questionDiv.style.border = '1px solid #ddd';
            questionDiv.style.background = '#fafafa';

            questionDiv.innerHTML = `
                <label>Question Text:</label><br/>
                <input type="text" name="quiz_questions[\${questionIndex}][text]" style="width:100%; margin-bottom:8px;" /><br/>
                ${[1,2,3,4].map(i => `
                    Answer ${i}: <input type="text" name="quiz_questions[\${questionIndex}][choices][]" style="width:90%; margin-bottom:5px;" /><br/>
                `).join('')}
                <label>Correct Answer (1-4):</label><br/>
                <input type="number" name="quiz_questions[\${questionIndex}][correct]" value="1" min="1" max="4" /><br/>
            `;

            container.appendChild(questionDiv);
            questionIndex++;
        });
    });
    </script>
    <?php
}


function quiz_plugin_save_meta_box_data($post_id) {
    if (isset($_POST['quiz_questions']) && is_array($_POST['quiz_questions'])) {
        $clean_data = [];

        foreach ($_POST['quiz_questions'] as $question) {
            $text = sanitize_text_field($question['text'] ?? '');
            $choices = array_map('sanitize_text_field', $question['choices'] ?? []);
            $correct = intval($question['correct'] ?? 1);

            $clean_data[] = [
                'text' => $text,
                'choices' => $choices,
                'correct' => $correct
            ];
        }

        update_post_meta($post_id, '_quiz_questions', $clean_data);
    }
}
add_action('save_post', 'quiz_plugin_save_meta_box_data');
