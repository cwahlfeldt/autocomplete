const template = document.createElement("template")
template.innerHTML = `
  <form id="autocomplete-form" autocomplete="off" action="">
    <div class="autocomplete">
      <input id="myInput" type="text" name="autocomplete">
    </div>
    <button id="openButton">open</button>
  </form>
`
template.style.display = 'block'

export default template