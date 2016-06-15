'use strict';

(function($) {

	$.fn.ciGuidedSearch = function(options) {

		var self = this,
			settings = $.extend({

				template: '',
				validateLabel: 'Validate',
				choiceTypes: [],
				choices: [],
				
			}, options);

		if (settings.choiceTypes.length > 0 && settings.choices.length > 0) {

			var ractive = new Ractive({
				el: this,
				template: settings.template,
			});

			var init = function() {

				// Data

				ractive.set('choiceTypes', settings.choiceTypes);
				ractive.set('validateLabel', settings.validateLabel);
				updateChoice(); // Set default recap choices
				updateCurrentURL();

				// Display

				ractive.set('currentView', 'recap');
				manageDisplay();

				setTimeout(function() {
					$(self).addClass('transition-enabled');
				}, 500);

				$(window).resize(function(event) {
					manageDisplay();
				});

			};

			var manageDisplay = function(level, choiceIndex) {

				$(self).css({'min-height': $(self).find('.view.active').height() });

			};

			var updateChoice = function(level, choiceIndex) {

				var level = level || 1,
					choiceIndex = choiceIndex || 0;

				// Reset

				if (typeof(ractive.get('currentChoices[' + level + ']')) !== 'undefined')
					ractive.set('currentChoices[' + level + ']', null);

				// Fill data (recursively)

				if (level == 1) {

					ractive.set('currentChoices[' + level + ']', {
						data: settings.choices[choiceIndex]
					});

					updateChoice(level + 1);

				}
				else
				{
					var parent = ractive.get('currentChoices[' + (level - 1) + ']');

					if (typeof(parent) !== 'undefined'
						&& typeof(parent.data.choices) !== 'undefined') {

						ractive.set('currentChoices[' + level + ']', {
							data: parent.data.choices[choiceIndex],
							parent: parent.data
						});

						updateChoice(level + 1);

					}
				}

			};

			var updateCurrentURL = function(level) {

				var level = level || 1,
					currentChoice = ractive.get('currentChoices[' + level + ']'),
					nextChoice = ractive.get('currentChoices[' + (level + 1) + ']');

				// Check if last choice

				if (typeof(nextChoice) === 'undefined' || !nextChoice) {

					if (typeof(currentChoice.data.url) !== 'undefined')
						ractive.set('currentURL', currentChoice.data.url);
					else
						ractive.set('currentURL', null);

				}
				else
					updateCurrentURL(level + 1);

			};

			ractive.showChoiceSelector = function(level) {

				var currentChoiceOptions = null;

				if (level == 1)
					currentChoiceOptions = settings.choices;
				else {

					var parent = ractive.get('currentChoices[' + (level - 1) + ']');

					if (typeof(parent) !== 'undefined'
						&& typeof(parent.data.choices) !== 'undefined')
						currentChoiceOptions = parent.data.choices;
					else
						currentChoiceOptions = null;

				}

				if (currentChoiceOptions) {

					ractive.set('currentChoiceOptions', currentChoiceOptions);
					ractive.set('currentChoiceSelectorLevel', level);

					ractive.set('currentView', 'choiceSelector');
					manageDisplay();

				}

			};

			ractive.selectChoice = function(choice, choiceIndex) {

				updateChoice(ractive.get('currentChoiceSelectorLevel'), choiceIndex);
				ractive.set('currentChoiceOptions', null);
				ractive.set('currentChoiceSelectorLevel', null);
				updateCurrentURL();

				ractive.set('currentView', 'recap');
				manageDisplay();

			};

			ractive.validate = function() {

				updateCurrentURL();

				var currentURL = ractive.get('currentURL');

				if (currentURL)
					document.location = currentURL;

			};

			init();

		}

	};

})(jQuery);