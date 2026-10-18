// Service Worker برنامه‌ی Smart-Planner
// فقط برای نمایش نوتیف (در اندروید و کروم جدید نوتیف مستقیم از صفحه کار نمی‌کنه) و باز کردن برنامه با کلیک روی نوتیف.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// لازمِ نصب‌شدن به‌عنوان اپ در بعضی نسخه‌های کروم؛ کاری نمی‌کنه و همه‌چیز از شبکه می‌آد
self.addEventListener('fetch', () => {});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      return self.clients.openWindow('./');
    })
  );
});
