var STORAGE_PREFIX = typeof STORAGE_PREFIX === 'string' ? STORAGE_PREFIX : 'entraco_v2_';
var ENTRACO_LOCATIONS = typeof ENTRACO_LOCATIONS === 'object' ? ENTRACO_LOCATIONS : ['New Haven','Ogbete','Abakpa','Uwani','Emene','Gariki','Coal Camp','Thinkers Corner','Independence Layout','9th Mile','Enugu Main Market','Holy Ghost','Mayor Market','Uwani Main Market','Artisan','Kenyatta','Achara Layout','Maryland','Trans-Ekulu','Nike Road'];
Object.keys(localStorage).filter(key => key.startsWith('entraco_') && !key.startsWith(STORAGE_PREFIX)).forEach(key => localStorage.removeItem(key));
['locations','users','sessions','routes','trips','buses','drivers','bookings','payments','notifications'].forEach(key => { if (!localStorage.getItem(`${STORAGE_PREFIX}${key}`)) localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(key === 'locations' ? ENTRACO_LOCATIONS : [])); });
const page$ = selector => document.querySelector(selector);
const page$$ = selector => [...document.querySelectorAll(selector)];
const pageMoney = value => `₦${Number(value || 0).toLocaleString()}`;
const pageStore = { get(key, fallback = []) { try { const value = localStorage.getItem(`${STORAGE_PREFIX}${key}`); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } }, set(key, value) { localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value)); return value; }, remove(key) { localStorage.removeItem(`${STORAGE_PREFIX}${key}`); } };
const uid = prefix => `${prefix}-${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
const today = () => new Date().toISOString().slice(0, 10);
const dateLabel = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString('en-NG', {day:'numeric', month:'short', year:'numeric'}) : 'N/A';
const statusClass = value => String(value || '').toLowerCase().replaceAll(' ', '-');
const statusBadge = value => value ? `<span class="status-badge ${statusClass(value)}">${value}</span>` : '<span class="muted">N/A</span>';
function pageLocations() { return pageStore.get('locations', ENTRACO_LOCATIONS); }
function pageOptions(select, values, placeholder = 'Select location') { if (select) select.innerHTML = `<option value="">${placeholder}</option>${values.map(value => `<option value="${value}">${value}</option>`).join('')}`; }
function currentUser() { const session = pageStore.get('session', null); return session ? pageStore.get('users', []).find(user => user.id === session.userId) || null : null; }
function requireRole(role) { const user = currentUser(); if (!user || (role && user.role !== role)) { location.href = 'login.html'; return null; } return user; }
function pageShell() { const toggle = page$('#menu-toggle'); const nav = page$('#main-nav'); if (toggle && nav) toggle.addEventListener('click', () => { nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', nav.classList.contains('open')); }); page$$('[data-year]').forEach(item => item.textContent = new Date().getFullYear()); }
function pageToast(message) { const toast = page$('#toast'); if (!toast) { alert(message); return; } toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); }
function logout() { pageStore.remove('session'); location.href = 'index.html'; }
pageShell();
