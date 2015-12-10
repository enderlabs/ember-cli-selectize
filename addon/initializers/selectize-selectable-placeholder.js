/**
 * Based on https://gist.github.com/mudassir0909/a6396fdbe528fbe6fbeb
 */
import Ember from 'ember';

export default function() {
  /* globals Selectize */
  Selectize.define('selectable_placeholder', function(options) {
    var self = this;

    options = Ember.$.extend({
      placeholder: self.settings.placeholder,
      html: function (data) {
        return (
          '<div class="selectize-dropdown-content placeholder-container">' +
            '<div data-selectable class="option">' + data.placeholder + '</div>' +
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
