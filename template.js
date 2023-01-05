const template = document.createElement("template")
template.innerHTML = `
  <form data-form id="autocomplete-form" class="autocomplete-form" autocomplete="off" action="">
    <div data-autocomplete class="autocomplete">
      <input data-input id="autocomplete-input" type="text" name="autocomplete">
    </div>
    <button data-open class="autocomplete-toggle" id="autocomplete-toggle"><span class="hidden">Open</span></button>
  </form>
`
template.style.display = 'block'

export default template