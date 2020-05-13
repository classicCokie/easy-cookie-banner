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
