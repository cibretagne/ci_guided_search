[![Bower version](https://badge.fury.io/bo/ci_guided_search.svg)](http://badge.fury.io/bo/ci_guided_search)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

# CI Guided Search

## Demo
https://rawgit.com/cibretagne/ci_guided_search/master/demo/index.html

## How to use
* Download the plugin or install it using Bower and copy its contents into your project

* Embed the main style sheet:

```html
<link rel="stylesheet" href="ci_guided_search/dist/ci_guided_search.min.css">
```
* And the (optional) default theme:

```html
<link rel="stylesheet" href="ci_guided_search/dist/themes/default.min.css">
```
* Insert the HTML structure:
```html
<div id="ci-guided-search" class="ci-guided-search"></div>

<script id="ci-guided-search-template" type='text/ractive'>

	<div class="view view-recap {{ currentView == 'recap' ? 'active' : 'not-visible' }}">

		<div class="view__inner">

			{{ #choiceTypes:i }}
				{{#if currentChoices[i + 1] }}

					<div class="choice-type">
						<span class="choice-type__label">
							{{ this.label }}
						</span>

						<span on-click="showChoiceSelector(i + 1)" class="choice-type__value">
							<span>
								{{ currentChoices[i + 1].data.label }}
							</span>
						</span>
					</div>

				{{ /if }}
			{{ /choiceTypes }}
			
			{{#if currentURL }}
			<div class="validate">
				<button on-click="validate()">
					{{ validateLabel }}
				</button>
			</div>
			{{ /if }}

		</div>

	</div>
	<div class="view view-choice-selector {{ currentView == 'choiceSelector' ? 'active' : 'not-visible' }}">

		<div class="view__inner">
			
			{{ #currentChoiceOptions:i }}
			
				<div on-click="selectChoice(this, i)" class="choice-option">
					<span>
						{{ this.label }}
					</span>
				</div>

			{{ /currentChoiceOptions }}

		</div>

	</div>

</script>
```
* Embed the scripts (required libraries:  [jQuery](http://jquery.com) & [Ractive.js](http://www.ractivejs.org)):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ractive/0.7.3/ractive.min.js"></script>

<script src="../dist/jquery.ci_guided_search.min.js"></script>
```
* Initialise the script:
```javascript
$('#ci-guided-search').ciGuidedSearch({
	template: '#ci-guided-search-template',
    validateLabel: 'Validate',
	choiceTypes: [
		{ 'label': 'I am' },
		{ 'label': 'and i want to' },
		{ 'label': 'of' },
	],
	choices: [
		{
			'label': 'A student',
			'choices': [
				{
					'label': 'See courses',
					'choices': [
						{
							'label': 'Mathematics',
							'url': 'http://www.concept-image.fr'
						},
						...
					]
				},
				{
					'label': 'View schedule',
					'url': 'http://www.concept-image.fr'
				},
                ...
			]
		},
		...
	]
});