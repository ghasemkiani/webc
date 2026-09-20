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
      },
      make({ x, node, ...rest } = {}, f = null) {
        const Cmp = this;
        const cmp = new Cmp({ x, node, ...rest });
        x.ap(node, cmp);
        x.chain(cmp, f);
        return cmp;
      },
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
  constructor(arg) {
    super();
    cutil.extend(this, arg);
    const { x, node, root } = this;
    this.create({ x, node, root });
  }
  create({ x, node, root }) {
    this.promise = this.toCreate({ x, node, root });
  }
  async toCreate({ x, node, root }) {}
}

export { Component };
