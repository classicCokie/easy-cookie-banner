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
