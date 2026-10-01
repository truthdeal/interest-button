import './style.css'
import { renderFloatingHearts } from './hearts'
import { sendInterestPing } from './interest'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <main class="page">
    <div class="ambient" aria-hidden="true">
      <div class="ambient__base"></div>
      ${renderFloatingHearts()}
    </div>
    <div class="content">
      <p class="lead">Barış'tan ilgiye ihtiyacın olduğunda bas</p>
      <button type="button" class="interest-btn" id="interest-btn">
        <span class="interest-btn__ring" aria-hidden="true"></span>
        <span class="interest-btn__label">İlgi İsteme Butonu</span>
      </button>
      <p class="status" id="status" role="status" aria-live="polite"></p>
    </div>
  </main>
`

const btn = document.getElementById('interest-btn') as HTMLButtonElement
const status = document.getElementById('status') as HTMLParagraphElement

btn.addEventListener('click', async () => {
  if (btn.disabled) return

  btn.disabled = true
  btn.classList.add('interest-btn--active')

  status.textContent = ''
  status.classList.remove('status--visible', 'status--error')

  try {
    await sendInterestPing()
    status.textContent = 'İletildi.'
    status.classList.add('status--visible')
  } catch {
    status.textContent = 'Olmadı, bir daha dene.'
    status.classList.add('status--visible', 'status--error')
  }

  window.setTimeout(() => {
    btn.disabled = false
    btn.classList.remove('interest-btn--active')
    status.classList.remove('status--visible', 'status--error')
    status.textContent = ''
  }, 2400)
})
