var ENTRACO_LOCATIONS = ['New Haven','Ogbete','Abakpa','Uwani','Emene','Gariki','Coal Camp','Thinkers Corner','Independence Layout','9th Mile','Enugu Main Market','Holy Ghost','Mayor Market','Uwani Main Market','Artisan','Kenyatta','Achara Layout','Maryland','Trans-Ekulu','Nike Road'];
var STORAGE_PREFIX = 'entraco_v2_';
const Store = {
  get(key, fallback = []) { try { const value = localStorage.getItem(`${STORAGE_PREFIX}${key}`); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } },
  set(key, value) { localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value)); return value; },
  remove(key) { localStorage.removeItem(`${STORAGE_PREFIX}${key}`); },
  seed() { if (!localStorage.getItem(`${STORAGE_PREFIX}locations`)) this.set('locations', ENTRACO_LOCATIONS); ['users','sessions','routes','trips','buses','drivers','bookings','payments','notifications'].forEach(key => { if (!localStorage.getItem(`${STORAGE_PREFIX}${key}`)) this.set(key, []); }); }
};
Store.seed();
