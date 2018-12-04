/* globals Option */
(function () {
  'use strict';
  /**
   * Get help:
   * > Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   *
   * Access the Cubbles-Component-Model:
   * > Access slot values:
   * slot 'a': this.getA(); | this.setA(value)
   */
  CubxPolymer({
    is: 'cubx-select',

    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {

    },

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    attached: function () {
    },

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    cubxReady: function () {
      this._fillSelect();
    },

    /**
     * A handler to be called by a dom-element
     * @param {event} event
     */
    inputFieldSlotValueChanged: function (event) {
      if (this.$$('select').multiple) {
        this.setValue(this._getSelectValues(this.$$('select')));
      } else {
        // update the cubbles-model
        this.setValue(event.target.value);
      }
    },

    /**
     * Called when slot 'value' has changed
     */
    modelValueChanged: function (newValue) {
      // update the view
      var select = this.$$('select');
      if (select.multiple && Array.isArray(newValue)) {
        this._setSelectValues(newValue);
        this._setValue(newValue);
      } else {
        this.$$('select').value = newValue;
      }
    },

    /**
     * Called when slot 'size' has changed
     */
    modelSizeChanged: function (newSize) {
      // update the view
      this.$$('select').setAttribute('size', newSize);
    },

    /**
     * Called when slot 'optionsValues' has changed
     */
    modelOptionsChanged: function () {
      // update the view
      var values = this._getSelectValues(this.$$('select'));

      this._emptySelect();
      this._fillSelect(values);
    },

    /**
     *  Called when slot 'name' has changed
     */
    modelNameChanged: function (name) {
      // update the view
      this.$$('select').setAttribute('name', name);
    },

    /**
     *  Called when slot 'tabindex' has changed
     */
    modelTabindexChanged: function (newTabindex) {
      // update the view
      this.$$('select').setAttribute('tabindex', newTabindex);
    },

    /**
     *  Called when slot 'disabled' has changed
     */
    modelDisabledChanged: function (disabled) {
      this.$$('select').disabled = disabled;
    },

    /**
     *  Called when slot 'required' has changed
     */
    modelRequiredChanged: function (required) {
      this.$$('select').required = required;
    },

    /**
     *  Called when slot 'required' has changed
     */
    modelMultipleChanged: function (multiple) {
      if (multiple) {
        this.$$('select').multiple = true;
      } else {
        this.$$('select').multiple = false;
      }
    },

    /**
     * Fill the options of the select component
     * @private
     */
    _fillSelect: function (values) {
      var options = this.getOptions() || [];
      var select = this.$$('select');
      var value;
      var text;
      for (var i in options) {
        value = options[ i ][ 0 ];
        text = options[ i ][ 1 ];
        if (value === this.getValue() || (this.getValue() && this.getValue().includes(value))) {
          select.options.add(new Option(text, value, false, true));
        } else {
          select.options.add(new Option(text, value, false, false));
        }
      }

      if (select.multiple && values && Array.isArray(values) && values.length === 0) {
        select.selectedIndex = -1;
      }
    },

    /**
     * Empty the select component's options list
     * @private
     */
    _emptySelect: function () {
      this.$$('select').options.length = 0;
    },

    /**
     *  Called when slot 'lang' has changed
     */
    modelLangChanged: function (lang) {
      this.setAttribute('lang', lang);
    },

    _getSelectValues: function (select) {
      if (!select || !select.options) {
        return;
      }
      var result = [];
      var options = select.options;
      var opt;

      for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[ i ];

        if (opt.selected) {
          result.push(opt.value || opt.text);
        }
      }
      return result;
    },

    _setSelectValues: function (selectedValues) {
      var select = this.$$('select');
      if (!select || !select.options || !selectedValues || !Array.isArray(selectedValues)) {
        return;
      }
      var options = select.options;
      var option;
      for (var i = 0; i < options.length; i++) {
        option = options[i];
        if (selectedValues.includes(option.value)) {
          option.setAttribute('selected', 'true');
        } else {
          option.removeAttribute('selected');
        }
      };
    },
    _setValue: function (values) {
      var select = this.$$('select');
      if (select.multiple && values && Array.isArray(values)) {
        if (!values.includes(select.value)) {
          select.value = values[0];
        }
      } else {
        select.value = values;
      }
    }
  });
}());
