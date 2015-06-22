##Intro

This code and accompanying tutorial will allow you to create a basic library-flavored "search box" web page (some might even call it a web application). Search results are returned from Harvard's [LibraryCloud](https://wiki.harvard.edu/confluence/x/FoJUC) API. These materials are intended as an introduction to APIs and how to use them in client applications.

Inspired by [David Weinberger](http://hyperorg.com/misc/myFirstApiScript/myFirstAPIScript-HarvardLibCloud/myFirstApiScript_article.html).

Prerequisite: a basic understanding of HTML.

Software requirements: a text editor and web browser.

##Part 1: HTML (content!)

First, create a folder on your computer where you'll store the files you're about to write. Call it something like "librarycloud-tutorial".

Now, open your text editor, and create a new file called `myFirstApiScript.html` (case-sensitive).

Here's the full HTML code for this file (your choice whether to key it in or copy and paste):

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My first API script</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
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

Let's go through it line by line.

```html
<!DOCTYPE html>
```

This "document type declaration" tells the web browser that it's loading an HTML document, specifically an HTML5 document.

```html
<html>
```

This "tag" begins the HTML document.

```html
<head>
```

This tag begins the header information, which is important, but does not display directly on the page.

```html
<title>My first API script</title>
```

This line tells the browser what to display in the title bar (or tab).

```html
<link rel="stylesheet" type="text/css" href="style.css">
```

This line tells the browser to load the CSS file we're about to write. This file will be called `style.css` and it will be saved in the same folder as this HTML file.

```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript" src="myFirstApiScript.js"></script>
```

These lines thell the browser to load two JavaScript files. The first is the jQuery library (a very helpful set of pre-written JavaScript functions), which we're loading via a "content delivery network" (CDN). Basically, that means we're loading the file from a URL instead of saving it locally. The second is a JavaScript file that we're about to write together. This will be called `myFirstApiScript.js`, and it will be saved in the same folder as this HTML file (and `style.css`, which will come last).

```html
</head>
<body>
```

These lines close the header portion of the page, and open the page body, i.e. the content that will be displayed on the page.

```html
<h1>Searching Harvard Library</h1>
<p>This page lets you search Harvard Library's collection.</p>
```

The page's main title, in `h1` tags, and introductory blurb, in regular `p` tags.

```html
<input type="text" id="searchbox">
```

This provides the text input field that will be used as the search box. The id `"searchbox"` identifies this tag uniquely, which will come in handy when we get to writing JavaScript.

```html
<input type="submit" value="Search!" onclick="doSearch()">
```

This provides the button to click next to the search box. The `onclick` attribute tells the browser to execute the `doSearch()` JavaScript function, which we'll be writing momentarily, when the button is clicked.

```html
<div id="resultsdiv"></div>
```

This `div` reserves a chunk of the page where search results will be displayed. Note that it's blank (no content between the opening and closing tags) for now. The id `"resultsdiv"` uniquely identifies this tag.

```html
	</body>
</html>
```

These tags close the body, or content, portion of the page, and then the HTML document as a whole.

##Part 2: JavaScript (functionality!)

Let's break the JavaScript file into two parts: one for each function, `doSearch()` and `displayResults()`. Think of a function as a chunk of code that can be reused over and over again - in this case, when the search button is clicked.

###doSearch()

First, create a new file in your text editor called `myFirstApiScript.js` (case sensitive). It should be in the same folder as `myFirstApiScript.html`.

Here's the full code for the `doSearch()` function:

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

Again, let's go through this line by line.

```javascript
// Do the search
function doSearch(){
```

This is the beginning of the `doSearch()` function. The first line, beginning with `//`, is a comment. This is the standard notation for inline comments in JavaScript.

```javascript
var searchbx = document.getElementById("searchbox"); // get the searchbox
var searchterm = searchbx.value; // get the search term
```

Here, we're scanning the HTML page for the search term entered by the user. First, we look for the search box itself, using its id attribute, `"searchbox"`. In the second line, we look for the value entered in the search box itself, and store it in a variable called `searchterm`.

```javascript
// if it's blank, give up
if (searchterm == ""){
    alert("Enter a search term"); // put up an explanation for the user
    return; // jump out of this funciton
}
```

This "if block" covers the case in which the user hasn't yet entered a search term. The user is alerted, and no further action is taken.

```javascript
// Do the API call
$.ajax({
```

This is where things get tricky. Whenever you see `$` in JavaScript code, it most likely means that you're seeing jQuery. In this case, jQuery has provided us with a function to send an AJAX call from your application. What does that mean? In the old days, if you wanted to update content on a web page, you had to reload the entire webpage. AJAX is a method that allows us to reload only a portion of a webpage (in this case, the part that shows search results), without reloading the whole thing. Much nicer, and faster, for the user!

```javascript
url: 'http://api.lib.harvard.edu/v2/items.dc.json',
type: 'GET',
data: {q : searchterm},
```

Next, we start to supply arguments to the AJAX function (notice, in JSON notation). First is the URL of the LibraryCloud API. Second, we specify that we are going to use a GET HTTP request. The most important thing to know about GET requests is that we will be sending the search term as a URL parameter (e.g. `?q=peanuts`). (For more on this, try Googling GET vs. POST.) In the `data` section, we associate our variable `searchterm` with the `q` URL parameter.



###displayResults()

##Part 3: CSS (style!)
