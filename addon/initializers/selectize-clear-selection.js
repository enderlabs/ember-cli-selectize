/**
 * Based on https://gist.github.com/jumika/abe412f1aa2b24ea86e6
 */
import Ember from 'ember';

export default function() {
  /* globals Selectize */
  Selectize.define('clear_selection', function(options) {
    var self = this;

    options = Ember.$.extend({
      placeholder: self.settings.placeholder,
      html: function () {
        return (
          '<div class="selectize-dropdown-content placeholder-container">' +
            '<div data-selectable class="option">Clear Selection</div>' +
          '</div>'
        );
      }
    }, options);

    // override the setup method to add an extra "click" handler
    self.setup = (() => {
      var original = self.setup;
      return () => {
        original.apply(this, arguments);
        this.$placeholder_container = Ember.$(options.html(options));
        this.$dropdown.prepend( self.$placeholder_container );
        this.$dropdown.find('.placeholder-container').on('mousedown', () => {
          self.clear();
          self.close();
          self.blur();
          return false;
        });
      };
    })();

  });
}
