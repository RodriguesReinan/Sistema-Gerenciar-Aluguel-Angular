importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBc2Wu6Lu3XdOOHQtcW4DSLvvZw3ZmcnLA",
  authDomain: "sistema-para-imobiliaria.firebaseapp.com",
  projectId: "sistema-para-imobiliaria",
  storageBucket: "sistema-para-imobiliaria.firebasestorage.app",
  messagingSenderId: "1089407053798",
  appId: "1:1089407053798:web:1849db1653dc7ffb3e3027"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  //console.log('[firebase-messaging-sw.js] Notificação recebida em segundo plano:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/assets/icons/icon-192x192.png'
  });
});



