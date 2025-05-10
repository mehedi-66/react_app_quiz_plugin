
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ 'React App Quiz Plugin – hello from the saved content!' }
		</p>
	);
}
