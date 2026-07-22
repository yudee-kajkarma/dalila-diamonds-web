export type AuthTranslationKey =
  | "joinFamily"
  | "joinFamilySub"
  | "passwordMin"
  | "registering"
  | "fillField"
  | "enterEmail"
  | "usernameRule"
  | "resetPassword"
  | "resetYourPassword"
  | "back"
  | "enterEmailPrompt"
  | "sending"
  | "sendOtp"
  | "enterOtp"
  | "resendIn"
  | "resendOtp"
  | "newPasswordMin"
  | "updating"
  | "updatePassword"
  | "rememberPassword"
  | "verifyEmailTitle"
  | "backToRegister"
  | "enterVerificationCode"
  | "verifying"
  | "verifyEmailBtn"
  | "regSuccess"
  | "regFailed"
  | "emailExists"
  | "passNotMeet"
  | "netError"
  | "netErrorTry"
  | "kycPending"
  | "kycRejected"
  | "forgotEmailDesc"
  | "forgotOtpDesc"
  | "verifyEmailDesc"
  | "checkSpam";

const translations: Record<AuthTranslationKey, Record<string, string>> = {
  joinFamily: {
    en: "Join the Dalila Family",
    de: "Treten Sie der Dalila-Familie bei",
    fr: "Rejoignez la famille Dalila",
    es: "Únase a la familia Dalila",
    it: "Unisciti alla famiglia Dalila",
    nl: "Word lid van de Dalila-familie",
  },
  joinFamilySub: {
    en: "Experience timeless diamond jewelry crafted with passion, precision, and trust. Begin your journey with Dalila today.",
    de: "Erleben Sie zeitlosen Diamantschmuck, der mit Leidenschaft, Präzision und Vertrauen gefertigt wird. Beginnen Sie noch heute Ihre Reise mit Dalila.",
    fr: "Découvrez des bijoux en diamant intemporels conçus avec passion, précision et confiance. Commencez votre voyage avec Dalila aujourd'hui.",
    es: "Experimente joyas de diamantes atemporales elaboradas con pasión, precisión y confianza. Comience su viaje con Dalila hoy.",
    it: "Sperimenta gioielli in diamanti senza tempo realizzati con passione, precisione e fiducia. Inizia il tuo viaggio con Dalila oggi.",
    nl: "Ervaar tijdloze diamanten sieraden gemaakt met passie, precisie en vertrouwen. Begin vandaag nog uw reis met Dalila.",
  },
  passwordMin: {
    en: "Password (min 8 characters)",
    de: "Passwort (mind. 8 Zeichen)",
    fr: "Mot de passe (min. 8 caractères)",
    es: "Contraseña (mín. 8 caracteres)",
    it: "Password (min. 8 caratteri)",
    nl: "Wachtwoord (min. 8 tekens)",
  },
  registering: {
    en: "REGISTERING...",
    de: "REGISTRIERUNG...",
    fr: "INSCRIPTION...",
    es: "REGISTRANDO...",
    it: "REGISTRAZIONE IN CORSO...",
    nl: "REGISTREREN...",
  },
  fillField: {
    en: "Please fill out this field.",
    de: "Bitte füllen Sie dieses Feld aus.",
    fr: "Veuillez remplir ce champ.",
    es: "Por favor complete este campo.",
    it: "Si prega di compilare questo campo.",
    nl: "Vul alstublieft dit veld in.",
  },
  enterEmail: {
    en: "Please enter an email address.",
    de: "Bitte gebe eine E-Mail-Adresse ein.",
    fr: "Veuillez entrer une adresse e-mail.",
    es: "Por favor, introduce una dirección de correo electrónico.",
    it: "Si prega di inserire un indirizzo email.",
    nl: "Voer alstublieft een e-mailadres in.",
  },
  usernameRule: {
    en: "Username must be 3-20 characters (letters, numbers, underscore only)",
    de: "Der Benutzername muss 3-20 Zeichen lang sein (nur Buchstaben, Zahlen, Unterstrich)",
    fr: "Le nom d'utilisateur doit comporter entre 3 et 20 caractères (lettres, chiffres, tiret du bas uniquement)",
    es: "El nombre de usuario debe tener entre 3 y 20 caracteres (solo letras, números y guión bajo)",
    it: "Il nom utente deve contenere da 3 a 20 caratteri (solo lettere, numeri, trattino basso)",
    nl: "Gebruikersnaam moet 3-20 tekens zijn (alleen letters, cijfers, underscores)",
  },
  resetPassword: {
    en: "Reset Password",
    de: "Passwort zurücksetzen",
    fr: "Réinitialiser le mot de passe",
    es: "Restablecer contraseña",
    it: "Reimposta la password",
    nl: "Wachtwoord herstellen",
  },
  resetYourPassword: {
    en: "Reset Your Password",
    de: "Passwort zurücksetzen",
    fr: "Réinitialiser votre mot de passe",
    es: "Restablecer su contraseña",
    it: "Reimposta la tua password",
    nl: "Reset uw wachtwoord",
  },
  back: {
    en: "Back",
    de: "Zurück",
    fr: "Retour",
    es: "Atrás",
    it: "Indietro",
    nl: "Terug",
  },
  enterEmailPrompt: {
    en: "Enter Your Email",
    de: "Geben Sie Ihre E-Mail ein",
    fr: "Entrez votre e-mail",
    es: "Introduzca su correo electrónico",
    it: "Inserisci la tua email",
    nl: "Voer uw e-mailadres in",
  },
  sending: {
    en: "SENDING...",
    de: "SENDET...",
    fr: "ENVOI...",
    es: "ENVIANDO...",
    it: "INVIO...",
    nl: "VERSTUREN...",
  },
  sendOtp: {
    en: "SEND OTP",
    de: "OTP SENDEN",
    fr: "ENVOYER L'OTP",
    es: "ENVIAR OTP",
    it: "INVIA OTP",
    nl: "OTP VERSTUREN",
  },
  enterOtp: {
    en: "Enter OTP",
    de: "OTP eingeben",
    fr: "Entrez l'OTP",
    es: "Ingrese OTP",
    it: "Inserisci OTP",
    nl: "Voer OTP in",
  },
  resendIn: {
    en: "Resend code in",
    de: "Code erneut senden in",
    fr: "Renvoyer le code dans",
    es: "Reenviar código en",
    it: "Reinvia il codice in",
    nl: "Stuur code opnieuw in",
  },
  resendOtp: {
    en: "Resend OTP",
    de: "OTP erneut senden",
    fr: "Renvoyer l'OTP",
    es: "Reenviar OTP",
    it: "Reinvia OTP",
    nl: "OTP opnieuw verzenden",
  },
  newPasswordMin: {
    en: "New Password (min 8 characters)",
    de: "Neues Passwort (mind. 8 Zeichen)",
    fr: "Nouveau mot de passe (min. 8 caractères)",
    es: "Nueva contraseña (mín. 8 caracteres)",
    it: "Nuova password (min. 8 caratteri)",
    nl: "Nieuw wachtwoord (min. 8 tekens)",
  },
  updating: {
    en: "UPDATING...",
    de: "WIRD AKTUALISIERT...",
    fr: "MISE À JOUR...",
    es: "ACTUALIZANDO...",
    it: "AGGIORNAMENTO...",
    nl: "BIJWERKEN...",
  },
  updatePassword: {
    en: "UPDATE PASSWORD",
    de: "PASSWORT AKTUALISIEREN",
    fr: "METTRE À JOUR LE MOT DE PASSE",
    es: "ACTUALIZAR CONTRASEÑA",
    it: "AGGIORNA PASSWORD",
    nl: "WACHTWOORD BIJWERKEN",
  },
  rememberPassword: {
    en: "Remember your password?",
    de: "Kennst du dein Passwort?",
    fr: "Vous vous souvenez de votre mot de passe ?",
    es: "¿Recuerda su contraseña?",
    it: "Ricordi la password?",
    nl: "Wachtwoord onthouden?",
  },
  verifyEmailTitle: {
    en: "Verify Your Email",
    de: "E-Mail verifizieren",
    fr: "Vérifier votre e-mail",
    es: "Verifique su correo electrónico",
    it: "Verifica la tua email",
    nl: "E-mailadres verifiëren",
  },
  backToRegister: {
    en: "Back to Register",
    de: "Zurück zur Registrierung",
    fr: "Retour à l'inscription",
    es: "Volver al registro",
    it: "Torna alla registrazione",
    nl: "Terug naar registreren",
  },
  enterVerificationCode: {
    en: "Enter Verification Code",
    de: "Verifizierungscode eingeben",
    fr: "Entrez le code de vérification",
    es: "Ingrese el código de verificación",
    it: "Inserisci il codice di verifica",
    nl: "Voer verificatiecode in",
  },
  verifying: {
    en: "VERIFYING...",
    de: "WIRD VERIFIZIERT...",
    fr: "VÉRIFICATION...",
    es: "VERIFICANDO...",
    it: "VERIFICA IN CORSO...",
    nl: "VERIFICEREN...",
  },
  verifyEmailBtn: {
    en: "VERIFY EMAIL",
    de: "E-MAIL VERIFIZIEREN",
    fr: "VÉRIFIER L'E-MAIL",
    es: "VERIFICAR CORREO ELECTRÓNICO",
    it: "VERIFICA EMAIL",
    nl: "E-MAIL VERIFIËREN",
  },
  regSuccess: {
    en: "Registration successful! Redirecting to verify your email...",
    de: "Registrierung erfolgreich! Weiterleitung zur Bestätigung Ihrer E-Mail...",
    fr: "Inscription réussie ! Redirection pour vérifier votre e-mail...",
    es: "¡Registro exitoso! Redirigiendo para verificar su correo electrónico...",
    it: "Registrazione riuscita! Reindirizzamento alla verifica della tua email...",
    nl: "Registratie succesvol! Doorsturen om uw e-mail te verifiëren...",
  },
  regFailed: {
    en: "Registration failed. Please try again.",
    de: "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    fr: "Échec de l'inscription. Veuillez réessayer.",
    es: "Error al registrarse. Por favor inténtelo de nuevo.",
    it: "Registrazione fallita. Si prega di riprovare.",
    nl: "Registratie mislukt. Probeer het opnieuw.",
  },
  emailExists: {
    en: "This email is already registered. Please login instead.",
    de: "Diese E-Mail-Adresse ist bereits registriert. Bitte melden Sie sich stattdessen an.",
    fr: "Cet e-mail est déjà enregistré. Veuillez vous connecter.",
    es: "Este correo electrónico ya está registrado. Por favor inicie sesión.",
    it: "Questa email è già registrata. Effettua l'accesso.",
    nl: "Dit e-mailadres is al geregistreerd. Log in.",
  },
  passNotMeet: {
    en: "Password does not meet requirements. Must be at least 8 characters.",
    de: "Das Passwort entspricht nicht den Anforderungen. Es muss mindestens 8 Zeichen lang sein.",
    fr: "Le mot de passe ne répond pas aux exigences. Doit comporter au moins 8 caractères.",
    es: "La contraseña no cumple con los requisitos. Debe tener al menos 8 caracteres.",
    it: "La password non soddisfa i requisiti. Deve essere di almeno 8 caratteri.",
    nl: "Wachtwoord voldoet niet aan de vereisten. Moet minimaal 8 tekens zijn.",
  },
  netError: {
    en: "Unable to connect to server. Please check your internet connection.",
    de: "Verbindung zum Server fehlgeschlagen. Bitte überprüfen Sie Ihre Internetverbindung.",
    fr: "Impossible de se connecter au serveur. Veuillez vérifier votre connexion Internet.",
    es: "No se puede conectar al servidor. Por favor, compruebe su conexión a Internet.",
    it: "Impossibile connettersi al server. Si prega di verificare la connessione Internet.",
    nl: "Kan geen verbinding maken met de server. Controleer uw internetverbinding.",
  },
  netErrorTry: {
    en: "Unable to connect to server. Please check your internet connection and try again.",
    de: "Verbindung zum Server fehlgeschlagen. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
    fr: "Impossible de se connecter au serveur. Veuillez vérifier votre connexion Internet et réessayer.",
    es: "No se puede conectar al servidor. Por favor, compruebe su conexión a Internet e inténtelo de nuevo.",
    it: "Impossibile connettersi al server. Si prega di verificare la connessione Internet e riprovare.",
    nl: "Kan geen verbinding maken met de server. Controleer uw internetverbinding en probeer het opnieuw.",
  },
  kycPending: {
    en: "Your account is pending approval. Please wait for admin verification.",
    de: "Ihr Konto wartet auf Genehmigung. Bitte warten Sie auf die Administratorüberprüfung.",
    fr: "Votre compte est en attente d'approbation. Veuillez attendre la vérification de l'administrateur.",
    es: "Su cuenta está pendiente de aprobación. Por favor, espere la verificación del administrador.",
    it: "Il tuo account è in attesa di approvazione. Si prega di attendere la verifica dell'amministratore.",
    nl: "Uw account is in afwachting van goedkeuring. Wacht op verificatie door de beheerder.",
  },
  kycRejected: {
    en: "Your account application was rejected. Please contact support.",
    de: "Ihr Kontoantrag wurde abgelehnt. Bitte wenden Sie sich an den Support.",
    fr: "La demande de votre compte a été rejetée. Veuillez contacter le support.",
    es: "Su solicitud de cuenta fue rechazada. Por favor, póngase en contacto con el soporte.",
    it: "La tua richiesta di account è stata rifiutata. Si prega di contattare il supporto.",
    nl: "Uw accountaanvraag is afgewezen. Neem contact op met de ondersteuning.",
  },
  forgotEmailDesc: {
    en: "Enter your email address and we'll send you a verification code to reset your password.",
    de: "Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Bestätigungscode zum Zurücksetzen Ihres Passworts.",
    fr: "Entrez votre adresse e-mail et nous vous enverrons un code de vérification pour réinitialiser votre mot de passe.",
    es: "Ingrese su dirección de correo electrónico y le enviaremos un código de verificación para restablecer su contraseña.",
    it: "Inserisci il tuo indirizzo email e ti invieremo un codice di verifica per reimpostare la tua password.",
    nl: "Voer uw e-mailadres in en we sturen u een verificatiecode om uw wachtwoord opnieuw in te stellen.",
  },
  forgotOtpDesc: {
    en: "Enter the OTP sent to your email and create a new secure password for your account.",
    de: "Geben Sie das an Ihre E-Mail gesendete OTP ein und erstellen Sie ein neues sicheres Passwort für Ihr Konto.",
    fr: "Entrez l'OTP envoyé à votre e-mail et créez un nouveau mot de passe sécurisé pour votre compte.",
    es: "Ingrese el OTP enviado a su correo electrónico y cree una nueva contraseña segura para su cuenta.",
    it: "Inserisci l'OTP inviato alla tua email e crea una nuova password sicura per il tuo account.",
    nl: "Voer de OTP in die naar uw e-mail is verzonden en maak een nieuw veilig wachtwoord voor uw account.",
  },
  verifyEmailDesc: {
    en: "We've sent a 4-digit verification code to your email address. Please enter it below to complete your registration.",
    de: "Wir haben einen 4-stelligen Verifizierungscode an Ihre E-Mail-Adresse gesendet. Bitte geben Sie ihn unten ein, um Ihre Registrierung abzuschließen.",
    fr: "Nous avons envoyé un code de vérification à 4 chiffres à votre adresse e-mail. Veuillez le saisir ci-dessous pour finaliser votre inscription.",
    es: "Hemos enviado un código de verificación de 4 dígitos a su dirección de correo electrónico. Ingréselo a continuación para completar su registro.",
    it: "Abbiamo inviato un codice di verifica a 4 cifre al tuo indirizzo email. Inseriscilo di seguito per completare la registrazione.",
    nl: "We hebben een 4-cijferige verificatiecode naar uw e-mailadres gestuurd. Voer deze hieronder in om uw registratie te voltooien.",
  },
  checkSpam: {
    en: "Didn't receive the code? Check your spam folder",
    de: "Code nicht erhalten? Überprüfen Sie Ihren Spam-Ordner",
    fr: "Vous n'avez pas reçu le code ? Vérifiez votre dossier de spam",
    es: "¿No recibió el código? Revise su carpeta de spam",
    it: "Non hai ricevuto il codice? Controlla la tua cartella spam",
    nl: "Code niet ontvangen? Controleer uw spambox",
  },
};

export function getAuthText(key: AuthTranslationKey, locale: string): string {
  const normLocale = locale || "en";
  const item = translations[key];
  if (!item) return "";
  return item[normLocale] || item["en"] || "";
}
