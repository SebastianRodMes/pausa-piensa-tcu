// Narración con la voz del navegador (funciona sin internet en la mayoría de equipos).
// No hay reproducción automática: siempre inicia con un toque o clic.

let voz: SpeechSynthesisVoice | null = null;

function elegirVoz() {
  if (!('speechSynthesis' in window)) return;
  const voces = speechSynthesis.getVoices();
  voz = voces.find((v) => /es[-_](CR|MX|US|419)/i.test(v.lang))
    || voces.find((v) => v.lang.toLowerCase().startsWith('es'))
    || null;
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  elegirVoz();
  speechSynthesis.onvoiceschanged = elegirVoz;
}

export function hablar(texto: string, cancelar = true) {
  if (!texto || !('speechSynthesis' in window)) return;
  if (cancelar) speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto.replace(/\s+/g, ' ').trim());
  u.lang = voz?.lang || 'es-CR';
  if (voz) u.voice = voz;
  u.rate = 0.92;
  u.pitch = 1.05;
  speechSynthesis.speak(u);
}

export function detenerVoz() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}
