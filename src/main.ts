import { MarkdownView, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, ZenModeSettings, ZenModeSettingTab } from './settings';

export default class ZenModePlugin extends Plugin {
	settings: ZenModeSettings;
	private escHandler: ((e: KeyboardEvent) => void) | null = null;
	private isZen = false;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new ZenModeSettingTab(this.app, this));

		this.addCommand({
			id: 'toggle-zen',
			name: 'Toggle',
			callback: () => this.toggle(),
		});
	}

	toggle() {
		this.isZen = !this.isZen;
		document.body.classList.toggle('ia-zen', this.isZen);
		if (this.isZen) {
			this.enter();
		} else {
			this.exit();
		}
	}

	private enter() {
		this.app.workspace.leftSplit.collapse();
		this.app.workspace.rightSplit.collapse();
		this.applyDynamicVars();

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			void view.setState({ ...view.getState(), mode: 'preview' }, { history: false });
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
		this.clearDynamicVars();

		if (this.escHandler) {
			document.removeEventListener('keydown', this.escHandler, true);
			this.escHandler = null;
		}

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			void view.setState({ ...view.getState(), mode: 'source' }, { history: false });
		}
	}

	private applyDynamicVars() {
		document.body.style.setProperty('--zen-max-width', `${this.settings.maxWidth}px`);
		document.body.style.setProperty('--zen-font-size', `${this.settings.fontSize}px`);
	}

	private clearDynamicVars() {
		document.body.style.removeProperty('--zen-max-width');
		document.body.style.removeProperty('--zen-font-size');
	}

	onunload() {
		if (this.escHandler) {
			document.removeEventListener('keydown', this.escHandler, true);
		}
		this.clearDynamicVars();
		document.body.classList.remove('ia-zen');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<ZenModeSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
