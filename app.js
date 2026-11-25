/* وردة (0) - واجهة التطبيق. بدون أي مفاتيح سرية: مفتاح Gemini بيتحفظ في متصفح الطالب بس. */
(function () {
'use strict';
const HUE = window.HUE;
const cfg = window.WARDA_CONFIG || {};
const DEMO = !cfg.SUPABASE_URL || /^YOUR_/.test(cfg.SUPABASE_URL) || !cfg.SUPABASE_PUBLISHABLE_KEY || /^YOUR_/.test(cfg.SUPABASE_PUBLISHABLE_KEY);
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const GEMINI_URL = 'https://aistudio.google.com/apikey';
const DAY = 86400000;

/* ---------- تخزين ---------- */
const LS = {
  get(k, d) { try { const v = localStorage.getItem('warda:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('warda:' + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem('warda:' + k); } catch (e) {} }
};
const S = {
  chat: LS.get('chat', []), lectures: LS.get('lectures', []), lecText: LS.get('lectext', {}),
  wrongs: LS.get('wrongs', []), notes: LS.get('notes', []), plan: LS.get('plan', null), stats: LS.get('stats', {}),
  gpaRows: LS.get('gpa', [{ name: 'Math 1', h: 3, g: 'A-' }, { name: 'Physics 1', h: 3, g: 'B+' }]),
  active: LS.get('active', null), sessions: LS.get('sessions', []), confused: LS.get('confused', []), curId: LS.get('curId', null), theme: LS.get('theme', 'mix'), fb: LS.get('fb', {}), updated: LS.get('updated', 0)
};
const SYNCED = ['wrongs', 'notes', 'plan', 'stats', 'gpaRows', 'sessions', 'confused'];
let sb = null, session = null, pushTimer = null;
function save(...keys) {
  keys.forEach(k => {
    const map = { chat: 'chat', lectures: 'lectures', lecText: 'lectext', wrongs: 'wrongs', notes: 'notes', plan: 'plan', stats: 'stats', gpaRows: 'gpa', active: 'active', theme: 'theme', fb: 'fb', sessions: 'sessions', confused: 'confused', curId: 'curid' };
    let ok = LS.set(map[k], S[k]);
    if (!ok && k === 'sessions') { while (!ok && S.sessions.length > 1) { S.sessions.pop(); ok = LS.set('sessions', S.sessions); } }
    if (!ok && k === 'chat') { S.chat = S.chat.slice(-10); LS.set('chat', S.chat); }
    if (!ok && k === 'lecText') toast('مساحة التخزين امتلت. امسح محاضرات قديمة من الأدوات.');
  });
  if (keys.some(k => SYNCED.includes(k))) { S.updated = Date.now(); LS.set('updated', S.updated); schedulePush(); }
}
function mergeSessions(a, b) {
  const m = new Map();
  (a || []).concat(b || []).forEach(r => { if (!r || !r.id) return; const o = m.get(r.id); if (!o || r.ts > o.ts) m.set(r.id, r); });
  return Array.from(m.values()).sort((x, y) => (y.pin ? 1 : 0) - (x.pin ? 1 : 0) || y.ts - x.ts).slice(0, 30);
}
function schedulePush() {
  if (!sb || !session) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(async () => {
    try {
      const data = {}; SYNCED.forEach(k => data[k] = S[k]);
      await sb.from('user_data').upsert({ user_id: session.user.id, data, updated_at: new Date().toISOString() });
    } catch (e) { /* المزامنة اختيارية */ }
  }, 2000);
}
async function pullData() {
  if (!sb || !session) return;
  try {
    const { data } = await sb.from('user_data').select('data,updated_at').eq('user_id', session.user.id).maybeSingle();
    if (data && data.data && Array.isArray(data.data.sessions)) { S.sessions = mergeSessions(S.sessions, data.data.sessions); LS.set('sessions', S.sessions); }
    if (data && data.data && Array.isArray(data.data.confused)) { const m = new Map(); S.confused.concat(data.data.confused).forEach(r => { if (r && r.id && !m.has(r.id)) m.set(r.id, r); }); S.confused = Array.from(m.values()).sort((a, b) => b.ts - a.ts).slice(0, 30); LS.set('confused', S.confused); }
    if (data && data.data && new Date(data.updated_at).getTime() > S.updated) {
      SYNCED.forEach(k => { if (k !== 'sessions' && k !== 'confused' && data.data[k] !== undefined) S[k] = data.data[k]; });
      save('wrongs', 'notes', 'plan', 'stats', 'gpaRows'); S.updated = new Date(data.updated_at).getTime(); LS.set('updated', S.updated);
      renderAll();
    }
  } catch (e) { /* تجاهل */ }
}

/* ---------- أدوات صغيرة ---------- */
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
function toast(m) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2600); }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
const LATIN = /([A-Za-z0-9][A-Za-z0-9]*(?:[ \-\/'.^_+=()][A-Za-z0-9]+)*)/;
function inline(raw, maths) {
  // 1) حماية المعادلات 2) تلوين الكلمات الإنجليزي 3) bold وcode
  let t = String(raw || '');
  t = t.replace(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g, (m, a, b) => { if (!a && /^\s*[A-F](?:\+|-|\^\{?\+\}?|\^\{?-\}?)?\s*$/.test(b)) return '\uE002' + b.replace(/[\s{}^]/g, '') + '\uE003'; maths.push({ tex: (a || b).trim(), display: !!a }); return '\uE000' + (maths.length - 1) + '\uE001'; });
  const gr = []; t = t.replace(/\uE002([^\uE003]*)\uE003/g, (m, g) => { gr.push(g); return '\uE004' + (gr.length - 1) + '\uE005'; });
  const parts = t.split(LATIN);
  t = parts.map((p, i) => i % 2 && /[A-Za-z]/.test(p) ? '<span class="en">' + esc(p) + '</span>' : esc(p)).join('');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/\uE004(\d+)\uE005/g, (m, n) => '<span class="gsym">' + esc(gr[+n]) + '</span>');
  return t.replace(/\uE000(\d+)\uE001/g, (m, n) => katexHtml(maths[+n]));
}
function katexHtml(m) {
  try { if (window.katex) return window.katex.renderToString(m.tex, { throwOnError: false, displayMode: m.display, trust: false, strict: 'ignore' }); } catch (e) { /* fallthrough */ }
  return '<code>' + esc(m.tex) + '</code>';
}
function md(text) {
  const maths = []; const lines = String(text || '').replace(/\r/g, '').split('\n'); let out = '', list = null;
  const close = () => { if (list) { out += '</' + list + '>'; list = null; } };
  for (const ln of lines) {
    let m;
    if ((m = ln.match(/^\s*[-*•]\s+(.*)/))) { if (list !== 'ul') { close(); out += '<ul>'; list = 'ul'; } out += '<li>' + inline(m[1], maths) + '</li>'; }
    else if ((m = ln.match(/^\s*\d+[.)]\s+(.*)/))) { if (list !== 'ol') { close(); out += '<ol>'; list = 'ol'; } out += '<li>' + inline(m[1], maths) + '</li>'; }
    else if ((m = ln.match(/^\s*#{1,4}\s+(.*)/))) { close(); out += '<h4>' + inline(m[1], maths) + '</h4>'; }
    else if (!ln.trim()) { close(); }
    else { close(); out += '<div>' + inline(ln, maths) + '</div>'; }
  }
  close(); return out;
}
function eqHtml(tex) { return tex ? '<div class="eq">' + katexHtml({ tex, display: true }) + '</div>' : ''; }
function flowHtml(arr) {
  if (!arr || arr.length < 2) return '';
  return '<div class="flow">' + arr.map((x, i) => (i ? '<i>▼</i>' : '') + '<div>' + inline(x, []) + '</div>').join('') + '</div>';
}
function copyText(t) {
  const done = () => toast('اتنسخ ✓');
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(done, fallback); else fallback();
  function fallback() { const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); done(); } catch (e) { toast('معرفتش أنسخ'); } a.remove(); }
}
const plain = html => { const d = document.createElement('div'); d.innerHTML = html; return d.innerText || d.textContent || ''; };
function scrollDown(id) { const s = $(id || '#chatScroll'); requestAnimationFrame(() => s.scrollTop = s.scrollHeight); }

/* ---------- جملة اليوم ---------- */
const QUOTES = ['كل مادة بتخلصها النهارده بتفتحلك باب في الترم الجاي. كمّل!', 'خطوة صغيرة كل يوم أحسن من مذاكرة ليلة الامتحان.', 'مش لازم تكون مثالي، لازم تكمّل.', 'اللي بيذاكر النهارده بيرتاح يوم الامتحان.', 'الفهم أهم من الحفظ. اسأل لحد ما تفهم.', 'غلطة النهارده هي نقطة بتكسبها يوم الامتحان.', 'ركّز 25 دقيقة، وبعدين ريّح 5. وكرر.', 'الهندسة بتتبني طوبة طوبة. ابدأ بالأساس.', 'أنت أقوى من اللي بتفتكره.', 'نام كويس. المخ بيثبّت المعلومة وانت نايم.', 'سؤال "ليه؟" هو أقصر طريق للفهم.', 'ابدأ بالمادة الصعبة وانت نشيط.', 'كل مسألة بتحلها بتخليك أسرع في اللي بعدها.', 'التعب مؤقت، والتقدير بيفضل.', 'ذاكر شوية كل يوم، مش كتير مرة واحدة.', 'لو واقف عند حاجة، اطلب مثال تاني.', 'الأسئلة الغلط هي كنزك، راجعها.', 'مفيش حد وُلد فاهم Math. كلنا بنتعلم.', 'ريّح دماغك: مشي 10 دقايق بيفرق.', 'حدد هدف النهارده وخلّصه.', 'النجاح من 60%. وانت هتوصل أبعد من كده.', 'اشرب مياه وكمّل.', 'قارن نفسك بنفسك إمبارح، مش بحد تاني.', 'الامتحان مش عدو، هو فرصة تثبت اللي اتعلمته.', 'لخّص بكلامك. اللي تقدر تشرحه، تكون فهمته.', 'ابعد عن الموبايل ساعة وهتتفاجئ.', 'يوم راحة في الأسبوع بيخليك تكمّل أطول.', 'اتعلم من كل غلطة وابتسم.', 'قدّامك ترم جديد وفرصة جديدة.', 'حورس جامعتك، وانت بتبني مستقبلك فيها.'];
function dayOfYear(d) { return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / DAY); }

/* ---------- حساب الخطة ---------- */
function parseDate(s) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }
function ymd(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function buildPlan(p, from) {
  const exam = parseDate(p.exam); if (!exam) return { error: 'اختار تاريخ الامتحان.' };
  const start = new Date((from || new Date()).getFullYear(), (from || new Date()).getMonth(), (from || new Date()).getDate());
  const lectures = Math.max(1, Math.min(60, +p.lectures || 0)), hours = Math.max(1, Math.min(10, +p.hours || 0));
  const days = []; for (let d = new Date(start); d < exam; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) { if (+p.rest !== d.getDay() || p.rest === '' || p.rest == null || +p.rest < 0) days.push(new Date(d)); }
  if (exam <= start) return { error: 'تاريخ الامتحان لازم يكون بعد النهارده.' };
  const total = days.length; if (total < 1) return { error: 'مفيش أيام متاحة قبل الامتحان.' };
  let review = total >= 14 ? 7 : total >= 6 ? 2 : total >= 3 ? 1 : 0;
  if (total <= lectures && review) review = 0;
  const studyN = total - review; const rows = [];
  for (let i = 0; i < studyN; i++) {
    const a = Math.floor(i * lectures / studyN), b = Math.floor((i + 1) * lectures / studyN) - 1;
    const label = b < a ? 'تكملة + اختبار على الأسئلة الغلط' : a === b ? 'محاضرة ' + (a + 1) + ' + اختبار قصير' : 'محاضرات ' + (a + 1) + ' إلى ' + (b + 1) + ' + اختبار';
    rows.push({ date: ymd(days[i]), text: label, type: 'study' });
  }
  for (let j = 0; j < review; j++) rows.push({ date: ymd(days[studyN + j]), text: j === review - 1 ? 'امتحان تجريبي كامل + مراجعة الأسئلة الغلط' : 'مراجعة الملخصات والأسئلة الغلط', type: 'review' });
  const perDay = lectures / Math.max(1, studyN);
  return { rows, total, review, perDay, warn: hours / Math.max(perDay, 1) < 1 ? 'ساعات اليوم قليلة على عدد المحاضرات (أقل من ساعة للمحاضرة). زوّد الساعات أو قدّم البداية.' : '', exam: ymd(exam) };
}
function fmtDate(s) { const d = parseDate(s); return d ? d.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' }) : s; }
function renderTodayPlan() {
  const box = $('#todayPlan'); box.hidden = true;
  if (!S.plan) return;
  const r = buildPlan(S.plan); if (r.error) return;
  const today = ymd(new Date()), row = r.rows.find(x => x.date === today);
  const dleft = Math.ceil((parseDate(r.exam) - new Date()) / DAY);
  box.textContent = '📅 النهارده: ' + (row ? row.text : (S.plan.rest !== '' && +S.plan.rest === new Date().getDay() ? 'يوم راحة. ريّح.' : 'مفيش حاجة في الخطة')) + ' · فاضل ' + dleft + ' يوم على الامتحان' + (S.plan.name ? ' (' + S.plan.name + ')' : '');
  box.hidden = false;
}

/* ---------- API ---------- */
async function token() { if (!sb) return ''; try { const { data } = await sb.auth.getSession(); return data.session ? data.session.access_token : ''; } catch (e) { return ''; } }
async function api(body) {
  const headers = { 'Content-Type': 'application/json' };
  const t = await token(); if (t) headers.Authorization = 'Bearer ' + t;
  const k = LS.get('key', ''); if (k) headers['X-Gemini-Key'] = k;
  let r; try { r = await fetch('/api/ask', { method: 'POST', headers, body: JSON.stringify(body) }); } catch (e) { const er = new Error('مفيش اتصال بالسيرفر. اتأكد من النت.'); er.code = 'net'; throw er; }
  let j = null; try { j = await r.json(); } catch (e) { /* ignore */ }
  if (r.status === 401 && sb) { showAuth(); }
  if (!r.ok || !j || j.error) { const er = new Error((j && j.error) || 'حصل خطأ. جرّب تاني.'); er.code = j && j.code; throw er; }
  return j;
}
function errBubble(e) {
  const b = el('div', 'msg-b err', esc(e.message));
  if (e.code === 'no_key' || e.code === 'bad_key') { const c = el('div', 'row-btns'); const bt = el('button', 'chip p', 'افتح تبويب المفتاح'); bt.onclick = () => go('key'); c.append(bt); b.append(c); }
  return b;
}

/* ---------- المحاضرات (قراءة الملفات) ---------- */
const MAX_IMG_TOTAL = 3_000_000;
function readBuf(f) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsArrayBuffer(f); }); }
function canvasToB64(cv, q) { let qq = q; let s = cv.toDataURL('image/jpeg', qq).split(',')[1]; while (s.length > 600000 && qq > 0.3) { qq -= 0.15; s = cv.toDataURL('image/jpeg', qq).split(',')[1]; } return s; }
async function imageFileToB64(f) {
  const url = URL.createObjectURL(f);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('الصورة دي مش شغالة')); i.src = url; });
    const sc = Math.min(1, 1400 / Math.max(img.width, img.height)); const cv = document.createElement('canvas'); cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
    const ctx = cv.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height); ctx.drawImage(img, 0, 0, cv.width, cv.height);
    return canvasToB64(cv, 0.75);
  } finally { URL.revokeObjectURL(url); }
}
async function readPdf(f, notices) {
  if (!window.pdfjsLib) throw new Error('قارئ الـPDF مش متحمّل.');
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.js';
  const doc = await pdfjsLib.getDocument({ data: new Uint8Array(await readBuf(f)) }).promise;
  const n = doc.numPages; let text = ''; const pageText = [];
  for (let i = 1; i <= Math.min(n, 150); i++) { const pg = await doc.getPage(i); const tc = await pg.getTextContent(); const t = tc.items.map(x => x.str).join(' ').replace(/\s+/g, ' ').trim(); pageText.push(t); text += '\n[صفحة ' + i + ']\n' + t; }
  if (n > 150) notices.push(f.name + ': اتقرأ أول 150 صفحة بس من ' + n + '.');
  const all = pageText.join(''); const chars = all.length; const images = [];
  const pres = (all.match(/[\uFB50-\uFDFF\uFE70-\uFEFF]/g) || []).length, arab = (all.match(/[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/g) || []).length;
  const garbled = arab > 20 && pres / arab > 0.2; // نص عربي بحروف متفرقة ومعكوسة: أضمن نقراه كصور
  if (garbled || chars < 60 * Math.min(n, 150)) { // مصوّر (سكان): نحوّل صفحات لصور
    const pick = []; const want = Math.min(n, 8); for (let i = 0; i < want; i++) pick.push(Math.floor(i * n / want) + 1);
    for (const pn of pick) {
      const pg = await doc.getPage(pn); const v0 = pg.getViewport({ scale: 1 }); const sc = Math.min(2, 1100 / Math.max(v0.width, v0.height)); const vp = pg.getViewport({ scale: sc });
      const cv = document.createElement('canvas'); cv.width = Math.round(vp.width); cv.height = Math.round(vp.height); const ctx = cv.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
      await pg.render({ canvasContext: ctx, viewport: vp }).promise; images.push(canvasToB64(cv, 0.7));
    }
    notices.push(f.name + (garbled ? ': النص العربي جوه الملف ممكن يبقى مشوّه، ' : ': ملف مصوّر (مفيهوش نص). ') + 'هقرأ ' + pick.length + ' صفحة كصور' + (n > pick.length ? ' من ' + n + ' (موزّعة على الملف)' : '') + '.');
    if (garbled) text = text.normalize('NFKC'); else text = '';
  }
  return { text: text.trim(), images, pages: n };
}
async function ingestFiles(files) {
  const notices = []; let text = '', images = [], pages = 0; const names = [];
  for (const f of files) {
    const ext = (f.name.split('.').pop() || '').toLowerCase();
    if (f.size > 50 * 1024 * 1024) { notices.push(f.name + ': أكبر من 50MB.'); continue; }
    try {
      if (f.type === 'application/pdf' || ext === 'pdf') { const r = await readPdf(f, notices); text += '\n\n=== ' + f.name + ' ===\n' + r.text; images = images.concat(r.images.map(d => ({ mime: 'image/jpeg', data: d }))); pages += r.pages; names.push(f.name); }
      else if (f.type.startsWith('image/')) { if (f.size > 15 * 1024 * 1024) { notices.push(f.name + ': صورة كبيرة قوي.'); continue; } images.push({ mime: 'image/jpeg', data: await imageFileToB64(f) }); pages += 1; names.push(f.name); }
      else if (/^(txt|md)$/.test(ext) || f.type.startsWith('text/')) { text += '\n\n=== ' + f.name + ' ===\n' + (await f.text()); pages += 1; names.push(f.name); }
      else if (/^(docx|pptx|doc|ppt)$/.test(ext)) notices.push(f.name + ': Word وPowerPoint مش مدعومين دلوقتي. صدّره PDF الأول.');
      else notices.push(f.name + ': نوع الملف مش مدعوم.');
    } catch (e) { notices.push(f.name + ': معرفتش أقرأه (' + (e.message || 'خطأ') + ').'); }
  }
  text = text.trim();
  if (text.length > 120000) { text = text.slice(0, 120000); notices.push('النص طويل فاتقصّ عند 120 ألف حرف.'); }
  // حد الصور الكلي
  let tot = 0; const kept = []; for (const im of images.slice(0, 8)) { if (tot + im.data.length > MAX_IMG_TOTAL) break; tot += im.data.length; kept.push(im); }
  if (kept.length < images.length) notices.push('هقرأ ' + kept.length + ' صورة من ' + images.length + ' عشان الحجم.');
  return { name: names.join(' + ') || 'محاضرة', text, images: kept, pages, notices };
}
function lectureById(id) { return S.lectures.find(l => l.id === id); }
function lectureContext(id) { const l = lectureById(id); if (!l) return { lecture_text: '', lecture_name: '' }; return { lecture_text: (S.lecText[id] || l.digest || '').slice(0, 120000), lecture_name: l.name }; }
function digestOf(ex) { return ('ملخص: ' + ex.summary + '\n' + (ex.key_terms || []).map(t => t.en + ': ' + t.ar).join('\n') + '\n' + ex.steps.map((s, i) => (i + 1) + '. ' + s.title + ': ' + s.body).join('\n')).slice(0, 8000); }
function setActive(id) { S.active = id; save('active'); renderPending(); }

/* ---------- الشات ---------- */
let pendingFiles = [], busy = false;
const chatLog = () => $('#chatLog');
function pushChat(m) { S.chat.push(m); S.chat = S.chat.slice(-40); save('chat'); syncSession(); }
/* ---------- سجل المحادثات ---------- */
function chatTitle(c) { const f = c.find(m => m.role === 'u' && m.text); return f ? f.text.replace(/\s+/g, ' ').slice(0, 45) : 'محادثة جديدة'; }
function syncSession() {
  if (!S.chat.length) return;
  if (!S.curId) S.curId = uid();
  const i = S.sessions.findIndex(x => x.id === S.curId);
  const rec = { id: S.curId, title: chatTitle(S.chat), ts: Date.now(), chat: S.chat, pin: i >= 0 && S.sessions[i].pin ? 1 : 0 };
  if (i >= 0) S.sessions.splice(i, 1);
  S.sessions.unshift(rec); S.sessions = mergeSessions(S.sessions, []);
  save('sessions', 'curId');
}
function newChat() { syncSession(); S.chat = []; S.curId = null; save('chat', 'curId'); renderChat(); closeHistory(); }
function openSession(id) {
  const r = S.sessions.find(x => x.id === id); if (!r) return;
  syncSession(); S.chat = r.chat.slice(); S.curId = r.id; save('chat', 'curId'); renderChat(); closeHistory();
}
function closeHistory() { const o = $('#histBox'); if (o) o.remove(); }
function sessionText(r) { return (r.title + ' ' + r.chat.map(m => m.text || (m.ex && m.ex.summary) || '').join(' ')).toLowerCase(); }
function showHistory(filter) {
  const keep = $('#histQ') ? $('#histQ').value : (filter || '');
  closeHistory(); syncSession();
  const o = el('div', 'hist'); o.id = 'histBox';
  const card = el('div', 'hist-card'); o.append(card);
  const h = el('div', 'hist-h', '<b>سجل المحادثات</b>'); const x = el('button', 'chip', 'إغلاق'); x.type = 'button'; x.onclick = closeHistory; h.append(x); card.append(h);
  const nb = el('button', 'chip p', '＋ محادثة جديدة'); nb.type = 'button'; nb.onclick = newChat; card.append(nb);
  const q = el('input'); q.id = 'histQ'; q.type = 'search'; q.placeholder = 'دوّر في المحادثات…'; q.value = keep; card.append(q);
  const list = el('div', 'hist-list'); card.append(list);
  const draw = () => {
    list.innerHTML = ''; const k = q.value.trim().toLowerCase();
    const rows = S.sessions.filter(r => !k || sessionText(r).includes(k));
    if (!rows.length) list.append(el('p', 'muted', k ? 'مفيش محادثة فيها الكلمة دي.' : 'مفيش محادثات محفوظة لسه.'));
    rows.forEach(r => {
      const row = el('div', 'hist-row' + (r.id === S.curId ? ' cur' : ''));
      const t = el('button', 'hist-t', '<span>' + (r.pin ? '📌 ' : '') + esc(r.title) + '</span><small>' + esc(new Date(r.ts).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })) + ' · ' + r.chat.length + ' رسالة</small>');
      t.type = 'button'; t.onclick = () => openSession(r.id);
      const pn = el('button', 'chip' + (r.pin ? ' on' : ''), r.pin ? 'شيل التثبيت' : 'ثبّت'); pn.type = 'button';
      pn.onclick = () => { r.pin = r.pin ? 0 : 1; S.sessions = mergeSessions(S.sessions, []); save('sessions'); showHistory(); };
      const d = el('button', 'chip', 'حذف'); d.type = 'button';
      d.onclick = () => { if (!confirm('تمسح المحادثة دي؟')) return; S.sessions = S.sessions.filter(y => y !== r); save('sessions'); if (r.id === S.curId) { S.chat = []; S.curId = null; save('chat', 'curId'); renderChat(); } showHistory(); };
      row.append(t, pn, d); list.append(row);
    });
  };
  q.oninput = draw; draw();
  o.onclick = e => { if (e.target === o) closeHistory(); };
  document.body.append(o);
}
function srcTag(s) { return s === 'hue' ? 'من بيانات حورس' : s === 'lecture' ? 'من محاضرتك' : s === 'general' ? 'معلومة عامة، راجع مصدرك' : ''; }
function addUser(text) { const d = el('div', 'msg-u'); d.textContent = text; chatLog().append(d); scrollDown(); }
function botBubble(m, idx) {
  const b = el('div', 'msg-b'); b.innerHTML = md(m.text);
  const tg = srcTag(m.src); if (tg) b.append(el('span', 'tag', esc(tg)));
  const c = el('div', 'row-btns');
  const cp = el('button', 'chip', 'نسخ الرد'); cp.onclick = () => copyText(plain(md(m.text)));
  const ok = el('button', 'chip' + (S.fb[m.id] === 1 ? ' on' : ''), 'مفيد'), no = el('button', 'chip' + (S.fb[m.id] === -1 ? ' on' : ''), 'مش مفيد');
  const setFb = v => { S.fb[m.id] = S.fb[m.id] === v ? 0 : v; save('fb'); ok.classList.toggle('on', S.fb[m.id] === 1); no.classList.toggle('on', S.fb[m.id] === -1); };
  ok.onclick = () => setFb(1); no.onclick = () => setFb(-1);
  const nt = el('button', 'chip', 'حفظ في ملاحظاتي'); nt.onclick = () => { addNote(plain(md(m.text))); };
  const ns = el('button', 'chip p', 'مفهمتش'); ns.type = 'button';
  ns.onclick = () => { S.confused.unshift({ id: m.id || uid(), text: plain(md(m.text)).slice(0, 700), ts: Date.now() }); S.confused = S.confused.filter((x, i, a) => a.findIndex(y => y.id === x.id) === i).slice(0, 30); save('confused'); askChat('مفهمتش الشرح اللي فات. اشرحلي نفس الكلام ده بشكل أبسط وبمثال: «' + plain(md(m.text)).slice(0, 400) + '»'); };
  c.append(cp, ok, no, nt, ns); b.append(c); return b;
}
function renderChat() {
  const log = chatLog(); log.innerHTML = '';
  if (!S.chat.length) { const g = el('div', 'msg-b', 'أهلا أنا <b>وردة</b> 🌹 مساعدتك في ليفل زيرو. ارفع محاضرة PDF أو صور سلايدات، أو اسألني عن المواد والمتطلبات السابقة والتقديرات.'); log.append(g); }
  S.chat.forEach((m, i) => {
    if (m.role === 'u') { const d = el('div', 'msg-u'); d.textContent = m.text; log.append(d); }
    else if (m.kind === 'explain') { const b = el('div', 'msg-b'); log.append(b); renderExplain(b, m.ex, lectureById(m.lecId) || { id: m.lecId, name: m.ex.title }, true); }
    else if (m.err) { log.append(el('div', 'msg-b err', esc(m.text))); }
    else log.append(botBubble(m, i));
  });
  scrollDown();
}
function typing() { const t = el('div', 'msg-b', '<span class="typing"><i></i><i></i><i></i></span>'); chatLog().append(t); scrollDown(); return t; }
async function askChat(q) {
  if (busy) return; busy = true; setBusy(true);
  addUser(q); pushChat({ role: 'u', text: q });
  const t = typing();
  try {
    const hist = S.chat.slice(0, -1).filter(m => !m.err && m.kind !== 'explain').slice(-6).map(m => ({ role: m.role === 'u' ? 'user' : 'model', text: m.text }));
    const r = await api(Object.assign({ mode: 'chat', question: q, history: hist }, lectureContext(S.active)));
    t.remove(); const m = { role: 'b', id: uid(), text: r.answer, src: r.source }; pushChat(m); chatLog().append(botBubble(m)); scrollDown();
  } catch (e) { t.remove(); chatLog().append(errBubble(e)); scrollDown(); }
  busy = false; setBusy(false);
}
function setBusy(b) { $('#sendBtn').disabled = b; }
async function uploadAndExplain(note) {
  if (busy) return; busy = true; setBusy(true);
  const files = pendingFiles; pendingFiles = []; renderPending();
  addUser('📄 ' + files.map(f => f.name).join(' + ') + (note ? '\n' + note : '')); pushChat({ role: 'u', text: '📄 ' + files.map(f => f.name).join(' + ') + (note ? '\n' + note : '') });
  const t = typing(); t.innerHTML = '<span class="typing"><i></i><i></i><i></i></span> بقرا الملفات…';
  try {
    const lec = await ingestFiles(files);
    if (lec.notices.length) { chatLog().insertBefore(el('div', 'msg-b', lec.notices.map(esc).join('<br>')), t); }
    if (!lec.text && !lec.images.length) throw new Error('معرفتش أقرأ أي حاجة من الملفات. جرّب PDF أو صورة أوضح.');
    t.innerHTML = '<span class="typing"><i></i><i></i><i></i></span> بلخّص وبشرح… (ممكن ياخد دقيقة)';
    const r = await api({ mode: 'explain', question: note || '', lecture_text: lec.text, lecture_name: lec.name, images: lec.images });
    const L = { id: uid(), name: r.title || lec.name, created: Date.now(), chars: lec.text.length, scanned: !lec.text, pages: lec.pages, digest: digestOf(r) };
    S.lectures.unshift(L); S.lecText[L.id] = lec.text; S.lectures = S.lectures.slice(0, 15);
    Object.keys(S.lecText).forEach(k => { if (!lectureById(k)) delete S.lecText[k]; });
    save('lectures', 'lecText'); setActive(L.id);
    t.remove(); const b = el('div', 'msg-b'); chatLog().append(b); renderExplain(b, r, L, false);
    pushChat({ role: 'b', kind: 'explain', ex: r, lecId: L.id }); scrollDown(); renderLectures(); renderQuizHome();
  } catch (e) { t.remove(); chatLog().append(errBubble(e)); scrollDown(); }
  busy = false; setBusy(false);
}
function renderPending() {
  const p = $('#pending'); p.innerHTML = ''; p.hidden = true;
  pendingFiles.forEach((f, i) => { const x = el('span', 'pill', esc(f.name)); const b = el('button', null, '✕'); b.type = 'button'; b.setAttribute('aria-label', 'شيل الملف'); b.onclick = () => { pendingFiles.splice(i, 1); renderPending(); }; x.append(b); p.append(x); p.hidden = false; });
  if (!pendingFiles.length && S.active && lectureById(S.active)) { const l = lectureById(S.active); const x = el('span', 'pill', '📖 ' + esc(l.name) + ' (الشات بيتكلم عنها)'); const b = el('button', null, '✕'); b.type = 'button'; b.setAttribute('aria-label', 'شيل المحاضرة'); b.onclick = () => { S.active = null; save('active'); renderPending(); }; x.append(b); p.append(x); p.hidden = false; }
}
function renderQuick() {
  const q = $('#quick'); q.innerHTML = '';
  const A = t => () => askChat(t);
  [['🕘 السجل', () => showHistory()], ['＋ محادثة جديدة', newChat],
   ['حوّل نسبتي لتقدير', () => go('tools', 'conv')], ['احسب GPA', () => go('tools', 'gpa')],
   ['إيه بيتفتح بعد Physics 1؟', A('إيه المواد اللي بتتفتح بعد ما أنجح في Physics 1؟')],
   ['Physics 1 و 2', A('عرفني بمادتي Physics 1 و Physics 2: الساعات والمتطلب السابق.')],
   ['Mathematics 1 و 2', A('عرفني بمادتي Mathematics 1 و Mathematics 2: الساعات والمتطلب السابق.')],
   ['Mechanics 1 و 2', A('عرفني بمادتي Mechanics 1 و Mechanics 2: الساعات والمتطلب السابق.')],
   ['Chemistry', A('عرفني بمادة Engineering Chemistry: الساعات وفي أي فصل.')],
   ['Computer Skills', A('عرفني بمادة Computer Skills: الساعات وفي أي فصل.')],
   ['Engineering Drawing', A('عرفني بمادة Engineering Drawing & Projection: الساعات وفي أي فصل.')],
   ['English', A('عرفني بمادة English Language: الساعات وفي أي فصل.')],
   ['History of Engineering', A('عرفني بمادة History of Engineering & Technology: الساعات وفي أي فصل.')],
   ['Manufacturing', A('عرفني بمادة Principles of Manufacturing Engineering: الساعات وفي أي فصل.')],
   ['Water & Energy', A('عرفني بمادة Water, Energy & Climate Change Issues: الساعات وفي أي فصل.')],
   ['Human Rights', A('عرفني بمادة Human Rights: الساعات وفي أي فصل.')],
   ['مواد الترم الأول', A('إيه مواد الفصل الأول في ليفل 0 وساعات كل مادة؟')],
   ['مواد الترم التاني', A('إيه مواد الفصل التاني في ليفل 0 وساعات كل مادة؟')],
   ['الحضور والغياب', A('إيه قواعد الحضور والغياب في اللائحة؟')],
   ['النجاح والرسوب', A('إيه درجة النجاح في المادة، وإيه اللي بيحصل لو رسبت؟')],
   ['حد أقصى للساعات', A('إيه الحد الأقصى للساعات اللي أقدر أسجلها في الترم؟')]]
    .forEach(([t, f]) => { const b = el('button', 'chip', esc(t)); b.type = 'button'; b.onclick = f; q.append(b); });
}
function clearChat() { newChat(); }

/* ---------- الشرح خطوة بخطوة ---------- */
function renderExplain(box, ex, lec, all) {
  box.innerHTML = '';
  const N = ex.steps.length;
  const head = el('div', null, '<b>' + esc(ex.title || lec.name) + '</b> <span class="tag">' + N + ' خطوات' + (lec.pages ? ' · ' + lec.pages + ' صفحة' : '') + '</span><h4>ملخص المحاضرة</h4>' + md(ex.summary));
  if (ex.key_terms && ex.key_terms.length) head.innerHTML += '<h4>المصطلحات</h4><ul>' + ex.key_terms.map(t => '<li><span class="en">' + esc(t.en) + '</span>: ' + esc(t.ar) + '</li>').join('') + '</ul>';
  const steps = el('div'); const tail = el('div');
  box.append(head, steps, tail);
  let shown = 0;
  function showNext() { if (shown >= N) return; steps.append(stepEl(shown++)); if (shown >= N) tail.append(finish()); scrollDown(); }
  function finish() {
    const f = el('div', 'step'); f.innerHTML = '<b>خلصنا المحاضرة 🎉</b><div class="muted">جرّب نفسك دلوقتي.</div>';
    const c = el('div', 'row-btns'); const q = el('button', 'chip p', 'اعمل اختبار من المحاضرة'); q.onclick = () => { go('quiz'); startQuiz(lec.id); };
    const cp = el('button', 'chip', 'نسخ الملخص'); cp.onclick = () => copyText(ex.summary);
    const sv = el('button', 'chip', 'حفظ الملخص في ملاحظاتي'); sv.onclick = () => addNote((ex.title || lec.name) + ': ' + ex.summary);
    const pd = el('button', 'chip', 'تصدير PDF'); pd.onclick = () => summaryPdf(ex, lec);
    c.append(q, cp, sv, pd); f.append(c); return f;
  }
  function stepEl(i) {
    const s = ex.steps[i]; const d = el('div', 'step');
    d.innerHTML = '<div><span class="n">' + (i + 1) + '</span><b>' + esc(s.title) + '</b> <small class="muted">(' + (i + 1) + ' من ' + N + ')</small></div>' + md(s.body) + eqHtml(s.equation) + flowHtml(s.diagram);
    const extra = el('div'); d.append(extra);
    if (s.check) {
      const ck = el('div', 'check'); ck.innerHTML = '<b style="color:var(--rose)">سؤال سريع:</b> ' + inline(s.check.q, []); let done = false;
      const why = el('div', 'muted');
      s.check.options.forEach((o, k) => {
        const b = el('button', 'opt'); b.type = 'button'; b.innerHTML = inline(o, []);
        b.onclick = () => { if (done) return; done = true; $$('.opt', ck).forEach((x, j) => { x.disabled = true; if (j === s.check.answer) x.classList.add('ok'); else if (j === k) x.classList.add('no'); });
          if (k !== s.check.answer) { addWrong({ q: s.check.q, options: s.check.options, answer: s.check.answer, explanation: s.check.why, lecture: lec.name }); why.innerHTML = 'مش بالظبط. ' + md(s.check.why) + '<span class="tag">اتحفظت في أسئلتي الغلط</span>'; } else why.innerHTML = 'برافو ✓ ' + md(s.check.why);
          bumpStat(lec.name, k === s.check.answer); };
        ck.append(b);
      });
      ck.append(why); d.append(ck);
    }
    const c = el('div', 'row-btns');
    if (i === shown - 1 || all) {
      const nx = el('button', 'chip p', i === N - 1 ? 'فهمت ✓' : 'فهمت، الخطوة اللي بعدها ←'); nx.type = 'button';
      nx.onclick = () => { nx.disabled = true; if (!all) showNext(); else scrollDown(); };
      const no = el('button', 'chip', 'مفهمتش'); no.type = 'button';
      const opts = el('div', 'row-btns'); opts.hidden = true;
      [['example', 'اشرح بمثال تاني'], ['simpler', 'أبسّطها أكتر'], ['english', 'اشرحها بالإنجليزي'], ['diagram', 'رسم توضيحي']].forEach(([k, t]) => {
        const b = el('button', 'chip', t); b.type = 'button';
        b.onclick = async () => {
          if (busy) return; busy = true; b.disabled = true; const w = el('div', 'muted', 'ثانية واحدة…'); extra.append(w);
          try { const r = await api(Object.assign({ mode: 'reexplain', choice: k, step: { title: s.title, body: s.body } }, lectureContext(lec.id)));
            w.remove(); const n = el('div', 'note', '<b>' + esc(t) + '</b>' + md(r.body) + eqHtml(r.equation) + flowHtml(r.diagram)); extra.append(n); scrollDown();
          } catch (e) { w.remove(); extra.append(el('div', 'warn', esc(e.message))); }
          busy = false; b.disabled = false;
        };
        opts.append(b);
      });
      no.onclick = () => { opts.hidden = !opts.hidden; };
      c.append(nx, no); d.append(c, opts);
    }
    return d;
  }
  if (all) { for (let i = 0; i < N; i++) { steps.append(stepEl(i)); shown++; } tail.append(finish()); } else showNext();
}


/* ---------- تصدير PDF (طباعة المتصفح، حفظ كـ PDF) ---------- */
function exportPdf(title, bodyHtml) {
  let a = $('#printArea'); if (!a) { a = el('div'); a.id = 'printArea'; document.body.append(a); }
  a.innerHTML = '<h1>' + esc(title) + '</h1><div class="pdf-sub">وردة (0) · ' + esc(new Date().toLocaleDateString('ar-EG')) + '</div>' + bodyHtml;
  const old = document.title; document.title = String(title).replace(/[\\\/:*?"<>|]/g, ' ').slice(0, 60) || 'warda';
  const done = () => { document.body.classList.remove('printing'); document.title = old; window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done); document.body.classList.add('printing');
  toast('اختار "حفظ كـ PDF" من شاشة الطباعة');
  setTimeout(() => { try { window.print(); } catch (e) { done(); } }, 350);
}
function summaryPdf(ex, lec) {
  let h = '<h2>الملخص</h2>' + md(ex.summary);
  if (ex.key_terms && ex.key_terms.length) h += '<h2>المصطلحات</h2><ul>' + ex.key_terms.map(t => '<li><span class="en">' + esc(t.en) + '</span>: ' + esc(t.ar) + '</li>').join('') + '</ul>';
  h += '<h2>الشرح خطوة بخطوة</h2>' + ex.steps.map((s, i) => '<div class="pdf-step"><h3>' + (i + 1) + '. ' + esc(s.title) + '</h3>' + md(s.body) + eqHtml(s.equation) + '</div>').join('');
  exportPdf(ex.title || lec.name, h);
}
function quizPdf(qs, title, score) {
  const L = ['أ', 'ب', 'ج', 'د', 'هـ', 'و'];
  let h = score != null ? '<div class="pdf-sub">النتيجة: ' + score + ' / ' + qs.length + '</div>' : '';
  h += qs.map((q, i) => '<div class="pdf-q"><h3>' + (i + 1) + '. ' + inline(q.q, []) + '</h3><ol class="pdf-opts">' + q.options.map((o, k) => '<li' + (k === q.answer ? ' class="pdf-ok"' : '') + '>' + L[k] + ') ' + inline(o, []) + (k === q.answer ? ' ✓' : '') + '</li>').join('') + '</ol><div class="pdf-why">' + md(q.explanation || '') + '</div></div>').join('');
  exportPdf('اختبار: ' + title, h);
}

/* ---------- مؤقت بومودورو ---------- */
const POMO = { work: 25, short: 5, long: 15 };
const pomo = { mode: 'work', left: POMO.work * 60, end: 0, run: false, count: LS.get('pomoDay', { d: '', n: 0 }), tick: null, ui: null };
function pomoToday() { const t = ymd(new Date()); if (pomo.count.d !== t) pomo.count = { d: t, n: 0 }; return pomo.count; }
function pomoBeep() { try { const C = window.AudioContext || window.webkitAudioContext; const c = new C(); [0, 0.25, 0.5].forEach(t => { const o = c.createOscillator(), g = c.createGain(); o.frequency.value = 880; g.gain.value = 0.15; o.connect(g); g.connect(c.destination); o.start(c.currentTime + t); o.stop(c.currentTime + t + 0.15); }); } catch (e) {} if (navigator.vibrate) navigator.vibrate([200, 100, 200]); }
function pomoNext() {
  if (pomo.mode === 'work') { const c = pomoToday(); c.n++; LS.set('pomoDay', c); pomo.mode = c.n % 4 === 0 ? 'long' : 'short'; toast('خلّصت جلسة تركيز 🎉 خد راحة'); }
  else { pomo.mode = 'work'; toast('الراحة خلصت. يلا نركّز'); }
  pomo.left = POMO[pomo.mode] * 60; pomo.run = false; pomo.end = 0; pomoBeep();
}
function pomoStep() {
  if (pomo.run) { pomo.left = Math.max(0, Math.round((pomo.end - Date.now()) / 1000)); if (pomo.left <= 0) { pomoNext(); } }
  pomoPaint();
}
function pomoPaint() {
  if (!pomo.ui || !pomo.ui.box.isConnected) return;
  const m = String(Math.floor(pomo.left / 60)).padStart(2, '0'), s = String(pomo.left % 60).padStart(2, '0');
  const u = pomo.ui; u.time.textContent = m + ':' + s;
  u.mode.textContent = pomo.mode === 'work' ? 'وقت التركيز' : pomo.mode === 'short' ? 'راحة قصيرة' : 'راحة طويلة';
  u.go.textContent = pomo.run ? 'إيقاف مؤقت' : 'ابدأ';
  u.cnt.textContent = 'جلسات النهارده: ' + pomoToday().n;
  u.bar.style.width = Math.round(100 * (1 - pomo.left / (POMO[pomo.mode] * 60))) + '%';
  u.box.className = 'card pomo ' + pomo.mode;
}
function pomoCard() {
  const c = el('div', 'card pomo'); c.innerHTML = '<h3>⏱ مؤقت التركيز (بومودورو)</h3><div class="pomo-mode"></div><div class="pomo-time">25:00</div><div class="bar"><i></i></div><div class="muted pomo-cnt"></div>';
  const row = el('div', 'row-btns');
  const go1 = el('button', 'chip p', 'ابدأ'); go1.type = 'button';
  const rs = el('button', 'chip', 'من الأول'); rs.type = 'button';
  const sk = el('button', 'chip', 'تخطّي'); sk.type = 'button';
  go1.onclick = () => { if (pomo.run) { pomo.run = false; pomo.left = Math.max(0, Math.round((pomo.end - Date.now()) / 1000)); } else { pomo.run = true; pomo.end = Date.now() + pomo.left * 1000; } pomoPaint(); };
  rs.onclick = () => { pomo.run = false; pomo.left = POMO[pomo.mode] * 60; pomoPaint(); };
  sk.onclick = () => { pomo.mode = pomo.mode === 'work' ? 'short' : 'work'; pomo.run = false; pomo.left = POMO[pomo.mode] * 60; pomoPaint(); };
  row.append(go1, rs, sk); c.append(row);
  pomo.ui = { box: c, time: $('.pomo-time', c), mode: $('.pomo-mode', c), go: go1, cnt: $('.pomo-cnt', c), bar: $('.bar i', c) };
  if (!pomo.tick) pomo.tick = setInterval(pomoStep, 500);
  pomoPaint(); return c;
}

/* ---------- تحليل نقاط الضعف ---------- */
function weakCard() {
  const c = el('div', 'card weak'); c.innerHTML = '<h3>📊 نقاط الضعف</h3>';
  const items = [];
  Object.keys(S.stats).forEach(n => { const s = S.stats[n]; if (s.a >= 3) { const p = Math.round(100 * s.c / s.a); if (p < 70) items.push({ name: n, p, a: s.a, w: S.wrongs.filter(x => x.lecture === n).length }); } });
  items.sort((x, y) => x.p - y.p);
  if (!items.length && !S.wrongs.length) { c.append(el('div', 'muted', 'لسه مفيش بيانات كفاية. بعد ما تحل كام سؤال هطلعلك المحاضرات اللي محتاجة تراجعها.')); return c; }
  if (!items.length) c.append(el('div', 'muted', 'مفيش محاضرة نسبتها تحت 70% لحد دلوقتي. كمّل.'));
  items.slice(0, 4).forEach(x => {
    const lec = S.lectures.find(l => l.name === x.name);
    const d = el('div', 'weak-item'); d.innerHTML = '<div class="row"><span>' + esc(x.name) + '</span><b class="' + (x.p < 50 ? 'bad' : 'mid') + '">' + x.p + '%</b></div><div class="bar"><i style="width:' + x.p + '%"></i></div><div class="muted">' + x.a + ' سؤال' + (x.w ? ' · ' + x.w + ' غلط محفوظ' : '') + '</div>';
    if (lec) { const b = el('button', 'chip p', 'اتختبر في ' + (x.p < 50 ? 'الأساسيات' : 'المحاضرة')); b.type = 'button'; b.onclick = () => startQuiz(lec.id, 8); const r = el('div', 'row-btns'); r.append(b); d.append(r); }
    c.append(d);
  });
  const by = {}; S.wrongs.forEach(w => { const k = w.lecture || 'غير محدد'; by[k] = (by[k] || 0) + w.count; });
  const top = Object.keys(by).sort((x, y) => by[y] - by[x])[0];
  if (top) c.append(el('div', 'note', '<b>أكتر مكان بتغلط فيه:</b> ' + esc(top) + ' (' + by[top] + ' غلطة)'));
  if (S.confused.length) c.append(el('div', 'muted', 'ومعاك ' + S.confused.length + ' حاجة ضغطت عليها «مفهمتش».'));
  return c;
}

/* ---------- الميكروفون ---------- */
function showMicHelp() {
  if (document.getElementById('micHelp')) return;
  const ov = document.createElement('div');
  ov.id = 'micHelp';
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;';
  const card = document.createElement('div');
  card.style.cssText = 'background:var(--card,#fff);color:var(--text,#111);border-radius:16px;padding:18px;max-width:340px;width:100%;direction:rtl;text-align:right;line-height:1.9;font-size:15px;max-height:85vh;overflow:auto;';
  card.innerHTML = '<b>الميكروفون مقفول من المتصفح 🔒</b><br>عشان تشغّله، اعمل الآتي:<br><br><b>لو فاتح الموقع من كروم:</b><br>1) دوس على علامة القفل اللي جنب اسم الموقع فوق.<br>2) اختار «الأذونات».<br>3) عند «الميكروفون» اختار «سماح».<br>4) اعمل تحديث للصفحة، وجرب الميكروفون تاني.<br><br><b>لو الموقع متسطب كتطبيق على موبايلك:</b><br>1) دوس مطولاً على أيقونة التطبيق.<br>2) اختار «معلومات التطبيق».<br>3) «الأذونات» ثم «الميكروفون».<br>4) اختار «سماح»، وارجع افتح التطبيق.';
  const b = document.createElement('button');
  b.className = 'btn'; b.type = 'button'; b.textContent = 'تمام، فهمت';
  b.style.marginTop = '12px'; b.style.width = '100%';
  b.onclick = () => ov.remove();
  card.append(b); ov.append(card); document.body.append(ov);
}
function setupMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition; const btn = $('#micBtn'); if (!btn) return;
  if (!SR) { btn.hidden = true; return; }
  const input = $('#chatIn'); let rec = null, on = false, base = '';
  const stop = () => { on = false; btn.classList.remove('rec'); btn.setAttribute('aria-pressed', 'false'); try { rec && rec.stop(); } catch (e) {} };
  btn.onclick = () => {
    if (on) { stop(); return; }
    rec = new SR(); rec.lang = 'ar-EG'; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
    base = input.value ? input.value.trim() + ' ' : '';
    rec.onresult = e => { let t = ''; for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; input.value = (base + t).slice(0, 2000); input.dispatchEvent(new Event('input')); };
    rec.onerror = e => { stop(); const er = e.error; if (er === 'not-allowed' || er === 'service-not-allowed') { showMicHelp(); } else toast(er === 'no-speech' ? 'مسمعتش حاجة. جرّب تاني' : er === 'network' ? 'محتاج نت عشان الصوت' : 'الميكروفون مش شغال دلوقتي'); };
    rec.onend = () => { stop(); input.focus(); };
    try { rec.start(); on = true; btn.classList.add('rec'); btn.setAttribute('aria-pressed', 'true'); toast('اتكلم دلوقتي…'); } catch (e) { stop(); }
  };
}

/* ---------- ملاحظات + إحصائيات + أسئلة غلط ---------- */
function addNote(text) { const t = String(text || '').trim().slice(0, 1500); if (!t) return; S.notes.unshift({ id: uid(), text: t, at: Date.now() }); S.notes = S.notes.slice(0, 100); save('notes'); renderNotes(); toast('اتحفظت في ملاحظاتي ✓'); }
function bumpStat(name, ok) { const s = S.stats[name] || { a: 0, c: 0 }; s.a++; if (ok) s.c++; S.stats[name] = s; save('stats'); }
function qkey(q) { return (q.q + '|' + q.options.join('|')).slice(0, 300); }
function addWrong(q) {
  const k = qkey(q); const ex = S.wrongs.find(w => w.k === k);
  if (ex) { ex.count++; ex.box = 0; ex.due = Date.now() + 2 * DAY; }
  else S.wrongs.unshift({ id: uid(), k, q: q.q, options: q.options, answer: q.answer, explanation: q.explanation || '', lecture: q.lecture || '', count: 1, box: 0, due: Date.now() + 2 * DAY });
  S.wrongs = S.wrongs.slice(0, 300); save('wrongs'); renderQuizHome();
}
const BOX_DAYS = [2, 5, 10, 20];

/* ---------- الاختبارات ---------- */
let quiz = null;
function renderQuizHome() {
  const box = $('#quizBox'); if (quiz) return; box.innerHTML = '';
  const c1 = el('div', 'card'); c1.innerHTML = '<h3>اختبار من محاضرة</h3>';
  if (!S.lectures.length) c1.append(el('div', 'muted', 'ارفع محاضرة في الشات الأول، وبعدها اعمل اختبار منها.'));
  else {
    const sel = el('select'); sel.id = 'qLec'; S.lectures.forEach(l => { const o = el('option', null, esc(l.name)); o.value = l.id; if (l.id === S.active) o.selected = true; sel.append(o); });
    const cnt = el('select'); cnt.id = 'qCnt'; [5, 8, 10, 12].forEach(n => { const o = el('option', null, n + ' أسئلة'); o.value = n; if (n === 8) o.selected = true; cnt.append(o); });
    const go1 = el('button', 'btn', 'ابدأ الاختبار'); go1.style.marginTop = '10px'; go1.onclick = () => startQuiz(sel.value, +cnt.value);
    c1.append(el('label', 'f', 'المحاضرة'), sel, el('label', 'f', 'عدد الأسئلة'), cnt, go1);
  }
  const due = S.wrongs.filter(w => w.due <= Date.now());
  const c2 = el('div', 'card'); c2.innerHTML = '<h3>أسئلتي الغلط (' + S.wrongs.length + ') ' + (due.length ? '<span class="tag">' + due.length + ' جاهزة للمراجعة</span>' : '') + '</h3>';
  if (!S.wrongs.length) c2.append(el('div', 'muted', 'لسه مفيش. أي سؤال هتغلط فيه بيتحفظ هنا وبيرجعلك بعد يومين.'));
  S.wrongs.slice(0, 6).forEach(w => { const r = el('div', 'row'); r.innerHTML = '<span>' + inline(w.q.slice(0, 80), []) + '</span><span class="tag">' + (w.count > 1 ? 'غلطت ' + w.count + ' مرات' : 'مرة') + '</span>'; c2.append(r); });
  if (S.wrongs.length) {
    const b1 = el('button', 'btn', due.length ? 'راجع الجاهز دلوقتي (' + due.length + ')' : 'راجع كل الأسئلة الغلط'); b1.style.marginTop = '8px'; b1.onclick = () => startReview(due.length ? due : S.wrongs.slice());
    c2.append(b1);
    const b2 = el('button', 'link', 'مسح كل الأسئلة الغلط'); b2.onclick = () => { if (confirm('تمسح كل الأسئلة الغلط؟')) { S.wrongs = []; save('wrongs'); renderQuizHome(); } }; c2.append(b2);
  }
  const cf = el('div', 'card'); cf.innerHTML = '<h3>الحاجات اللي مفهمتهاش (' + S.confused.length + ')</h3>';
  if (!S.confused.length) cf.append(el('div', 'muted', 'أي رد في الشات تدوس عليه «مفهمتش» بيتحفظ هنا، وتقدر تتختبر فيه.'));
  else {
    S.confused.slice(0, 4).forEach(x => { const r = el('div', 'row'); r.append(el('span', null, esc(x.text.slice(0, 80)))); cf.append(r); });
    const bq = el('button', 'btn', 'اختبرني في اللي مفهمتوش'); bq.style.marginTop = '8px'; bq.onclick = () => startConfusedQuiz(); cf.append(bq);
    const bc = el('button', 'link', 'مسح القائمة'); bc.onclick = () => { if (confirm('تمسح القائمة؟')) { S.confused = []; save('confused'); renderQuizHome(); } }; cf.append(bc);
  }
  const c3 = el('div', 'card'); c3.innerHTML = '<h3>مستواك</h3>'; const names = Object.keys(S.stats);
  if (!names.length) c3.append(el('div', 'muted', 'بعد أول أسئلة هتشوف نسبة الصح لكل محاضرة.'));
  names.forEach(n => { const s = S.stats[n], p = Math.round(100 * s.c / s.a); const r = el('div', null, '<div class="row"><span>' + esc(n) + '</span><b>' + p + '% (' + s.c + '/' + s.a + ')</b></div><div class="bar"><i style="width:' + p + '%"></i></div>'); c3.append(r); });
  box.append(c1, weakCard(), c2, cf, c3);
}
async function startQuiz(lecId, count) {
  const l = lectureById(lecId); if (!l) { toast('اختار محاضرة'); return; }
  const box = $('#quizBox'); box.innerHTML = ''; const w = el('div', 'card', '<span class="typing"><i></i><i></i><i></i></span> بعمل الأسئلة…'); box.append(w);
  try { const r = await api(Object.assign({ mode: 'quiz', count: count || 8 }, lectureContext(lecId)));
    quiz = { qs: r.questions.map(q => Object.assign(q, { lecture: l.name })), i: 0, score: 0, title: l.name, review: false }; runQuiz();
  } catch (e) { box.innerHTML = ''; box.append(el('div', 'card', '<div class="warn">' + esc(e.message) + '</div>')); const b = el('button', 'btn sec', 'رجوع'); b.onclick = () => { quiz = null; renderQuizHome(); }; box.append(b); }
}
async function startConfusedQuiz() {
  const box = $('#quizBox'); box.innerHTML = ''; box.append(el('div', 'card', '<span class="typing"><i></i><i></i><i></i></span> بعمل الأسئلة…'));
  const name = 'الحاجات اللي مفهمتهاش';
  try { const r = await api({ mode: 'quiz', count: 6, lecture_text: S.confused.slice(0, 12).map(x => x.text).join('\n\n'), lecture_name: name });
    quiz = { qs: r.questions.map(q => Object.assign(q, { lecture: name })), i: 0, score: 0, title: name, review: false }; runQuiz();
  } catch (e) { box.innerHTML = ''; box.append(el('div', 'card', '<div class="warn">' + esc(e.message) + '</div>')); const b = el('button', 'btn sec', 'رجوع'); b.onclick = () => { quiz = null; renderQuizHome(); }; box.append(b); }
}
function startReview(list) { quiz = { qs: list.map(w => ({ q: w.q, options: w.options, answer: w.answer, explanation: w.explanation, lecture: w.lecture, wid: w.id })), i: 0, score: 0, title: 'مراجعة الأسئلة الغلط', review: true }; runQuiz(); }
function runQuiz() {
  const box = $('#quizBox'); box.innerHTML = '';
  if (quiz.i >= quiz.qs.length) {
    const pct = Math.round(100 * quiz.score / quiz.qs.length);
    const c = el('div', 'card', '<h3>خلّصت! ' + (pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪') + '</h3><div class="grade"><b>' + quiz.score + ' / ' + quiz.qs.length + '</b><br><small>' + pct + '%</small></div><div class="muted" style="margin-top:8px">' + (pct >= 60 ? 'كويس. الأسئلة الغلط اتحفظت وهترجعلك.' : 'مش مشكلة. راجع الأسئلة الغلط وجرّب تاني.') + '</div>');
    const pq = el('button', 'btn sec', 'تصدير الأسئلة PDF'); pq.style.marginTop = '10px'; const qq = quiz; pq.onclick = () => quizPdf(qq.qs, qq.title, qq.score); c.append(pq);
    const b = el('button', 'btn', 'رجوع'); b.style.marginTop = '10px'; b.onclick = () => { quiz = null; renderQuizHome(); }; c.append(b); box.append(c); return;
  }
  const q = quiz.qs[quiz.i]; const c = el('div', 'card');
  c.innerHTML = '<h3>' + esc(quiz.title) + ' · سؤال ' + (quiz.i + 1) + ' من ' + quiz.qs.length + '</h3><div class="bar"><i style="width:' + Math.round(100 * quiz.i / quiz.qs.length) + '%"></i></div><div style="margin:12px 0;line-height:1.9">' + inline(q.q, []) + '</div>';
  const fb = el('div'); let done = false; const next = el('button', 'btn', quiz.i === quiz.qs.length - 1 ? 'شوف النتيجة' : 'السؤال اللي بعده ←'); next.hidden = true; next.style.marginTop = '10px';
  q.options.forEach((o, k) => {
    const b = el('button', 'opt'); b.type = 'button'; b.innerHTML = inline(o, []);
    b.onclick = () => { if (done) return; done = true; const ok = k === q.answer; $$('.opt', c).forEach((x, j) => { x.disabled = true; if (j === q.answer) x.classList.add('ok'); else if (j === k) x.classList.add('no'); });
      if (ok) quiz.score++;
      if (quiz.review) { const w = S.wrongs.find(x => x.id === q.wid); if (w) { if (ok) { w.box++; if (w.box >= BOX_DAYS.length) S.wrongs = S.wrongs.filter(x => x !== w); else w.due = Date.now() + BOX_DAYS[w.box] * DAY; } else { w.count++; w.box = 0; w.due = Date.now() + 2 * DAY; } save('wrongs'); } }
      else { bumpStat(q.lecture, ok); if (!ok) addWrong(q); }
      fb.innerHTML = '<div class="note">' + (ok ? '<b>صح ✓</b> ' : '<b>غلط ✗</b> ') + md(q.explanation) + (ok || quiz.review ? '' : '<span class="tag">اتحفظ في أسئلتي الغلط</span>') + (ok && quiz.review && !S.wrongs.find(x => x.id === q.wid) ? '<span class="tag">اتقنته وشلته من القائمة 👏</span>' : '') + '</div>'; next.hidden = false; };
    c.append(b);
  });
  next.onclick = () => { quiz.i++; runQuiz(); }; c.append(fb, next);
  const ex = el('button', 'link', 'خروج من الاختبار'); ex.onclick = () => { quiz = null; renderQuizHome(); }; c.append(ex); box.append(c);
}

/* ---------- الخطة ---------- */
function renderPlan() {
  const box = $('#planBox'); box.innerHTML = '';
  const p = S.plan || { name: '', exam: '', lectures: 12, hours: 3, rest: '5' };
  const c = el('div', 'card'); c.innerHTML = '<h3>خطة المذاكرة من تاريخ الامتحان</h3>'
    + '<label class="f">المادة</label><input id="pName" maxlength="40" placeholder="مثلًا Math 2" value="' + esc(p.name) + '">'
    + '<label class="f">تاريخ الامتحان</label><input id="pExam" type="date" value="' + esc(p.exam) + '">'
    + '<label class="f">عدد المحاضرات</label><input id="pLec" type="number" min="1" max="60" value="' + esc(p.lectures) + '">'
    + '<label class="f">ساعات المذاكرة في اليوم</label><input id="pHrs" type="number" min="1" max="10" value="' + esc(p.hours) + '">'
    + '<label class="f">يوم الراحة الأسبوعي</label><select id="pRest"><option value="">من غير يوم راحة</option>' + ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((d, i) => '<option value="' + i + '"' + (String(p.rest) === String(i) ? ' selected' : '') + '>' + d + '</option>').join('') + '</select>';
  const b = el('button', 'btn', 'اعمل الخطة'); b.style.marginTop = '10px';
  const out = el('div');
  b.onclick = () => { S.plan = { name: $('#pName').value.trim(), exam: $('#pExam').value, lectures: +$('#pLec').value, hours: +$('#pHrs').value, rest: $('#pRest').value, done: (S.plan && S.plan.done) || {} }; save('plan'); showPlan(out); renderTodayPlan(); };
  c.append(b); box.append(pomoCard(), c, out); if (S.plan) showPlan(out);
}
function showPlan(out) {
  out.innerHTML = ''; const r = buildPlan(S.plan);
  if (r.error) { out.append(el('div', 'card', '<div class="warn">' + esc(r.error) + '</div>')); return; }
  const c = el('div', 'card'); const done = S.plan.done || (S.plan.done = {});
  c.innerHTML = '<h3>الخطة: ' + r.total + ' يوم' + (S.plan.name ? ' · ' + esc(S.plan.name) : '') + '</h3><div class="muted">امتحان ' + esc(fmtDate(r.exam)) + (r.review ? ' · آخر ' + r.review + ' أيام مراجعة وامتحان تجريبي' : '') + '</div>' + (r.warn ? '<div class="warn">' + esc(r.warn) + '</div>' : '');
  const today = ymd(new Date()); let shown = 0, limit = 10; const list = el('div');
  function draw() { list.innerHTML = ''; r.rows.slice(0, limit).forEach(x => { const row = el('div', 'row'); const cb = document.createElement('input'); cb.type = 'checkbox'; cb.style.width = 'auto'; cb.checked = !!done[x.date]; cb.setAttribute('aria-label', 'تم');
    cb.onchange = () => { if (cb.checked) done[x.date] = 1; else delete done[x.date]; save('plan'); };
    const t = el('div', null, '<b' + (x.date === today ? ' style="color:var(--rose)"' : '') + '>' + esc(fmtDate(x.date)) + (x.date === today ? ' (النهارده)' : '') + '</b><div class="muted">' + esc(x.text) + '</div>'); row.append(t, cb); list.append(row); });
    if (limit < r.rows.length) { const m = el('button', 'btn sec', 'اعرض كل الأيام (' + r.rows.length + ')'); m.onclick = () => { limit = 999; draw(); }; list.append(m); } }
  draw(); c.append(list); out.append(c);
  const done2 = Object.keys(done).length; out.append(el('div', 'card', '<h3>تقدمك</h3><div class="row"><span>أيام خلصتها</span><b>' + done2 + ' / ' + r.rows.length + '</b></div><div class="bar"><i style="width:' + Math.round(100 * done2 / r.rows.length) + '%"></i></div>'));
}

/* ---------- الأدوات ---------- */
function gradeOf(pct) { for (const g of HUE.grades) if (pct >= g.min) return g; return HUE.grades[HUE.grades.length - 1]; }
const fmt1 = n => (Math.round(n * 100) / 100).toFixed(2);
function courseByCode(c) { return HUE.courses.find(x => x.code === c); }
function unlocks(code, seen) { seen = seen || new Set(); HUE.courses.filter(c => c.pre.includes(code)).forEach(c => { if (!seen.has(c.code)) { seen.add(c.code); unlocks(c.code, seen); } }); return seen; }
function needs(code, seen) { seen = seen || new Set(); const c = courseByCode(code); (c ? c.pre : []).forEach(p => { if (!seen.has(p)) { seen.add(p); needs(p, seen); } }); return seen; }
function chip(code, cls) { const c = courseByCode(code); return '<span class="chip ' + (cls || '') + '">' + esc(code) + (c ? ' ' + esc(c.name) : '') + '</span>'; }
function renderTools() {
  const box = $('#toolsBox'); box.innerHTML = '';
  // محوّل
  const c1 = el('div', 'card'); c1.id = 't-conv'; c1.innerHTML = '<h3>محوّل النسبة للتقدير</h3><div style="display:flex;gap:10px;align-items:center"><div style="flex:1"><label class="f">النسبة المئوية</label><input id="cvIn" type="number" inputmode="decimal" min="0" max="100" step="0.1" placeholder="مثلًا 86"></div><div class="grade" id="cvOut"><b>—</b><br><small>اكتب نسبة</small></div></div><div class="muted" id="cvNote" style="margin-top:6px">النجاح من ' + HUE.passPct + '% (D = 1.0).</div><details style="margin-top:8px"><summary class="link">جدول التقديرات كامل</summary><table class="tbl"><tr><th>التقدير</th><th>النقاط</th><th>النسبة</th></tr>' + HUE.grades.map((g, i) => '<tr><td style="direction:ltr;text-align:right">' + g.sym + '</td><td>' + fmt1(g.pts) + '</td><td>' + (g.sym === 'F' ? 'أقل من 60%' : g.min + '%' + (i ? ' حتى أقل من ' + HUE.grades[i - 1].min + '%' : ' وأعلى')) + ' · ' + g.ar + '</td></tr>').join('') + '</table></details>';
  box.append(c1);
  $('#cvIn', c1).oninput = e => { const v = parseFloat(e.target.value), o = $('#cvOut', c1); if (isNaN(v) || v < 0 || v > 100) { o.innerHTML = '<b>—</b><br><small>' + (e.target.value ? 'من 0 لـ 100 بس' : 'اكتب نسبة') + '</small>'; return; } const g = gradeOf(v); o.innerHTML = '<b>' + g.sym + '</b><br><small>' + fmt1(g.pts) + ' · ' + g.ar + '</small>'; $('#cvNote', c1).textContent = v < HUE.passPct ? 'أقل من 60%: رسوب في المادة (F).' : 'ناجح ✓ (الحد الأدنى للنجاح ' + HUE.passPct + '%).'; };
  // متطلبات
  const c2 = el('div', 'card'); c2.id = 't-pre'; c2.innerHTML = '<h3>مستكشف المتطلبات السابقة</h3><label class="f">اختار مادة</label>';
  const sel = el('select'); sel.id = 'preSel'; for (let l = 0; l <= 4; l++) { const g = el('optgroup'); g.label = 'ليفل ' + l + (l ? ' (من صورة، راجع الجدول الرسمي)' : ''); HUE.courses.filter(c => c.level === l).forEach(c => { const o = el('option', null, esc(c.code + ' · ' + c.name)); o.value = c.code; if (c.code === 'BAS 012') o.selected = true; g.append(o); }); sel.append(g); }
  const res = el('div'); c2.append(sel, res); box.append(c2);
  const show = () => { const code = sel.value, c = courseByCode(code), n = Array.from(needs(code)), u = Array.from(unlocks(code));
    res.innerHTML = '<div class="muted" style="margin-top:8px">ترم ' + c.sem + ' · ليفل ' + c.level + (c.hrs ? ' · ' + c.hrs + ' ساعات' : '') + '</div><h4 style="margin-top:8px;color:var(--lilac)">لازم تنجح الأول في:</h4>'
      + (n.length ? '<div class="pre">' + n.reverse().map(x => chip(x)).join('<span class="arr">▶</span>') + '<span class="arr">▶</span>' + chip(code, 'p') + '</div>' : '<div class="muted">مفيش متطلب سابق.</div>') + (c.preNote ? '<div class="warn">' + esc(c.preNote) + '</div>' : '')
      + '<h4 style="margin-top:10px;color:var(--lilac)">نجاحك فيها بيفتح:</h4>' + (u.length ? '<div class="pre">' + u.map(x => chip(x)).join('') + '</div>' : '<div class="muted">مفيش مواد بتعتمد عليها في برنامج الحاسبات.</div>')
      + (c.approx ? '<div class="warn" style="margin-top:8px">بيانات ليفل 1 إلى 4 اتقرت من صورة صغيرة. راجع شجرة البرنامج الرسمية قبل ما تعتمد عليها في التسجيل.</div>' : ''); };
  const showAll = () => { show(); const code = sel.value, c = courseByCode(code), nm = c.code + ' ' + c.name;
    const r = el('div', 'row-btns'); r.style.marginTop = '10px';
    const a1 = el('button', 'chip p', 'اسأل وردة عن المادة'); a1.type = 'button';
    a1.onclick = () => { go('chat'); askChat('اشرحلي مادة ' + nm + ': الساعات والمتطلب السابق وإيه بتفتحلي وفي أي فصل.'); };
    const a2 = el('button', 'chip', 'اختبرني فيها'); a2.type = 'button';
    a2.onclick = () => { go('chat'); askChat('اسألني 5 أسئلة سريعة عن مادة ' + nm + ' (الساعات والمتطلب السابق وموقعها في الخطة) وصحّحلي بعد ما أجاوب.'); };
    r.append(a1, a2); res.append(r); };
  sel.onchange = showAll; showAll();
  // GPA
  const c3 = el('div', 'card'); c3.id = 't-gpa'; c3.innerHTML = '<h3>حاسبة GPA</h3>'; const rows = el('div'); const out = el('div');
  const gopt = g => HUE.grades.map(x => '<option dir="ltr"' + (x.sym === g ? ' selected' : '') + '>' + x.sym + '</option>').join('');
  const calc = () => { let H = 0, P = 0; S.gpaRows.forEach(r => { const g = HUE.grades.find(x => x.sym === r.g); if (g && r.h > 0) { H += r.h; P += r.h * g.pts; } });
    out.innerHTML = '<div class="grade" style="margin-top:8px"><b>' + (H ? fmt1(P / H) : '—') + '</b><br><small>GPA الترم · ' + H + ' ساعة</small></div>'; return { H, P }; };
  const drawRows = () => { rows.innerHTML = ''; S.gpaRows.forEach((r, i) => { const d = el('div', 'row'); d.style.gap = '6px';
    d.innerHTML = '<input style="flex:2" aria-label="اسم المادة" maxlength="30" value="' + esc(r.name) + '"><input style="flex:1" type="number" min="1" max="6" aria-label="الساعات" value="' + esc(r.h) + '"><select class="gsel" dir="ltr" style="flex:1" aria-label="التقدير">' + gopt(r.g) + '</select><button class="link" aria-label="حذف">✕</button>';
    const [n, h, g, x] = d.children; n.oninput = () => { r.name = n.value; save('gpaRows'); }; h.oninput = () => { r.h = Math.max(0, Math.min(6, +h.value || 0)); save('gpaRows'); calc(); }; g.onchange = () => { r.g = g.value; save('gpaRows'); calc(); }; x.onclick = () => { S.gpaRows.splice(i, 1); save('gpaRows'); drawRows(); calc(); }; rows.append(d); }); };
  const add = el('button', 'btn sec', '+ إضافة مادة'); add.style.marginTop = '8px'; add.onclick = () => { S.gpaRows.push({ name: '', h: 3, g: 'B' }); save('gpaRows'); drawRows(); calc(); };
  const tg = el('details'); tg.innerHTML = '<summary class="link" style="margin-top:10px">🎯 محتاج كام الترم الجاي عشان أوصل لهدفي؟</summary><label class="f">GPA التراكمي الحالي</label><input id="gCur" type="number" step="0.01" min="0" max="4"><label class="f">الساعات اللي خلصتها</label><input id="gHrs" type="number" min="0"><label class="f">هدفك للـGPA التراكمي</label><input id="gTar" type="number" step="0.01" min="0" max="4"><label class="f">ساعات الترم الجاي</label><input id="gNext" type="number" min="1" max="24" value="16"><div id="gRes" class="note" style="margin-top:8px" hidden></div>';
  const tcalc = () => { const cur = parseFloat($('#gCur', tg).value), H = parseFloat($('#gHrs', tg).value), t = parseFloat($('#gTar', tg).value), n = parseFloat($('#gNext', tg).value), o = $('#gRes', tg);
    if ([cur, H, t, n].some(isNaN) || n <= 0 || t > 4 || cur > 4) { o.hidden = true; return; } const need = (t * (H + n) - cur * H) / n; o.hidden = false;
    o.textContent = need > 4 ? 'مش ممكن توصل ' + t + ' في ترم واحد بالساعات دي. محتاج ' + fmt1(need) + ' والحد الأقصى 4.00.' : need <= 0 ? 'وصلت هدفك بالفعل، حتى لو جبت 0 الترم الجاي (مش هنصحك 😄).' : 'محتاج GPA ' + fmt1(need) + ' في الترم الجاي (' + n + ' ساعة) عشان توصل ' + fmt1(t) + ' تراكمي.'; };
  $$('input', tg).forEach(i => i.oninput = tcalc);
  c3.append(rows, add, out, tg); box.append(c3); drawRows(); calc();
  // ملاحظات ومحاضرات
  const c4 = el('div', 'card'); c4.id = 't-notes'; c4.innerHTML = '<h3>ملاحظاتي</h3><div id="notesList"></div>'; box.append(c4);
  const c5 = el('div', 'card'); c5.id = 't-lec'; c5.innerHTML = '<h3>محاضراتي</h3><div id="lecList"></div>'; box.append(c5);
  const c6 = el('div', 'card'); c6.innerHTML = '<h3>الحساب</h3><div class="row"><span class="muted" id="acct"></span></div><button class="btn sec" id="outBtn">تسجيل الخروج</button>'; box.append(c6);
  $('#acct', c6).textContent = DEMO ? 'وضع تجريبي (من غير حساب)' : (session ? session.user.email : '');
  $('#outBtn', c6).onclick = async () => { if (sb) { await sb.auth.signOut(); } else toast('مفيش حساب في الوضع التجريبي'); };
  $('#outBtn', c6).hidden = DEMO;
  renderNotes(); renderLectures();
}
function renderNotes() {
  const b = $('#notesList'); if (!b) return; b.innerHTML = '';
  if (!S.notes.length) { b.append(el('div', 'muted', 'اضغط «حفظ في ملاحظاتي» تحت أي رد وهيظهر هنا.')); return; }
  S.notes.forEach(n => { const d = el('div', 'note'); d.textContent = n.text; const c = el('div', 'row-btns'); const cp = el('button', 'chip', 'نسخ'); cp.onclick = () => copyText(n.text); const rm = el('button', 'chip', 'حذف'); rm.onclick = () => { S.notes = S.notes.filter(x => x !== n); save('notes'); renderNotes(); }; c.append(cp, rm); d.append(c); b.append(d); });
}
function renderLectures() {
  const b = $('#lecList'); if (!b) return; b.innerHTML = '';
  if (!S.lectures.length) { b.append(el('div', 'muted', 'ارفع محاضرة من الشات وهتتحفظ هنا على جهازك.')); return; }
  S.lectures.forEach(l => { const d = el('div', 'row'); d.style.flexWrap = 'wrap'; d.innerHTML = '<div><b>' + esc(l.name) + '</b><div class="muted">' + (l.pages ? l.pages + ' صفحة · ' : '') + (l.scanned ? 'ملف مصوّر (الشات بيعتمد على الملخص)' : Math.round(l.chars / 1000) + ' ألف حرف') + '</div></div>';
    const c = el('div', 'row-btns'); const a = el('button', 'chip' + (S.active === l.id ? ' on' : ''), S.active === l.id ? 'نشطة' : 'خليها نشطة في الشات'); a.onclick = () => { setActive(S.active === l.id ? null : l.id); renderLectures(); };
    const q = el('button', 'chip', 'اختبار'); q.onclick = () => { go('quiz'); startQuiz(l.id, 8); };
    const x = el('button', 'chip', 'حذف'); x.onclick = () => { if (!confirm('تمسح المحاضرة؟')) return; S.lectures = S.lectures.filter(y => y !== l); delete S.lecText[l.id]; if (S.active === l.id) S.active = null; save('lectures', 'lecText', 'active'); renderLectures(); renderPending(); renderQuizHome(); };
    c.append(a, q, x); d.append(c); b.append(d); });
}

/* ---------- المفتاح ---------- */
function renderKey() {
  const box = $('#keyBox'); box.innerHTML = ''; const has = !!LS.get('key', '');
  const g = el('div', 'card guide'); g.innerHTML = '<h3>🔑 إزاي تجيب مفتاح Gemini مجانًا (دقيقتين)</h3>'
    + '<div class="stepn"><i>1</i><div>افتح <a href="' + GEMINI_URL + '" target="_blank" rel="noopener noreferrer" class="en">aistudio.google.com/apikey</a> وسجّل دخول بحساب جوجل بتاعك.</div></div>'
    + '<div class="stepn"><i>2</i><div>لو ظهرتلك شروط الاستخدام (<span class="en">Terms of Service</span>) وافق عليها.</div></div>'
    + '<div class="stepn"><i>3</i><div>اضغط <span class="en">Create API key</span>. لو طلب مشروع، اختار مشروعك أو اعمل واحد جديد (<span class="en">Create project</span>).</div></div>'
    + '<div class="stepn"><i>4</i><div>انسخ المفتاح اللي ظهرلك.</div></div>'
    + '<div class="stepn"><i>5</i><div>ارجع هنا، الصقه في الخانة اللي تحت واضغط «حفظ».</div></div>'
    + '<a class="btn" href="' + GEMINI_URL + '" target="_blank" rel="noopener noreferrer">فتح Google AI Studio ↗</a>'
    + '<div class="muted" style="margin-top:8px">لو زرار «Create API key» مش شغال، ممكن يكون في مشروع جوجل لازم تستورده الأول (<span class="en">Import projects</span> من <span class="en">Dashboard › Projects</span>). النسخة المجانية ليها حدود استخدام يومية ودقيقية من جوجل.</div>';
  const k = el('div', 'card'); k.innerHTML = '<h3>المفتاح بتاعك</h3><div class="muted" id="keyState">' + (has ? 'المفتاح محفوظ على جهازك ✓' : 'لسه مفيش مفتاح.') + '</div><label class="f">الصق المفتاح هنا</label><input id="keyIn" type="password" dir="ltr" autocomplete="off" spellcheck="false" placeholder="الصق المفتاح">';
  const sv = el('button', 'btn', 'حفظ'); sv.style.marginTop = '8px';
  sv.onclick = () => { const v = $('#keyIn').value.trim(); if (!/^[A-Za-z0-9_.\-]{20,200}$/.test(v)) { toast('شكل المفتاح غلط. انسخه كامل من غير مسافات.'); return; } LS.set('key', v); $('#keyIn').value = ''; renderKey(); toast('اتحفظ ✓'); };
  const tst = el('button', 'btn sec', 'جرّب المفتاح'); tst.style.marginTop = '8px'; tst.onclick = async () => { tst.disabled = true; try { await api({ mode: 'chat', question: 'قولي مرحبا في كلمة واحدة', history: [] }); toast('المفتاح شغال ✓'); } catch (e) { toast(e.message.slice(0, 80)); } tst.disabled = false; };
  k.append(sv, tst);
  if (has) { const rm = el('button', 'link', 'مسح المفتاح من جهازي'); rm.style.marginTop = '8px'; rm.onclick = () => { LS.del('key'); renderKey(); }; k.append(rm); }
  k.append(el('p', 'muted', '🔒 المفتاح بيتحفظ في متصفحك بس وبيتبعت مع كل طلب لسيرفر التطبيق عشان يكلّم جوجل. مش بيتكتب في الكود ولا بيتحفظ عندنا. متبعتوش لحد، ومتصوّروش.'));
  const w = el('div', 'card'); w.innerHTML = '<h3>اللي بيفتحه المفتاح</h3><div class="row"><span>تلخيص وشرح المحاضرات خطوة بخطوة</span>✓</div><div class="row"><span>الأسئلة والاختبارات من المحاضرة</span>✓</div><div class="row"><span>الشات بعد ما ترفع ملف</span>✓</div><div class="row"><span>رفع ملفات كتير مع بعض، من غير حد لعدد المحاضرات</span>✓</div>';
  box.append(g, k, w);
}

/* ---------- التنقل والثيم ---------- */
function go(v, anchor) {
  $$('.view').forEach(x => x.hidden = x.id !== 'v-' + v); $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
  if (v === 'quiz' && !quiz) renderQuizHome(); if (v === 'plan') renderPlan(); if (v === 'tools') { renderTools(); } if (v === 'key') renderKey();
  if (anchor) { const t = $('#t-' + anchor); if (t) setTimeout(() => t.scrollIntoView({ block: 'start' }), 30); }
  if (v === 'chat') scrollDown();
}
function applyTheme() { document.body.classList.toggle('dark', S.theme === 'dark'); const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = '#2b1f4d'; }
function renderAll() { renderChat(); renderPending(); renderTodayPlan(); renderQuizHome(); }

/* ---------- الدخول (Supabase) ---------- */
let authMode = 'in';
function showAuth() { $('#app').hidden = true; $('#auth').hidden = false; setAuthMode(authMode); }
function setAuthMode(m) {
  authMode = m; $('#aName').hidden = m !== 'up'; $('#aEmail').hidden = m === 'reset'; $('#aEmail').required = m !== 'reset'; $('#aPass').placeholder = m === 'reset' ? 'كلمة السر الجديدة' : 'كلمة السر (8 حروف على الأقل)';
  $('#aGo').textContent = m === 'up' ? 'إنشاء حساب' : m === 'reset' ? 'حفظ كلمة السر' : 'دخول'; $('#aToggle').textContent = m === 'up' ? 'عندي حساب' : 'معنديش حساب'; $('#aToggle').hidden = m === 'reset'; $('#aForgot').hidden = m === 'reset';
}
function authMsg(t, ok) { const m = $('#aMsg'); m.textContent = t; m.className = 'msg' + (ok ? ' ok' : ''); }
function showApp() { $('#auth').hidden = true; $('#app').hidden = false; applyTheme(); renderAll(); }
function authErr(e) { const m = (e && e.message) || ''; if (/Invalid login/i.test(m)) return 'الإيميل أو كلمة السر غلط.'; if (/already registered/i.test(m)) return 'الإيميل ده مسجّل. جرّب تدخل.'; if (/Email not confirmed/i.test(m)) return 'أكّد الإيميل من الرسالة اللي وصلتك الأول.'; if (/rate limit|too many/i.test(m)) return 'محاولات كتير. استنى شوية.'; if (/password/i.test(m)) return 'كلمة السر ضعيفة. 8 حروف على الأقل.'; return 'حصل خطأ. جرّب تاني.'; }
function setupAuth() {
  sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  $('#aToggle').onclick = e => { e.preventDefault(); setAuthMode(authMode === 'up' ? 'in' : 'up'); authMsg(''); };
  $('#aForgot').onclick = async e => { e.preventDefault(); const em = $('#aEmail').value.trim(); if (!em) { authMsg('اكتب الإيميل الأول.'); return; } const { error } = await sb.auth.resetPasswordForEmail(em, { redirectTo: location.origin }); authMsg(error ? authErr(error) : 'بعتنالك رابط لتغيير كلمة السر على الإيميل.', !error); };
  $('#authForm').onsubmit = async e => {
    e.preventDefault(); authMsg(''); const em = $('#aEmail').value.trim(), pw = $('#aPass').value; $('#aGo').disabled = true;
    try {
      if (authMode === 'reset') { const { error } = await sb.auth.updateUser({ password: pw }); if (error) throw error; authMsg('اتغيّرت كلمة السر ✓', true); setAuthMode('in'); if (session) showApp(); }
      else if (authMode === 'up') { const { data, error } = await sb.auth.signUp({ email: em, password: pw, options: { data: { full_name: $('#aName').value.trim() }, emailRedirectTo: location.origin } }); if (error) throw error; if (!data.session) authMsg('بعتنالك رسالة تأكيد على الإيميل. أكّده وارجع ادخل.', true); }
      else { const { error } = await sb.auth.signInWithPassword({ email: em, password: pw }); if (error) throw error; }
    } catch (er) { authMsg(authErr(er)); }
    $('#aGo').disabled = false;
  };
  sb.auth.onAuthStateChange((ev, s) => { session = s; if (ev === 'PASSWORD_RECOVERY') { $('#auth').hidden = false; $('#app').hidden = true; setAuthMode('reset'); return; } if (s && authMode !== 'reset') { showApp(); pullData(); } else if (!s) showAuth(); });
  sb.auth.getSession().then(({ data }) => { session = data.session; if (!session) showAuth(); });
}

/* ---------- تشغيل ---------- */
function init() {
  syncSession(); S.chat = []; S.curId = null; save('chat', 'curId'); // كل فتحة للتطبيق = محادثة جديدة، والقديمة محفوظة في السجل
  $('#daily').textContent = '«' + QUOTES[dayOfYear(new Date()) % QUOTES.length] + '»';
  renderQuick(); setupMic();
  $('#tabs').onclick = e => { const b = e.target.closest('button'); if (b) go(b.dataset.v); };
  $('#themeBtn').onclick = () => { S.theme = S.theme === 'dark' ? 'mix' : 'dark'; save('theme'); applyTheme(); };
  const input = $('#chatIn'); const grow = () => { input.style.height = 'auto'; input.style.height = Math.min(120, input.scrollHeight) + 'px'; };
  input.oninput = grow; input.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); $('#chatForm').requestSubmit(); } };
  $('#fileIn').onchange = e => { const fs = Array.from(e.target.files); e.target.value = ''; if (!fs.length) return; pendingFiles = pendingFiles.concat(fs).slice(0, 10); renderPending(); input.focus(); };
  $('#chatForm').onsubmit = e => { e.preventDefault(); const q = input.value.trim(); if (busy) return; if (pendingFiles.length) { input.value = ''; grow(); uploadAndExplain(q); return; } if (!q) return; input.value = ''; grow(); askChat(q); };
  if (DEMO) { showApp(); const t = $('#todayPlan'); }
  else { if (!window.supabase) { document.body.textContent = 'مكتبة الدخول مش متحمّلة.'; return; } setupAuth(); }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) navigator.serviceWorker.register('sw.js').catch(() => {});
  if (DEMO) console.info('وردة: وضع تجريبي. ضيف بيانات Supabase في config.js.');
}
window.__warda = { buildPlan, md, gradeOf, S, go }; // للاختبار
init();
})();
