const banner = require("./easyCookieBanner");

const config = {
  bannerConfig: {
    title: "Cookies on DucTec.de",
    backgroundColor: "#cfc9c8",
    description: `Wir verwenden auf unseren Webseiten 
    eigene und fremde Cookies: Notwendige Cookies, die 
    für die Nutzung unserer Webseiten zwingend erforderlich sind, 
    funktionale Cookies, die Dir mehr Komfort bei der Nutzung unserer 
    Webseiten bieten, Performance Cookies, mit denen wir aggregierte 
    Daten zur Webseitennutzung und Statistiken generieren, sowie 
    Marketing Cookies zum Anzeigen relevanter Inhalte und Werbung. 
    Wenn du auf "alle Cookies akzeptieren" klickst, stimmst du der 
    Verwendung aller Cookies zu. Unter "Cookie-Einstellungen" kannst 
    Du eine individuelle Auswahl treffen und erteilte Einwilligungen 
    jederzeit für die Zukunft widerrufen. Siehe auch unsere`,
    cookieGuidelines: {
      label: "Cookie Guidelines",
      link: "https://www.catrice.eu/de/datenschutz#anchor2",
    },
    imprint: {
      label: "Impressum",
      link: "https://ductec.de/impressum.html",
    },
    dataPolicy: {
      label: "Datenschutzerklärung",
      link: "https://ductec.de/datenschutz.html",
    },
    acceptCookies: {
      label: "Cookies Akzeptieren",
      backgroundColor: "#787d79",
      callback: function () {
        console.log("accepted sem all");
      },
    },
    cookieSettings: {
      label: "Cookie Einstellungen",
      backgroundColor: "#787d79",
      callback: function () {
        console.log("Gonna Change Stuff");
      },
    },
    allCookiesAllowedCallback: () => {
      console.log("All Cookies are allowed!");
    },
  },
  settingsConfig: {
    title: "Ihre Cookie Einstellungen",
    backgroundColor: "#787d79",
    description: `Wir verwenden Cookies, 
    um diese Website bestmöglich an die Bedürfnisse
    unserer Besucher anpassen zu können. 
    Sie können sich frei entscheiden, einen Teil der
    Cookies zu deaktivieren. Bitte beachten Sie, dass 
    Ihre Einstellungen zu Einschränkungen der 
    Funktionalitäten der Webseite führen können.`,
    cookies: [
      {
        label: "Alle Cookies an/aus schalten",
        state: false,
        callback: function () {
          console.log("Changed Cookie state");
        },
      },
    ],
    saveButton: {
      label: "Einstellungen Speichern",
    },
  },
  enableCookiesCallback: () =>
    console.log("Enabled GA and all the other data Octopuses"),
  disableCookiesCallback: () =>
    console.log(
      "Remove Google Analytics and all the other stuff here / or don't implement them at all"
    ),
};

window.onload = function () {
  banner(config);
};
