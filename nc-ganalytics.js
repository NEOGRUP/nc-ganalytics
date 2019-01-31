import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-localstorage/iron-localstorage.js'

(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

class NcGanalytics extends PolymerElement {
  static get template() {
    return html`
    `;
  }
  static get properties() {
    return {
      /**
      * appconfig value
      */
      appconfig: {
        type: Object,
        notify: true,
        reflectToAttribute: true
      },
      lastPage: {
        type: String,
        value: ""
      },
      gaCreated: {
        type: Boolean,
        value: false
      }
    }
  }

  _setGoogleAnalytics(){
    if (this.appconfig.analytics !== "") {
      ga('create', this.appconfig.analytics, 'auto');
      this.gaCreated = true;
      ga('set', 'page', location.pathname);
      ga('send', 'pageview');
    }
  }

  updateGoogleAnalytics(){
    if (!this.gaCreated) return;
    if (location.pathname != this.lastPage) {
      this.lastPage = location.pathname;
      ga('set', 'page', this.lastPage);
      ga('send', 'pageview');
    }
  }
}

window.customElements.define('nc-ganalytics', NcGanalytics);
