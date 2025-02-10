import { useSettingsStore } from '@/stores/settings.store';

const DEFAULT_TITLE = 'Workflow Automation';

export function useDocumentTitle() {
	const set = () => {
		document.title = DEFAULT_TITLE;
	};

	const reset = () => {
		set();
	};

	// Set the initial title
	set();

	return { set, reset };
}
