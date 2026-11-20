// Connexion à Firebase : authentification par e-mail et base Firestore.
// Fournit à l'application un objet `db` (doc / collection / onSnapshot)
// via l'évènement "stock-db", ou un message via "stock-error".
const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
const fail0 = msg => window.dispatchEvent(new CustomEvent("stock-error", { detail: msg }));
let firebaseConfig, initializeApp, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
    getFirestore, doc, collection, setDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, limit;
try {
  ({ firebaseConfig } = await import("./config.js"));
} catch (e) {
  console.error(e);
  fail0("Fichier config.js illisible : " + (e && e.message || e));
  throw e;
}
try {
  ({ initializeApp } = await import(SDK + "firebase-app.js"));
  ({ getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } = await import(SDK + "firebase-auth.js"));
  ({ getFirestore, doc, collection, setDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, limit } = await import(SDK + "firebase-firestore.js"));
} catch (e) {
  console.error(e);
  fail0("Impossible de charger Firebase (www.gstatic.com). Vérifiez la connexion internet ou un bloqueur de publicités.");
  throw e;
}

const $ = s => document.querySelector(s);
const fail = msg => window.dispatchEvent(new CustomEvent("stock-error", { detail: msg }));

function makeDb(fs){
  const ref = path => {
    const r = doc(fs, path);
    return { set: data => setDoc(r, data), update: data => updateDoc(r, data), delete: () => deleteDoc(r) };
  };
  const coll = (name, cons) => ({
    doc: id => ref(name + "/" + id),
    orderBy: (field, dir) => coll(name, [...cons, orderBy(field, dir)]),
    limit: n => coll(name, [...cons, limit(n)]),
    onSnapshot: (cb, onErr) => onSnapshot(cons.length ? query(collection(fs, name), ...cons) : collection(fs, name), cb, onErr)
  });
  return { doc: ref, collection: name => coll(name, []) };
}

const LOGIN_ERRORS = {
  "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
  "auth/wrong-password": "E-mail ou mot de passe incorrect.",
  "auth/user-not-found": "E-mail ou mot de passe incorrect.",
  "auth/invalid-email": "Adresse e-mail invalide.",
  "auth/too-many-requests": "Trop de tentatives : patientez quelques minutes.",
  "auth/network-request-failed": "Pas de connexion internet.",
  "auth/invalid-api-key": "Clé Firebase invalide : vérifiez apiKey dans config.js.",
  "auth/api-key-not-valid.-please-pass-a-valid-api-key.": "Clé Firebase invalide : vérifiez apiKey dans config.js.",
  "auth/operation-not-allowed": "La connexion par e-mail n'est pas activée dans Firebase.",
  "auth/unauthorized-domain": "Cette adresse n'est pas autorisée dans Firebase (domaines autorisés)."
};

if (!firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith("A_REMPLIR")) {
  fail("Configuration Firebase manquante : renseignez le fichier config.js.");
} else {
  let app, auth, fs;
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    fs = getFirestore(app);
  } catch (e) {
    console.error(e);
    fail("Erreur Firebase au démarrage : " + (e && (e.code || e.message) || e));
    throw e;
  }
  let started = false;

  const login = $("#login");
  const form = $("#login-form");
  const msg = $("#login-msg");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    msg.textContent = "";
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    try {
      await signInWithEmailAndPassword(auth, form.email.value.trim(), form.password.value);
    } catch (err) {
      msg.textContent = LOGIN_ERRORS[err.code] || "Connexion impossible pour le moment, réessayez.";
    } finally { btn.disabled = false; }
  });
  $("#login-reset").addEventListener("click", async () => {
    const email = form.email.value.trim();
    if (!email) { msg.textContent = "Saisissez d'abord votre e-mail."; return; }
    try { await sendPasswordResetEmail(auth, email); msg.textContent = "E-mail de réinitialisation envoyé."; }
    catch (err) { msg.textContent = LOGIN_ERRORS[err.code] || "Envoi impossible pour le moment."; }
  });
  $("#logout").addEventListener("click", () => signOut(auth));

  onAuthStateChanged(auth, user => {
    if (user) {
      login.hidden = true;
      $("#logout").hidden = false;
      $("#who").textContent = user.email || "";
      if (!started) {
        started = true;
        window.stockDb = makeDb(fs);
        window.dispatchEvent(new Event("stock-db"));
      }
    } else {
      if (started) { location.reload(); return; }
      $("#logout").hidden = true;
      login.hidden = false;
      form.email.focus();
      fail("Connectez-vous pour accéder au stock.");
    }
  });
}
