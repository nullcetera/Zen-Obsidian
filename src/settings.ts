import { App, PluginSettingTab, Setting } from 'obsidian';
import ZenModePlugin from './main';

export interface ZenModeSettings {
	maxWidth: number;
	fontSize: number;
	restoreSidebars: boolean;
}

export const DEFAULT_SETTINGS: ZenModeSettings = {
	maxWidth: 1080,
	fontSize: 19,
	restoreSidebars: true,
};

export class ZenModeSettingTab extends PluginSettingTab {
	plugin: ZenModePlugin;

	constructor(app: App, plugin: ZenModePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Max card width')
			.setDesc('Maximum width of the reading card in pixels.')
			.addText(text => text
				.setPlaceholder('1080')
				.setValue(String(this.plugin.settings.maxWidth))
				.onChange(async (value) => {
					const n = parseInt(value, 10);
					if (!isNaN(n) && n > 0) {
						this.plugin.settings.maxWidth = n;
						await this.plugin.saveSettings();
					}
				}));

		new Setting(containerEl)
			.setName('Font size')
			.setDesc('Reading font size in pixels.')
			.addText(text => text
				.setPlaceholder('19')
				.setValue(String(this.plugin.settings.fontSize))
				.onChange(async (value) => {
					const n = parseInt(value, 10);
					if (!isNaN(n) && n > 0) {
						this.plugin.settings.fontSize = n;
						await this.plugin.saveSettings();
					}
				}));

		new Setting(containerEl)
			.setName('Restore sidebars on exit')
			.setDesc('Re-expand both sidebars when leaving Zen Mode.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.restoreSidebars)
				.onChange(async (value) => {
					this.plugin.settings.restoreSidebars = value;
					await this.plugin.saveSettings();
				}));
	}
}
