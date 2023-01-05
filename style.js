
const style = document.createElement('style')
style.textContent = `
:host {
    --autocomplete-font: 16px Arial;
    --autocomplete-border: 2px solid transparent;
    --autocomplete-bg: #f1f1f1;
    --autocomplete-fg: #000000;
    --autocomplete-padding: 8px 16px;
    --autocomplete-border-radius: 8px;
    --autocomplete-button-content: 'open';
}

* { box-sizing: border-box; }

body {
    font: var(--autocomplete-font);
}

.autocomplete-form {
    display: flex;
    align-items: center;
    background-color: var(--autocomplete-bg);
    border-radius: var(--autocomplete-border-radius);
}

.autocomplete {
    border: var(--autocomplete-border);
    position: relative;
    width: 100%;
    display: inline-block;
}

input {
  border: none;
  padding: var(--autocomplete-padding);
  font-size: inherit;
}

input[type=text] {
  width: 100%;
  border-top-left-radius: var(--autocomplete-border-radius);
  border-bottom-left-radius: var(--autocomplete-border-radius);
}

.autocomplete-items {
  position: absolute;
  border: 1px solid var(--autocomplete-bg);
  border-bottom: none;
  z-index: 99;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
    font: var(--autocomplete-font);
}

.autocomplete-items div {
  cursor: pointer;
  background-color: #fff;
  border: 1px solid var(--autocomplete-bg);
}

.autocomplete-items div:hover {
  background-color: #e9e9e9;
}

.autocomplete-link {
    display: block;
    padding: 10px;
    width: 100%;
    color: var(--autocomplete-fg);
}

.autocomplete-active {
  background-color: DodgerBlue !important;
  color: #ffffff;
}

.hidden {
    width: 0;
    height: 0;
    position: absolute;
    top: -100vw;
    left: -100vw;
}

.autocomplete-toggle {
    padding-left: 16px;
    padding-right: 16px;
    border: none;
    background: none;
}

.autocomplete-toggle:after {
    content: var(--autocomplete-button-content);
    font: var(--autocomplete-font);
    color: var(--autocomplete-fg);
}

.autocomplete-active .autocomplete-toggle:after {
    content: 'close';
}
`

export default style