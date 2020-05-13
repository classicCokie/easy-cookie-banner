(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function createBannerDiv(config) {
  var bodytag = document.getElementsByTagName("body")[0];
  var div = document.createElement("div");
  div.setAttribute("id", "cookie-law");
  div.innerHTML = `
        <div class="cookie-banner-title"><h3>${config.title}<h3></div>
        <div class="cookie-banner-description"> <p>${config.description}<p></div>
        <div class="cookie-banner-buttons"> 
          <button id="cookie-banner-settings-button" class="cookie-banner-settings-button">${config.cookieSettings.label}</button>
          <button id="cookie-banner-accept-button" class="cookie-banner-accept-button">${config.acceptCookies.label}</button>
        </div>
        <style>
          #cookie-law {
            background-color: ${config.backgroundColor};
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: absolute;
            bottom: 0;
          }
          .cookie-banner-accept-button {
            background-color: ${config.acceptCookies.backgroundColor};
          }
          .cookie-banner-settings-button {
            background-color: ${config.cookieSettings.backgroundColor};
          }
          .cookie-banner-settings-button, 
          .cookie-banner-accept-button {
            height: 30px;
            cursor: pointer;
          }
        </style>
      `;
  bodytag.insertBefore(div, bodytag.lastChild); // Adds the Cookie Law Banner just after the opening <body> tag

  document.getElementsByTagName("body")[0].className += " cookiebanner"; //Adds a class tothe <body> tag when the banner is visible
}

module.exports = createBannerDiv;

},{}],2:[function(require,module,exports){
function createSettingsDiv(settingsConfig) {
  var banner = document.getElementById("cookie-law");
  banner.innerHTML = `
      <div class="cookie-settings-title"><h3>${settingsConfig.title}<h3></div>
      <div class="cookie-settings-description"><p>${
        settingsConfig.description
      }</p></div>
      <div class="cookie-settings-list">
        <table>
        <tr>
            <th>Kategory</th>
            <th>Status</th>
        </tr>
        ${settingsConfig.cookies.map(
          (cookie) =>
            `<tr> 
                <td>${cookie.label}<td>
                <td>
                    <label class="switch">
                    <input id="all-cookies-allowed-switch" type="checkbox" checked=${cookie.state}>
                    <span class="slider round"></span>
                    </label>  
                </td> 
            </tr>
                `
        )}

        </table>
        
      </div>
      <div>
      <button id="cookie-setting-save-button" class="cookie-setting-save-button">${
        settingsConfig.saveButton.label
      }</button>
      </div>


      <style>
      #cookie-law {
        background-color: ${settingsConfig.backgroundColor};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        position: absolute;
        bottom: 0;
      }

      /* The switch - the box around the slider */
        .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        }

        /* Hide default HTML checkbox */
        .switch input {
        opacity: 0;
        width: 0;
        height: 0;
        }

        /* The slider */
        .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        }

        .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        }

        input:checked + .slider {
        background-color: #2196F3;
        }

        input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
        }

        input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
        }

        /* Rounded sliders */
        .slider.round {
        border-radius: 34px;
        }

        .slider.round:before {
        border-radius: 50%;
        }

        .cookie-setting-save-button {
            height: 30px;
            cursor: pointer;
        }
      
    </style>


      `;
}
module.exports = createSettingsDiv;

},{}],3:[function(require,module,exports){
const createSettingsDiv = require("./createSettingsDiv");
const createBannerDiv = require("./createBannerDiv");

function easyCookieBanner({
  bannerConfig,
  settingsConfig,
  enableCookiesCallback,
  disableCookiesCallback,
}) {
  const cookies = JSON.parse(getCookies());

  if (!cookies) {
    showCookieBanner(
      bannerConfig,
      settingsConfig,
      enableCookiesCallback,
      disableCookiesCallback
    );
    return;
  }

  if (cookies.all) {
    enableCookiesCallback();
    return;
  }

  if (!cookies.all) {
    disableCookiesCallback();
    return;
  }
}

function showCookieBanner(
  bannerConfig,
  settingsConfig,
  enableCookiesCallback,
  disableCookiesCallback
) {
  createBannerDiv(bannerConfig);
  document
    .getElementById("cookie-banner-accept-button")
    .addEventListener("click", function () {
      setCookie({ all: true });
      close();
      enableCookiesCallback();
    });
  document
    .getElementById("cookie-banner-settings-button")
    .addEventListener("click", function () {
      openSettings(
        settingsConfig,
        disableCookiesCallback,
        enableCookiesCallback
      );
    });
}

function close() {
  var elem = document.querySelector("#cookie-law");
  elem.style.display = "none";
}

function openSettings(
  settingsConfig,
  disableCookiesCallback,
  enableCookiesCallback
) {
  createSettingsDiv(settingsConfig);
  document
    .getElementById("cookie-setting-save-button")
    .addEventListener("click", function () {
      const switchState = document.getElementById("all-cookies-allowed-switch");
      setCookie({ all: switchState.checked });
      close();
      if (switchState.checked) {
        enableCookiesCallback();
        return;
      }
      disableCookiesCallback();
    });
}

function getCookies(name = "ecb") {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(cvalue) {
  const cname = "ecb";
  const exdays = 7;
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

module.exports = easyCookieBanner;

},{"./createBannerDiv":1,"./createSettingsDiv":2}],4:[function(require,module,exports){
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

},{"./easyCookieBanner":3}]},{},[4]);
