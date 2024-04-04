import { r as o, h as t, H as e, g as n } from "./p-2bbc009f.js";
import { b as r, c as i, t as a } from "./p-c0077c72.js";
const d =
	":host,*,*:before,*:after{box-sizing:border-box}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.component:active button.sr-only-focusable.chip,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.button-reset{font-family:TheSans, sans-serif;font-weight:500;line-height:24px;letter-spacing:-0.1px;font-size:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle;text-decoration:none;text-align:center;color:inherit;margin:0;transition:all 150ms cubic-bezier(0.4, 0, 0.6, 1);-webkit-tap-highlight-color:transparent;white-space:unset;padding:unset;border:none;background:transparent;user-select:none}.button-reset:focus{outline:0}.button-reset:not(:disabled){cursor:pointer}.button-reset::-moz-focus-inner{border:0}:host{display:inline-block;outline:none;width:auto;min-width:160px}:host(.chip){min-width:48px;cursor:pointer}:host(.chip) .component{height:48px}:host(.transparent){min-width:0;color:#086adb}:host(.disabled),:host(.loading){cursor:not-allowed}:host(.disabled) .component,:host(.loading) .component{pointer-events:none}:host(.loading) .icon,:host(.loading) .label{visibility:hidden}.component{position:relative;display:flex;align-items:center;justify-content:center}.component:hover .badge,.component:hover button.component.chip .badge{background:#ba3e06}.component .badge{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;border-radius:18px;color:#fff;font-size:13px;height:18px;line-height:18px;min-width:18px;max-width:50px;text-align:center;padding:0 5px;user-select:none;animation:badge 300ms linear both;background:#cf4a0c;pointer-events:none;transition:background 150ms cubic-bezier(0.4, 0, 0.6, 1);position:absolute;bottom:calc(100% - 13px);left:calc(100% - 9px)}@keyframes badge{0%{transform:scale(1)}25%{transform:scale(1.15)}50%{transform:scale(1)}75%{transform:scale(0.85)}100%{transform:scale(1)}}.component .clickable{display:flex;justify-content:center;align-items:center}.component .clickable .icon+.label{margin-left:8px}.primary,.secondary,.confirm,.cancel,.chip{width:100%;height:48px;padding:0 23px;border:1px solid #086adb;border-radius:8px;transform-origin:50% 50%}.primary:active,.secondary:active,.confirm:active,.cancel:active,.chip:active,.component:active button.chip{transform:scale(0.98)}.primary{border-color:#086adb;background-color:#086adb;color:#fff}.primary:active,.component:active button.primary.chip{border-color:#0048cf;background-color:#0048cf}@media (hover: hover){.primary:hover,.component:hover button.primary.chip,.primary:focus-visible{border-color:#0048cf;background-color:#0048cf}}.primary.disabled{border-color:transparent;background-color:rgba(8, 106, 219, 0.4);color:rgba(255, 255, 255, 0.6)}.secondary{border-color:#086adb;background-color:#fff;color:#086adb}.secondary:active,.component:active button.secondary.chip{border-color:#0048cf;background-color:#d1e6f9;color:#0048cf}@media (hover: hover){.secondary:hover,.component:hover button.secondary.chip,.secondary:focus-visible{border-color:#0048cf;background-color:#d1e6f9;color:#0048cf}}.secondary.disabled{border-color:rgba(8, 106, 219, 0.4);background-color:rgba(255, 255, 255, 0.4);color:rgba(8, 106, 219, 0.4)}.confirm{border-color:#1b8712;background-color:#1b8712;color:#fff}.confirm:active,.component:active button.confirm.chip{border-color:#0d6f2c;background-color:#0d6f2c}@media (hover: hover){.confirm:hover,.component:hover button.confirm.chip,.confirm:focus-visible{border-color:#0d6f2c;background-color:#0d6f2c}}.confirm.disabled{border-color:transparent;background-color:rgba(27, 135, 18, 0.4)}.transparent{padding:0;margin:0;border:none;outline:none;user-select:none;background-color:transparent;color:inherit}.transparent.invalid{color:#d12}.transparent:active,.component:active button.transparent.chip{color:#0048cf}.transparent:active.invalid,.component:active button.transparent.invalid.chip{color:#be0000}@media (hover: hover){.transparent:hover,.component:hover button.transparent.chip,.transparent:focus-visible{color:#0048cf}.transparent:hover.invalid,.component:hover button.transparent.invalid.chip,.transparent:focus-visible.invalid{color:#be0000}}.transparent.disabled,.transparent.disabled.invalid{color:rgba(51, 51, 51, 0.4)}.cancel{border-color:transparent;background-color:transparent;color:#086adb}.cancel:active,.component:active button.cancel.chip{border-color:#d1e6f9;background-color:#d1e6f9;color:#0048cf}@media (hover: hover){.cancel:hover,.component:hover button.cancel.chip,.cancel:focus-visible{border-color:#d1e6f9;background-color:#d1e6f9;color:#0048cf}}.chip{font-weight:400;font-size:16px;border-color:#dde3e7;background-color:#dde3e7;width:auto;height:32px;padding:10px}.chip:active,.component:active button.chip{border-color:#b1b9be;background-color:#b1b9be}@media (hover: hover){.chip:hover,.component:hover button.chip,.chip:focus-visible{border-color:#b1b9be;background-color:#b1b9be}}.chip .label~.icon{margin-left:8px}.loading-spinner-container{position:absolute;left:0;right:0;display:flex;justify-content:center}.h4{line-height:24px;letter-spacing:-0.1px;font-size:20px}@media (min-width: 1024px){.h4{line-height:32px;letter-spacing:-0.35px;font-size:24px}}:host(.sdx--dark-theme) .primary.no-background,:host(.sdx--dark-theme) .primary.no-background.invalid,:host(.sdx--dark-theme) .secondary.no-background,:host(.sdx--dark-theme) .secondary.no-background.invalid,:host(.sdx--dark-theme) .confirm.no-background,:host(.sdx--dark-theme) .confirm.no-background.invalid,:host(.sdx--dark-theme) .transparent.no-background,:host(.sdx--dark-theme) .transparent.no-background.invalid,:host(.sdx--light-theme) .primary.no-background,:host(.sdx--light-theme) .primary.no-background.invalid,:host(.sdx--light-theme) .secondary.no-background,:host(.sdx--light-theme) .secondary.no-background.invalid,:host(.sdx--light-theme) .confirm.no-background,:host(.sdx--light-theme) .confirm.no-background.invalid,:host(.sdx--light-theme) .transparent.no-background,:host(.sdx--light-theme) .transparent.no-background.invalid{border-color:#fff;background-color:transparent;color:#fff}:host(.sdx--dark-theme) .primary.no-background:active,:host(.sdx--dark-theme) .component:active button.primary.no-background.chip,:host(.sdx--dark-theme) .primary.no-background.invalid:active,:host(.sdx--dark-theme) .secondary.no-background:active,:host(.sdx--dark-theme) .component:active button.secondary.no-background.chip,:host(.sdx--dark-theme) .secondary.no-background.invalid:active,:host(.sdx--dark-theme) .confirm.no-background:active,:host(.sdx--dark-theme) .component:active button.confirm.no-background.chip,:host(.sdx--dark-theme) .confirm.no-background.invalid:active,:host(.sdx--dark-theme) .transparent.no-background:active,:host(.sdx--dark-theme) .component:active button.transparent.no-background.chip,:host(.sdx--dark-theme) .transparent.no-background.invalid:active,:host(.sdx--light-theme) .primary.no-background:active,:host(.sdx--light-theme) .component:active button.primary.no-background.chip,:host(.sdx--light-theme) .primary.no-background.invalid:active,:host(.sdx--light-theme) .secondary.no-background:active,:host(.sdx--light-theme) .component:active button.secondary.no-background.chip,:host(.sdx--light-theme) .secondary.no-background.invalid:active,:host(.sdx--light-theme) .confirm.no-background:active,:host(.sdx--light-theme) .component:active button.confirm.no-background.chip,:host(.sdx--light-theme) .confirm.no-background.invalid:active,:host(.sdx--light-theme) .transparent.no-background:active,:host(.sdx--light-theme) .component:active button.transparent.no-background.chip,:host(.sdx--light-theme) .transparent.no-background.invalid:active{background-color:rgba(255, 255, 255, 0.15)}@media (hover: hover){:host(.sdx--dark-theme) .primary.no-background:hover,:host(.sdx--dark-theme) .component:hover button.primary.no-background.chip,:host(.sdx--dark-theme) .primary.no-background:focus-visible,:host(.sdx--dark-theme) .primary.no-background.invalid:hover,:host(.sdx--dark-theme) .primary.no-background.invalid:focus-visible,:host(.sdx--dark-theme) .secondary.no-background:hover,:host(.sdx--dark-theme) .component:hover button.secondary.no-background.chip,:host(.sdx--dark-theme) .secondary.no-background:focus-visible,:host(.sdx--dark-theme) .secondary.no-background.invalid:hover,:host(.sdx--dark-theme) .secondary.no-background.invalid:focus-visible,:host(.sdx--dark-theme) .confirm.no-background:hover,:host(.sdx--dark-theme) .component:hover button.confirm.no-background.chip,:host(.sdx--dark-theme) .confirm.no-background:focus-visible,:host(.sdx--dark-theme) .confirm.no-background.invalid:hover,:host(.sdx--dark-theme) .confirm.no-background.invalid:focus-visible,:host(.sdx--dark-theme) .transparent.no-background:hover,:host(.sdx--dark-theme) .component:hover button.transparent.no-background.chip,:host(.sdx--dark-theme) .transparent.no-background:focus-visible,:host(.sdx--dark-theme) .transparent.no-background.invalid:hover,:host(.sdx--dark-theme) .transparent.no-background.invalid:focus-visible,:host(.sdx--light-theme) .primary.no-background:hover,:host(.sdx--light-theme) .component:hover button.primary.no-background.chip,:host(.sdx--light-theme) .primary.no-background:focus-visible,:host(.sdx--light-theme) .primary.no-background.invalid:hover,:host(.sdx--light-theme) .primary.no-background.invalid:focus-visible,:host(.sdx--light-theme) .secondary.no-background:hover,:host(.sdx--light-theme) .component:hover button.secondary.no-background.chip,:host(.sdx--light-theme) .secondary.no-background:focus-visible,:host(.sdx--light-theme) .secondary.no-background.invalid:hover,:host(.sdx--light-theme) .secondary.no-background.invalid:focus-visible,:host(.sdx--light-theme) .confirm.no-background:hover,:host(.sdx--light-theme) .component:hover button.confirm.no-background.chip,:host(.sdx--light-theme) .confirm.no-background:focus-visible,:host(.sdx--light-theme) .confirm.no-background.invalid:hover,:host(.sdx--light-theme) .confirm.no-background.invalid:focus-visible,:host(.sdx--light-theme) .transparent.no-background:hover,:host(.sdx--light-theme) .component:hover button.transparent.no-background.chip,:host(.sdx--light-theme) .transparent.no-background:focus-visible,:host(.sdx--light-theme) .transparent.no-background.invalid:hover,:host(.sdx--light-theme) .transparent.no-background.invalid:focus-visible{background-color:rgba(255, 255, 255, 0.15)}}:host(.sdx--dark-theme) .primary.no-background.disabled,:host(.sdx--dark-theme) .primary.no-background.invalid.disabled,:host(.sdx--dark-theme) .secondary.no-background.disabled,:host(.sdx--dark-theme) .secondary.no-background.invalid.disabled,:host(.sdx--dark-theme) .confirm.no-background.disabled,:host(.sdx--dark-theme) .confirm.no-background.invalid.disabled,:host(.sdx--dark-theme) .transparent.no-background.disabled,:host(.sdx--dark-theme) .transparent.no-background.invalid.disabled,:host(.sdx--light-theme) .primary.no-background.disabled,:host(.sdx--light-theme) .primary.no-background.invalid.disabled,:host(.sdx--light-theme) .secondary.no-background.disabled,:host(.sdx--light-theme) .secondary.no-background.invalid.disabled,:host(.sdx--light-theme) .confirm.no-background.disabled,:host(.sdx--light-theme) .confirm.no-background.invalid.disabled,:host(.sdx--light-theme) .transparent.no-background.disabled,:host(.sdx--light-theme) .transparent.no-background.invalid.disabled{border-color:rgba(255, 255, 255, 0.4);color:rgba(255, 255, 255, 0.4)}:host(.sdx--dark-theme) .primary.no-background.invalid:active,:host(.sdx--dark-theme) .component:active button.primary.no-background.invalid.chip,:host(.sdx--dark-theme) .primary.no-background.invalid.invalid:active,:host(.sdx--dark-theme) .secondary.no-background.invalid:active,:host(.sdx--dark-theme) .component:active button.secondary.no-background.invalid.chip,:host(.sdx--dark-theme) .secondary.no-background.invalid.invalid:active,:host(.sdx--dark-theme) .confirm.no-background.invalid:active,:host(.sdx--dark-theme) .component:active button.confirm.no-background.invalid.chip,:host(.sdx--dark-theme) .confirm.no-background.invalid.invalid:active,:host(.sdx--dark-theme) .transparent.no-background.invalid:active,:host(.sdx--dark-theme) .component:active button.transparent.no-background.invalid.chip,:host(.sdx--dark-theme) .transparent.no-background.invalid.invalid:active,:host(.sdx--light-theme) .primary.no-background.invalid:active,:host(.sdx--light-theme) .component:active button.primary.no-background.invalid.chip,:host(.sdx--light-theme) .primary.no-background.invalid.invalid:active,:host(.sdx--light-theme) .secondary.no-background.invalid:active,:host(.sdx--light-theme) .component:active button.secondary.no-background.invalid.chip,:host(.sdx--light-theme) .secondary.no-background.invalid.invalid:active,:host(.sdx--light-theme) .confirm.no-background.invalid:active,:host(.sdx--light-theme) .component:active button.confirm.no-background.invalid.chip,:host(.sdx--light-theme) .confirm.no-background.invalid.invalid:active,:host(.sdx--light-theme) .transparent.no-background.invalid:active,:host(.sdx--light-theme) .component:active button.transparent.no-background.invalid.chip,:host(.sdx--light-theme) .transparent.no-background.invalid.invalid:active{color:rgba(255, 255, 255, 0.8)}@media (hover: hover){:host(.sdx--dark-theme) .primary.no-background.invalid:hover,:host(.sdx--dark-theme) .component:hover button.primary.no-background.invalid.chip,:host(.sdx--dark-theme) .primary.no-background.invalid:focus-visible,:host(.sdx--dark-theme) .primary.no-background.invalid.invalid:hover,:host(.sdx--dark-theme) .primary.no-background.invalid.invalid:focus-visible,:host(.sdx--dark-theme) .secondary.no-background.invalid:hover,:host(.sdx--dark-theme) .component:hover button.secondary.no-background.invalid.chip,:host(.sdx--dark-theme) .secondary.no-background.invalid:focus-visible,:host(.sdx--dark-theme) .secondary.no-background.invalid.invalid:hover,:host(.sdx--dark-theme) .secondary.no-background.invalid.invalid:focus-visible,:host(.sdx--dark-theme) .confirm.no-background.invalid:hover,:host(.sdx--dark-theme) .component:hover button.confirm.no-background.invalid.chip,:host(.sdx--dark-theme) .confirm.no-background.invalid:focus-visible,:host(.sdx--dark-theme) .confirm.no-background.invalid.invalid:hover,:host(.sdx--dark-theme) .confirm.no-background.invalid.invalid:focus-visible,:host(.sdx--dark-theme) .transparent.no-background.invalid:hover,:host(.sdx--dark-theme) .component:hover button.transparent.no-background.invalid.chip,:host(.sdx--dark-theme) .transparent.no-background.invalid:focus-visible,:host(.sdx--dark-theme) .transparent.no-background.invalid.invalid:hover,:host(.sdx--dark-theme) .transparent.no-background.invalid.invalid:focus-visible,:host(.sdx--light-theme) .primary.no-background.invalid:hover,:host(.sdx--light-theme) .component:hover button.primary.no-background.invalid.chip,:host(.sdx--light-theme) .primary.no-background.invalid:focus-visible,:host(.sdx--light-theme) .primary.no-background.invalid.invalid:hover,:host(.sdx--light-theme) .primary.no-background.invalid.invalid:focus-visible,:host(.sdx--light-theme) .secondary.no-background.invalid:hover,:host(.sdx--light-theme) .component:hover button.secondary.no-background.invalid.chip,:host(.sdx--light-theme) .secondary.no-background.invalid:focus-visible,:host(.sdx--light-theme) .secondary.no-background.invalid.invalid:hover,:host(.sdx--light-theme) .secondary.no-background.invalid.invalid:focus-visible,:host(.sdx--light-theme) .confirm.no-background.invalid:hover,:host(.sdx--light-theme) .component:hover button.confirm.no-background.invalid.chip,:host(.sdx--light-theme) .confirm.no-background.invalid:focus-visible,:host(.sdx--light-theme) .confirm.no-background.invalid.invalid:hover,:host(.sdx--light-theme) .confirm.no-background.invalid.invalid:focus-visible,:host(.sdx--light-theme) .transparent.no-background.invalid:hover,:host(.sdx--light-theme) .component:hover button.transparent.no-background.invalid.chip,:host(.sdx--light-theme) .transparent.no-background.invalid:focus-visible,:host(.sdx--light-theme) .transparent.no-background.invalid.invalid:hover,:host(.sdx--light-theme) .transparent.no-background.invalid.invalid:focus-visible{color:rgba(255, 255, 255, 0.8)}}:host(.sdx--dark-theme) .component .badge{background-color:#ce4a0c}:host(.sdx--dark-theme) .component .badge:hover,:host(.sdx--dark-theme) .component:hover button.badge.chip{background-color:#de4f0d}:host(.sdx--dark-theme) .primary{border-color:#0a71e9;background-color:#0a71e9}:host(.sdx--dark-theme) .primary:active,:host(.sdx--dark-theme) .component:active button.primary.chip{border-color:#147df5;background-color:#147df5}@media (hover: hover){:host(.sdx--dark-theme) .primary:hover,:host(.sdx--dark-theme) .component:hover button.primary.chip,:host(.sdx--dark-theme) .primary:focus-visible{border-color:#147df5;background-color:#147df5}}:host(.sdx--dark-theme) .primary.disabled{background-color:rgba(10, 113, 233, 0.4);border-color:transparent}:host(.sdx--dark-theme) .secondary{border-color:#4294ff;background-color:transparent;color:#4294ff}:host(.sdx--dark-theme) .secondary:active,:host(.sdx--dark-theme) .component:active button.secondary.chip{border-color:#5ca3ff;background-color:rgba(66, 148, 255, 0.15);color:#5ca3ff}@media (hover: hover){:host(.sdx--dark-theme) .secondary:hover,:host(.sdx--dark-theme) .component:hover button.secondary.chip,:host(.sdx--dark-theme) .secondary:focus-visible{border-color:#5ca3ff;background-color:rgba(66, 148, 255, 0.15);color:#5ca3ff}}:host(.sdx--dark-theme) .secondary.disabled{border-color:rgba(66, 148, 255, 0.4);color:rgba(66, 148, 255, 0.4)}:host(.sdx--dark-theme) .confirm{border-color:#1c8912;background-color:#1c8912}:host(.sdx--dark-theme) .confirm:active,:host(.sdx--dark-theme) .component:active button.confirm.chip{border-color:#1f9414;background-color:#1f9414}@media (hover: hover){:host(.sdx--dark-theme) .confirm:hover,:host(.sdx--dark-theme) .component:hover button.confirm.chip,:host(.sdx--dark-theme) .confirm:focus-visible{border-color:#1f9414;background-color:#1f9414}}:host(.sdx--dark-theme) .confirm.disabled{background-color:rgba(28, 137, 18, 0.4);border-color:transparent}:host(.sdx--dark-theme) .transparent.invalid{color:#f35d6a}:host(.sdx--dark-theme) .transparent:active,:host(.sdx--dark-theme) .component:active button.transparent.chip{color:#5ca3ff}:host(.sdx--dark-theme) .transparent:active.invalid,:host(.sdx--dark-theme) .component:active button.transparent.invalid.chip{color:#fe7e89}@media (hover: hover){:host(.sdx--dark-theme) .transparent:hover,:host(.sdx--dark-theme) .component:hover button.transparent.chip,:host(.sdx--dark-theme) .transparent:focus-visible{color:#5ca3ff}:host(.sdx--dark-theme) .transparent:hover.invalid,:host(.sdx--dark-theme) .component:hover button.transparent.invalid.chip,:host(.sdx--dark-theme) .transparent:focus-visible.invalid{color:#fe7e89}}:host(.sdx--dark-theme) .transparent.disabled,:host(.sdx--dark-theme) .transparent.disabled.invalid{color:rgba(92, 92, 92, 0.8)}:host(.sdx--dark-theme) .cancel{color:#4294ff}:host(.sdx--dark-theme) .cancel:active,:host(.sdx--dark-theme) .component:active button.cancel.chip{border-color:transparent;background-color:rgba(66, 148, 255, 0.15);color:#5ca3ff}@media (hover: hover){:host(.sdx--dark-theme) .cancel:hover,:host(.sdx--dark-theme) .component:hover button.cancel.chip,:host(.sdx--dark-theme) .cancel:focus-visible{border-color:transparent;background-color:rgba(66, 148, 255, 0.15);color:#5ca3ff}}:host(.sdx--dark-theme) .chip{border-color:#5c5c5c;background-color:#5c5c5c}:host(.sdx--dark-theme) .chip:active,:host(.sdx--dark-theme) .component:active button.chip{border-color:#8c8c8c;background-color:#8c8c8c}@media (hover: hover){:host(.sdx--dark-theme) .chip:hover,:host(.sdx--dark-theme) .component:hover button.chip,:host(.sdx--dark-theme) .chip:focus-visible{border-color:#8c8c8c;background-color:#8c8c8c}}:host(.transparent.sdx--dark-theme){color:#4294ff}";
const s = d;
const c = class {
	disabledChanged() {
		if (this.lightDOMHiddenSubmitEl) {
			this.lightDOMHiddenSubmitEl.disabled = this.disabled;
		}
	}
	async doFocus() {
		var o;
		(o = this.focusableEl) === null || o === void 0 ? void 0 : o.focus();
	}
	onTouchStart() {}
	onClick(o) {
		var t;
		if (this.disabled || this.loading) {
			o.stopPropagation();
			return;
		}
		(t = this.lightDOMHiddenSubmitEl) === null || t === void 0 ? void 0 : t.click();
	}
	constructor(t) {
		o(this, t);
		this.theme = "primary";
		this.background = "light";
		this.disabled = false;
		this.href = "";
		this.target = undefined;
		this.label = "";
		this.iconName = undefined;
		this.iconSize = undefined;
		this.srHint = "";
		this.ariaExpandedOnButton = undefined;
		this.badge = "";
		this.type = "button";
		this.loading = false;
		this.valid = undefined;
		if (this.type === "submit") {
			this.lightDOMHiddenSubmitEl = document.createElement("input");
			this.lightDOMHiddenSubmitEl.type = this.type;
			this.lightDOMHiddenSubmitEl.disabled = this.disabled;
			this.lightDOMHiddenSubmitEl.hidden = true;
			this.lightDOMHiddenSubmitEl.onclick = (o) => o.stopPropagation();
			this.el.append(this.lightDOMHiddenSubmitEl);
		}
	}
	getHostClassNames() {
		return { [this.theme]: true, disabled: this.disabled, loading: this.loading, [r(this.el)]: true };
	}
	getButtonClassNames() {
		const o = this.getIconSize() || 1;
		return {
			clickable: true,
			"button-reset": true,
			[this.theme]: true,
			"no-background": this.background === "dark",
			disabled: this.disabled,
			invalid: this.valid === false,
			h4: o > 4,
		};
	}
	getAriaExpanded() {
		if (this.ariaExpandedOnButton === true) {
			return "true";
		} else if (this.ariaExpandedOnButton === false) {
			return "false";
		} else {
			return;
		}
	}
	getIconSize() {
		if (this.theme === "transparent") {
			return this.iconSize;
		}
		return;
	}
	isBadgeDisplayed() {
		return !!this.badge && this.theme === "transparent" && !this.label;
	}
	createLabel(o) {
		if (o) {
			return t("span", { class: "label" }, o);
		}
	}
	render() {
		const o = this.href ? "a" : "button";
		return t(
			e,
			{ class: this.getHostClassNames() },
			t(
				"div",
				{ class: "component" },
				t(
					o,
					{
						ref: (o) => (this.focusableEl = o),
						class: this.getButtonClassNames(),
						href: this.href,
						target: this.target,
						disabled: this.disabled,
						tabIndex: this.disabled || this.loading ? -1 : undefined,
						type: this.type,
						"aria-expanded": this.getAriaExpanded(),
					},
					this.loading &&
						t(
							"div",
							{ class: "loading-spinner-container", "aria-live": "polite" },
							t("sdx-loading-spinner", { srHint: this.srHint || undefined, strokeInherit: true }),
						),
					this.theme === "chip" && this.createLabel(this.label),
					(this.theme === "chip" || this.iconName) &&
						t("sdx-icon", {
							class: "icon",
							size: this.getIconSize(),
							iconName: this.theme === "chip" ? "icon-clear-circle" : this.iconName,
						}),
					this.theme !== "chip" && this.createLabel(this.label),
					this.srHint && t("span", { class: "sr-only" }, this.srHint),
				),
				this.isBadgeDisplayed() && t("span", { class: "badge" }, this.badge),
			),
		);
	}
	get el() {
		return n(this);
	}
	static get watchers() {
		return { disabled: ["disabledChanged"] };
	}
};
c.style = s;
const h =
	":host,*,*:before,*:after{box-sizing:border-box}:host{display:block;width:100%}.component{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
const l = h;
const b = class {
	constructor(t) {
		o(this, t);
		this.title = undefined;
	}
	onMouseOver() {
		if (!this.componentEl) {
			return;
		}
		if (this.title === this.el.textContent) {
			return;
		}
		if (this.componentEl.scrollWidth > this.componentEl.clientWidth) {
			this.title = this.el.textContent;
		}
	}
	render() {
		return t(
			"div",
			{ class: "component", title: this.title || undefined, ref: (o) => (this.componentEl = o) },
			t("slot", null),
		);
	}
	get el() {
		return n(this);
	}
};
b.style = l;
const m =
	":host,*,*:before,*:after{box-sizing:border-box}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}";
const u = m;
const v = class {
	constructor(t) {
		o(this, t);
		this.firstFocusableElement = undefined;
	}
	onKey(o) {
		var t;
		const e = o.key === "Tab";
		if (!e) {
			return;
		}
		const { startOfDialogHiddenEl: n, endOfDialogHiddenEl: r } = this;
		const i = (t = this.el.shadowRoot) === null || t === void 0 ? void 0 : t.activeElement;
		if (o.shiftKey) {
			if (i === n) {
				r === null || r === void 0 ? void 0 : r.focus();
				o.preventDefault();
			}
		} else {
			if (i === r) {
				this.setFocusToFirstElement();
				o.preventDefault();
			}
		}
	}
	async doFocus() {
		const { el: o, slotEl: t } = this;
		const e = o.contains(document.activeElement);
		const n = t === null || t === void 0 ? void 0 : t.assignedElements().some((o) => i(document.activeElement, o));
		if (!(n || e)) {
			this.setFocusToFirstElement();
		}
	}
	setFocusToFirstElement() {
		const { startOfDialogHiddenEl: o, firstFocusableElement: t } = this;
		t ? (t === null || t === void 0 ? void 0 : t.doFocus()) : o === null || o === void 0 ? void 0 : o.focus();
	}
	render() {
		return t(
			e,
			null,
			t(
				"div",
				{ class: "sr-only", "data-nosnippet": true, ref: (o) => (this.startOfDialogHiddenEl = o), tabindex: 0 },
				a("Start of dialog", this.el.lang),
			),
			t("slot", { ref: (o) => (this.slotEl = o) }),
			t(
				"div",
				{ class: "sr-only", "data-nosnippet": true, ref: (o) => (this.endOfDialogHiddenEl = o), tabindex: 0 },
				a("End of dialog", this.el.lang),
			),
		);
	}
	get el() {
		return n(this);
	}
};
v.style = u;
const p =
	":host,*,*:before,*:after{box-sizing:border-box}.component{display:flex;color:#d12;font-size:16px;margin-top:6px;margin-left:-8px}.component.sdx--dark-theme{color:#f35d6a}";
const g = p;
const k = class {
	constructor(t) {
		o(this, t);
		this.validationMessage = "";
	}
	getComponentClassNames() {
		return { component: true, [r(this.el)]: true };
	}
	render() {
		return t(
			"div",
			{ class: this.getComponentClassNames() },
			t("sdx-icon", { "icon-name": "icon-exclamation-mark", size: 2, "aria-hidden": "true" }),
			t("span", null, this.validationMessage),
		);
	}
	get el() {
		return n(this);
	}
};
k.style = g;
export { c as sdx_button, b as sdx_text_truncate, v as sdx_trap_focus, k as sdx_validation_message };
//# sourceMappingURL=p-196fc5fc.entry.js.map
