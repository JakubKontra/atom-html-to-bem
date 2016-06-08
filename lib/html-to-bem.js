'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'html-to-bem:run': () => this.run()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  run() {
    const config = {}; // this._getConfig(filePath);[(24, 52) - (24, 52)]
    const selectedText = this._getSelectedText();

    this._processSelection(selectedText, config);

  },

  /**
   * Process only selection by csscomb
   * @private
   *
   * @param {String} string to process
   * @param {Object} config csscomb config
   */
  _processSelection(string, config) {

    try {
      const textEditor = atom.workspace.getActiveTextEditor();

      const input = textEditor.getTextInBufferRange(textEditor.getSelectedBufferRange());

      const stylesheetsBEM = this._bemalize(input);

      const outputDelimiter = '\n\n';
      const output = input + outputDelimiter + stylesheetsBEM;

      textEditor.setTextInBufferRange(textEditor.getSelectedBufferRange(), output);

      this._showInfoNotification('Your CSS styles for your BEM component has been created.');

    } catch (err) {
      this._showErrorNotification(err.message);
      console.error(err); // eslint-disable-line
    }
  },

  /**
   * Return selected text for current opened file
   * @private
   *
   * @returns {String}
   */
  _getSelectedText() {
    return atom.workspace.getActiveTextEditor().getSelectedText();
  },

  /**
   * Return bem CSS styles
   * @private
   *
   * @returns {String}
   */
  _bemalize(input) {
    let rawInput = input;
    let output = "";
    let classes = [];

    let parser = new DOMParser();
    let doc = parser.parseFromString(rawInput, "text/xml");

    var all = doc.getElementsByTagName("*");

    for (var i=0, max=all.length; i < max; i++) {
       classes.push(all[i].attributes.class.nodeValue.split(' '));
    }

    classes = [].concat.apply([], classes);

    classes = classes.filter( function(value, index, self) {
      return self.indexOf(value) === index;
    });


    classes.forEach(function(item, index) {
      output += "." + item + " { \n\n } \n \n";
    });

    return output;
  },

  /**
  * Show info notification
  * @private
  *
  * @param {String} message — notification text
  */
 _showInfoNotification(message) {
   if (this._isShowInfoNotification()) {
     atom.notifications.addInfo(message);
   }
 },

 /**
  * Show error notification
  * @private
  *
  * @param {String} message notification text
  */
 _showErrorNotification(message) {
   if (this._isShowErrorNotification()) {
     atom.notifications.addError(message);
   }
 },

 /**
  * Check if info notifications should be shown
  * @private
  *
  * @returns {Boolean}
  */
 _isShowInfoNotification() {
   return true;
   // atom.config.get('htmltobem.showNotifications') && atom.notifications && atom.notifications.addInfo;
 },

 /**
  * Check if error notifications should be shown
  * @private
  *
  * @returns {Boolean}
  */
 _isShowErrorNotification() {
   return atom.config.get('htmltobem.showNotifications') && atom.notifications && atom.notifications.addError;
 }


};
