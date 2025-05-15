import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useState, useEffect } from "@wordpress/element";

import "./editor.scss";

export default function Edit() {
	const blockProps = useBlockProps();

	const [selectedQuiz, setSelectedQuiz] = useState("");
	const [questions, setQuestions] = useState([]);

	// Fetch all quiz posts
	const quizPosts = useSelect((select) => {
		return select("core").getEntityRecords("postType", "quiz", {
			per_page: -1,
		});
	}, []);

	// Fetch quiz metadata (like _question) when a quiz is selected
	useEffect(() => {
		if (!selectedQuiz) return;

		wp.apiFetch({ path: `/custom/v1/quiz/${selectedQuiz}` })
			.then((quizData) => {
				if (Array.isArray(quizData.questions)) {
					setQuestions(quizData.questions);
				} else {
					setQuestions([]);
				}
			})
			.catch((error) => {
				console.error("Failed to fetch quiz:", error);
				setQuestions([]);
			});
	}, [selectedQuiz]);

	// Handle dropdown change
	const handleChange = (event) => {
		setSelectedQuiz(event.target.value);
	};

	return (
		<div {...blockProps}>
			<p>{__("Select a Quiz", "react_app_quiz_plugin")}</p>

			{quizPosts ? (
				<select
					{...blockProps}
					style={{ border: "1px solid black", width: "100%", padding: "10px" }}
					value={selectedQuiz}
					onChange={handleChange}
				>
					<option value="">
						{__("-- Select Quiz --", "react_app_quiz_plugin")}
					</option>
					{quizPosts.map((quiz) => (
						<option key={quiz.id} value={quiz.id}>
							{quiz.title.rendered}
						</option>
					))}
				</select>
			) : (
				<p>{__("Loading quizzes...", "react_app_quiz_plugin")}</p>
			)}

			{questions.length > 0 && (
				<div className="question-list">
					<h4>{__("Questions:", "react_app_quiz_plugin")}</h4>
					<ol>
						{questions.map((q, i) => (
							<li key={i}>
								<p>
									<strong>{q.text}</strong>
								</p>
								<ul>
									{q.choices.map((choice, index) => (
										<li key={index}>
											{choice}
										</li>
									))}
								</ul>
							</li>
						))}
					</ol>
				</div>
			)}
		</div>
	);
}
