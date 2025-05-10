
import { __ } from '@wordpress/i18n';

import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'React App Quiz Plugin – hello from the editor!',
				'react_app_quiz_plugin'
			) }
		</p>
	);
}
