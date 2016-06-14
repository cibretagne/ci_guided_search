# CI Guided Search
> This tool offers the user a more human way to describe their search

## Demo
https://rawgit.com/cibretagne/ci_guided_search/master/demo/index.html

## How to use
* Download the plugin and copy its contents into your project

* Embed the main style sheet:

```html
<link rel="stylesheet" href="ci_guided_search/dist/ci_guided_search.min.css">
```
* And the optional default theme:

```html
<link rel="stylesheet" href="ci_guided_search/dist/themes/default.min.css">
```
* Embed the scripts (required libraries:  [jQuery](http://jquery.com) & [Ractive.js](http://www.ractivejs.org))

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