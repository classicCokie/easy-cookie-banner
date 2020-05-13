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
