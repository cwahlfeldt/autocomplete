import template from './template.js';
import style from './style.js';

class Autocomplete extends HTMLElement {
    static get observedAttributes() {
        return ['options'];
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(style.cloneNode(true));
        this.shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log('auto-complete element added to page.');
    }

    disconnectedCallback() {
        console.log('auto-complete element removed from page.');
    }

    adoptedCallback() {
        console.log('auto-complete element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const options = name === 'options' ? JSON.parse(JSON.stringify(JSON.parse(newValue))) : [];
        console.log(options);
        autocomplete(this, options);
    }
}

window.customElements.define('auto-complete', Autocomplete);

function autocomplete(el, options) {
    let currentFocus;
    let i = 0;
    const shadow = el.shadowRoot;
    const input = shadow.querySelector('#myInput');
    const openButton = shadow.querySelector('#openButton')

    input.addEventListener('input', function (e) {
        let val = e.target.value;
        let list = document.createElement('div');
        let items = document.createElement('div');

        closeAllLists();

        if (!val) return false;

        currentFocus = -1;

        list.setAttribute('id', this.id + 'autocomplete-list');
        list.setAttribute('class', 'autocomplete-items');
        shadow.querySelector('.autocomplete').appendChild(list);

        for (i = 0; i < options.length; i++) {
            const optionLabel = options[i].label
            const optionUrl = options[i].url

            if (optionLabel.substring(0, val.length).toUpperCase() === val.toUpperCase()) {
                items = document.createElement('div');

                items.innerHTML = itemTemplate(optionLabel, val.length)

                items.addEventListener('click', function (e) {
                    input.value = this.getElementsByTagName('input')[0].value;
                    closeAllLists();
                });

                list.appendChild(items);
            }
        }
    });

    input.addEventListener('keydown', function (e) {
        let x = shadow.getElementById(this.id + 'autocomplete-list');

        if (x) x = x.getElementsByTagName('div');

        if (e.keyCode === 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    let open = false
    openButton.addEventListener('click', (e) => {
        e.preventDefault()
        if (!open) {
            toggleAllOptions()
        } else {
            closeAllLists()
        }

        open = !open
    })


    function toggleAllOptions() {
        let list = document.createElement('div');
        let items = document.createElement('div');

        closeAllLists();

        currentFocus = -1;

        list.setAttribute('id', '' + 'autocomplete-list');
        list.setAttribute('class', 'autocomplete-items');
        shadow.querySelector('.autocomplete').appendChild(list);

        for (i = 0; i < options.length; i++) {
            const optionLabel = options[i].label
            const optionUrl = options[i].url

            items = document.createElement('div');
            items.innerHTML = itemTemplate(optionLabel, optionLabel.length)

            list.appendChild(items);
        }
    }

    function itemTemplate(optionLabel, length) {
        return `
            <strong>${optionLabel.substring(0, length)}</strong>${optionLabel.substring(length)}
            <input type='hidden' value='${optionLabel}'>
        `;
    }

    function addActive(x) {
        if (!x) return false;

        removeActive(x);

        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;

        x[currentFocus].classList.add('autocomplete-active');
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove('autocomplete-active');
        }
    }

    function closeAllLists(el) {
        let x = shadow.querySelectorAll('.autocomplete-items');
        for (let i = 0; i < x.length; i++) {
            if (el !== x[i] && el !== input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
}
