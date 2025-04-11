    import { initializeApp } from "firebase/app";
    import {
      getAuth,
      GoogleAuthProvider,
      setPersistence,
      browserLocalPersistence,
    } from "firebase/auth";

    const firebaseConfig = {
      apiKey: "AIzaSyC3wVfmoA9A6WRXd04Av8WPpFsUapaXOvw",
      authDomain: "sppechcompression.firebaseapp.com",
      projectId: "sppechcompression",
      storageBucket: "sppechcompression.firebasestorage.app",
      messagingSenderId: "86801864541",
      appId: "1:86801864541:web:894d732acdb8526dff3ab4",
      measurementId: "G-520CZBRRQ0"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Auth setup
    export const auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Persistence error:", error);
    });

    // Google auth provider
    export const provider = new GoogleAuthProvider();
