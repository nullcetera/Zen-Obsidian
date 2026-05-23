import { MarkdownView, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, ZenModeSettings, ZenModeSettingTab } from './settings';

export default class ZenModePlugin extends Plugin {
	settings: ZenModeSettings;
	private dynamicStyleEl: HTMLStyleElement | null = null;
	private escHandler: ((e: KeyboardEvent) => void) | null = null;
	private isZen = false;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new ZenModeSettingTab(this.app, this));

		this.addCommand({
			id: 'toggle-zen',
			name: 'Toggle Zen Mode',
			callback: () => this.toggle(),
			hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'z' }],
		});
	}

	toggle() {
		this.isZen = !this.isZen;
		document.body.classList.toggle('ia-zen', this.isZen);
		this.isZen ? this.enter() : this.exit();
	}

	private enter() {
		this.app.workspace.leftSplit.collapse();
		this.app.workspace.rightSplit.collapse();
		this.injectDynamicStyles();

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			view.setState({ ...view.getState(), mode: 'preview' }, { history: false });
		}

		this.escHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				e.stopPropagation();
				this.toggle();
			}
		};
		document.addEventListener('keydown', this.escHandler, true);
	}

	private exit() {
		if (this.settings.restoreSidebars) {
			this.app.workspace.leftSplit.expand();
			this.app.workspace.rightSplit.expand();
		}
		this.dynamicStyleEl?.remove();
		this.dynamicStyleEl = null;

		if (this.escHandler) {
			document.removeEventListener('keydown', this.escHandler, true);
			this.escHandler = null;
		}

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			view.setState({ ...view.getState(), mode: 'source' }, { history: false });
		}
	}

	private injectDynamicStyles() {
		this.dynamicStyleEl?.remove();
		this.dynamicStyleEl = document.createElement('style');
		this.dynamicStyleEl.id = 'ia-zen-dynamic';
		this.dynamicStyleEl.textContent = `
			body.ia-zen .workspace-split.mod-root { max-width: ${this.settings.maxWidth}px !important; }
			body.ia-zen .markdown-preview-view { font-size: ${this.settings.fontSize}px !important; }
		`;
		document.head.appendChild(this.dynamicStyleEl);
	}

	onunload() {
		if (this.escHandler) {
			document.removeEventListener('keydown', this.escHandler, true);
		}
		this.dynamicStyleEl?.remove();
		document.body.classList.remove('ia-zen');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<ZenModeSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
