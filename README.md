##Intro

This code and accompanying tutorial will allow you to create a basic library-flavored "search box" web page. Search results are returned from Harvard's [LibraryCloud](https://wiki.harvard.edu/confluence/x/FoJUC) API. These materials are intended as an introduction to APIs and how to use them in client applications.

Inspired by [David Weinberger](http://hyperorg.com/misc/myFirstApiScript/myFirstAPIScript-HarvardLibCloud/myFirstApiScript_article.html).

Prerequisite: a basic understanding of HTML.

Software requirements: a text editor and web browser.

## Part 1: HTML (content!)

First, create a folder on your computer where you'll store the files you're about to write. Call it something like "librarycloud-tutorial".

Now, open your text editor, and create a new file called myFirstApiScript.html (case-sensitive).

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

This line tells the browser to load the CSS file we're about to write. This file will be called style.css and it will be saved in the same folder as this HTML file.

```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript" src="myFirstApiScript.js"></script>
```

These lines thell the browser to load two JavaScript files. The first is the jQuery library (a very helpful set of pre-written JavaScript functions), which we're loading via a URL, or "content delivery network" (CDN). The second is a JavaScript file that we're about to write together. This will be called myFirstApiScript.js, and it will be saved in the same folder as this HTML file (and style.css).

```html
</head>
<body>
```

These lines close the header portion of the page, and open the page body, i.e. the content that will be displayed on the page.

```html
<h1>Searching Harvard Library</h1>
<p>This page lets you search Harvard Library's collection.</p>
```

The page's main title, in h1 tags, and introductory blurb, in regular p tags.

```html
<input type="text" id="searchbox">
```

This provides the text input field that will be used as the search box. The id "searchbox" identifies this tag uniquely, which will come in handy when we get to writing JavaScript.

```html
<input type="submit" value="Search!" onclick="doSearch()">
```

This provides the button to click next to the search box. The onclick attribute tells the browser to execute the doSearch() JavaScript function, which we'll be writing momentarily, when the button is clicked.

```html
<div id="resultsdiv"></div>
```

This div reserves a chunk of the page where search results will be displayed. Note that it's blank (no content between the opening and closing tags) for now. The id "resultsdiv" uniquely identifies this tag.

```html
	</body>
</html>
```

These tags close the body, or content, portion of the page, and then the HTML document as a whole.

##Part 2: JavaScript (functionality!)

##Part 3: CSS (style!)
