const HEART_COUNT = 16

export function renderFloatingHearts(): string {
  const items = Array.from({ length: HEART_COUNT }, (_, i) => {
    const left = 4 + ((i * 17 + 7) % 92)
    const size = 0.55 + (i % 5) * 0.18
    const duration = 14 + (i % 6) * 2.5
    const delay = -(i * 1.35)
    const drift = -12 + (i % 7) * 4

    return `<span class="hearts__item" style="left:${left}%;--size:${size};--dur:${duration}s;--delay:${delay}s;--drift:${drift}px" aria-hidden="true">♥</span>`
  })

  return `<div class="hearts">${items.join('')}</div>`
}
