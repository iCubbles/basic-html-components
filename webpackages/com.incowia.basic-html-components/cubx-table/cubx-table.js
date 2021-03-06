(function () {
  'use strict';

  CubxComponent({
    is: 'cubx-table',

    dataKey: false,
    hasAdvancedCol: false,
    hasAddRow: false,

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    contextReady: function () {
      var data = this.getData();
      if (data && (data.length || data.length === 0)) {
        this.updateTable(data);
      }
      this.updateLang(this.getLang());
      this.updateId(this.getId());
    },

    updateTable: function (data) {
      var tHead = this.$$('thead tr');
      var tBody = this.$$('tbody');
      var tFoot = this.$$('tfoot tr');
      var i, j;
      if (data[0]) {
        var offset = 0;
        for (i=0; i<data[0].length; i++) {
          // update table head
          if (this.dataKey === false || data[0][i] != this.dataKey) {
            if (!tHead.children[i+offset]) {
              tHead.appendChild(document.createElement("th"));
            }
            tHead.children[i+offset].innerHTML = data[0][i];
          }
          else {
            offset--;
          }
        }
        while (tHead.children.length > data[0].length + offset) {
          tHead.removeChild(tHead.children[data[0].length + offset]);
        }
        if (this.hasAdvancedCol) {
          tHead.appendChild(document.createElement("th"));
        }
        if (this.dataKey !== false && false) {
          // a key has been specified; only remove rows absent in data and add new rows
          for (i=1; i<data.length; i++) {
            // TODO implement
          }
        } else {
          // no key specified; remove all rows and add new rows from data
          var keyPos = data[0].indexOf(this.dataKey);
          while (tBody.children.length) {
            tBody.removeChild(tBody.firstChild);
          }
          for (i=1; i<data.length; i++) {
            var dataRow = document.createElement("tr");
            var settings = this.getSettings();
            for (j=0; j<data[i].length; j++) {
              if (keyPos != j) {
                var dataCell = document.createElement("td");
                dataCell.innerHTML = data[i][j];
                dataRow.appendChild(dataCell);
              }
            }
            if (settings.hasOwnProperty('rowSelect') && settings.rowSelect) {
              var self = this;
              dataRow.onclick = (function(data){
                return function() {
                  self.setSelectedRow(data);
                }
              })(data[i]);
              dataRow.classList.add('clickable');
            }
            if (this.hasAdvancedCol) {
              dataCell = document.createElement("td");
              var advancedColSettings = settings.advancedCol;
              dataCell.innerHTML = advancedColSettings.content;
              dataCell.classList.add("advanced");
              if (advancedColSettings.class) {
                dataCell.classList.add(advancedColSettings.class);
              }
              else if (advancedColSettings.color) {
                dataCell.style.backgroundColor = advancedColSettings.color;
              }
              if (advancedColSettings.link) {
                var link = advancedColSettings.link;
                if (data[0].indexOf(advancedColSettings.ref) > -1) {
                  link += data[i][data[0].indexOf(advancedColSettings.ref)];
                }
                dataCell.onclick = (function(link){ return function(){ window.open(link, '_blank');}})(link);
              }
              dataRow.appendChild(dataCell);
            }
            tBody.appendChild(dataRow);
          }
        }
      }
      else {
        // no data; clear table
        while (tHead.children.length) {
          tHead.removeChild(tHead.firstChild);
        }
        while (tBody.children.length) {
          tBody.removeChild(tBody.firstChild);
        }
        while (tFoot.children.length) {
          tFoot.removeChild(tFoot.firstChild);
        }
      }
    },

    modelDataChanged: function (value) {
      if (value && (value.length || value.length === 0)) {
        this.updateTable(value);
      }
    },

    modelSettingsChanged: function (value) {
      if (value && value.advancedCol) {
        this.hasAdvancedCol = true;
      }
      else {
        this.hasAdvancedCol = false;
      }
      if (value && value.key) {
        this.dataKey = value.key;
      }
      else {
        this.dataKey = false;
      }
    },

    /**
     *  Called when slot 'lang' has changed
     */
    modelLangChanged: function (lang) {
      this.updateLang(lang);
    },

    modelIdChanged: function(id) {
      this.updateId(id);
    },

    updateLang: function(lang) {
      this.setAttToMainHTMLElement('lang', lang);
    },

    updateId: function(id) {
      this.setAttToMainHTMLElement('id', id);
    },

    setAttToMainHTMLElement: function(att, val) {
      if (val !== undefined) {
        this.getMainHTMLElement().setAttribute(att, val);
      }
    },

    removeAttToMainHTMLElement: function(att) {
      this.getMainHTMLElement().removeAttribute(att);
    },

    getMainHTMLElement: function() {
      return this.$$('table');
    }
  });
}());
