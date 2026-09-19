import { cutil } from "@ghasemkiani/base";
import { pubsub } from "@ghasemkiani/base-utils";
import { DOM } from "@ghasemkiani/dom";
import { iwdom } from "@ghasemkiani/dom";
import { iwx } from "@ghasemkiani/xdom";

class Component extends cutil.mixin(DOM.window.HTMLElement, pubsub, iwdom, iwx) {
  static {
    cutil.extend(this, {
      is(name) {
        if (!DOM.window.customElements.get(name)) {
          DOM.window.customElements.define(name, this);
        } else {
          console.warn(`Element '${name}' was already defined.`)
        }
      }
    });
    cutil.extend(this.prototype, {
      open: true,
      _root: null,
      promise: null,
    });
  }
  get root() {
		if (cutil.na(this._root)) {
			this._root = this.attachShadow({ mode: this.open ? "open" : "closed" });
		}
		return this._root;
	}
	set root(root) {
		this._root = root;
	}
  constructor() {
    super();
    const { x } = this;
    const { root: node } = this;
    this.create({ x, node });
  }
  create({ x, node }) {
    this.promise = this.toCreate({ x, node });
  }
  async toCreate({ x, node }) {}
}

export { Component };
