const extend = require('js-base/core/extend');
const PgLoginDesign = require('ui/ui_pgLogin');
const user = require("../service/user");
const Router = require("sf-core/ui/router");

const PgLogin = extend(PgLoginDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
  const page = this;

  page.btnLogin.onPress = btnLoginOnPress.bind(page);
}


function btnLoginOnPress() {
  const page = this;
  user.login(page.tbUsername.text || "alper", page.tbPassword.text || "smartface")
  .then(function(message) {
    Router.go("pgFeed");
  }).catch(function(err) {
    alert(err.message || err )
  });
  


}

module && (module.exports = PgLogin);
