# Contribly contribution widget

Reference implementation of a Javascript contribution widget. 
Retrieves a single contribution from the Contribly API and renders it.

Implemented using jQuery.


## Configuration and deployment

The widget is configured via data attributes on the HTML span

Attribute | Description
-----------|------------
contribution  | The id of the approved contribution to render (required)


The widget can be inserted into a target page by pasting the HTML snippet into that page.
The appropriate snippet for a given contribution can be found in the Contribly moderation tool.

ie.
```
<span class="contribly-contribution" data-contribution="a-contribtion-id"></span><script type="text/javascript" src="https://s3-eu-west-1.amazonaws.com/contribly-widgets/contribution/contribution.js"></script>
```
