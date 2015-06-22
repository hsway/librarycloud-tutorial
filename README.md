#heading 1

##heading 2

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My first API script</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script type="text/javascript" src="myFirstApiScript.js"></script>
	</head>
	<body>
		<h1>Searching Harvard Library</h1>
		<p>This page lets you search Harvard Library's collection.</p>
		<input type="text" id="searchbox">
		<input type="submit" value="Search!" onclick="doSearch()">
		<div id="resultsdiv"></div>
	</body>
</html>
```
text in between

```javascript
// Do the search
function doSearch(){

	var searchbx = document.getElementById("searchbox"); // get the searchbox
	var searchterm = searchbx.value; // get the search term

	// if it's blank, give up
	if (searchterm == ""){
		alert("Enter a search term"); // put up an explanation for the user
		return; // jump out of this funciton
	}

	// Do the API call
	$.ajax({
	        url: 'http://api.lib.harvard.edu/v2/items.dc.json',
	        type: 'GET',
	        data: {q : searchterm},
	        success: function(r){
	        // alert(JSON.stringify(r));
	        displayResults(r);
	        },
	        error: function(e){
	            alert("Something went wrong: " + e);
	        }
	});
} // end doSearch function
```

text in between

```css
/*styles for my first API script*/

.authorclass {
	color: green;
}
```

text below