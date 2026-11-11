export class TallyCounterWidget extends HTMLElement {
  #count = 0;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host { display: block; max-width: 24rem; font: 1rem system-ui; }
        section { padding: 1rem; border: 1px solid #aebeb5; border-radius: 1rem; background: #f1f7f3; color: #10291d; text-align: center; }
        output { display: block; font: 700 4rem ui-monospace, monospace; margin-block-end: .5rem; overflow-wrap: anywhere; }
        button { padding: .6rem 1rem; border: 1px solid #8a9c92; border-radius: 2rem; background: white; color: inherit; font: inherit; }
        button[data-add="1"] { background: #17643d; color: white; border-color: #17643d; }
        button:disabled { opacity: .5; }
      </style>
      <section aria-label="Tally Counter">
        <output aria-live="polite" aria-label="Count">0</output>
        <button type="button" data-add="-1" aria-label="Subtract one" disabled>−</button>
        <button type="button" data-add="1" aria-label="Add one">+</button>
        <button type="button" data-reset>Reset</button>
      </section>`;
    const minus = this.shadowRoot.querySelector('[data-add="-1"]');
    const output = this.shadowRoot.querySelector('output');
    this.shadowRoot.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      this.#count = button.hasAttribute('data-reset')
        ? 0
        : Math.max(0, this.#count + Number(button.dataset.add));
      output.value = this.#count;
      minus.disabled = this.#count === 0;
    });
  }
}

if (!customElements.get('tally-counter-widget')) {
  customElements.define('tally-counter-widget', TallyCounterWidget);
}
