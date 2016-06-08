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

      const textEditor = atom.workspace.getActiveTextEditor();

      const input = textEditor.getTextInBufferRange(textEditor.getSelectedBufferRange());

      const stylesheetsBEM = this._bemalize(input);

      const outputDelimiter = '\n\n';
      const output = input + outputDelimiter + stylesheetsBEM;

      textEditor.setTextInBufferRange(textEditor.getSelectedBufferRange(), output);

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

};
