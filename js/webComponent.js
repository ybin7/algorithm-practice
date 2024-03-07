class MyBox extends HTMLElement {
  constructor() {
    super()

    const tem = document.getElementById('my-box-tem')
    const temContent = tem.content
    const shadowRoot = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')

    style.textContent = `
      h1 { color: skyblue; }
      div { padding: 10px; margin: 10px; }
      p { color: red; }
    `

    shadowRoot.appendChild(style)
    shadowRoot.appendChild(temContent.cloneNode(true))
  }
}

customElements.define('my-box', MyBox)