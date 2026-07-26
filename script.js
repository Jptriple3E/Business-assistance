const launcher = document.getElementById('assistant-launcher');
const panel = document.getElementById('assistant-panel');
const closeBtn = document.getElementById('assistant-close');
const form = document.getElementById('assistant-form');
const input = document.getElementById('assistant-input');
const messagesEl = document.getElementById('assistant-messages');

let history = []; // [{role, content}]

launcher.addEventListener('click', () => {
  launcher.classList.add('hidden');
  panel.classList.remove('hidden');
  input.focus();
});

closeBtn.addEventListener('click', () => {
  panel.classList.add('hidden');
  launcher.classList.remove('hidden');
});

function addMessage(role, text, pending = false) {
  const div = document.createElement('div');
  div.className = `msg ${role}${pending ? ' pending' : ''}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  addMessage('user', text);
  history.push({ role: 'user', content: text });

  const pendingEl = addMessage('assistant', 'Thinking…', true);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Request failed');

    pendingEl.textContent = data.reply;
    pendingEl.classList.remove('pending');
    history.push({ role: 'assistant', content: data.reply });
  } catch (err) {
    pendingEl.textContent = "Sorry, something went wrong. Please try again.";
    pendingEl.classList.remove('pending');
    console.error(err);
  }
});
