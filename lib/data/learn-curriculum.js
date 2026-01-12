
import { Server, BrainCircuit } from 'lucide-react';

export const CURRICULUM = [
    {
        id: 'html',
        title: 'HTML',
        icon: "/images/html.png",
        color: 'text-orange-500',
        chapters: [
            {
                id: 'html-intro',
                title: 'Introduction',
                content: `
                    <h2>Introduction to HTML</h2>
                    <p>HTML is the standard markup language for creating Web pages.</p>
                    <div class="note">HTML stands for Hyper Text Markup Language</div>
                    <p>HTML describes the structure of a Web page using markup. HTML elements are the building blocks of HTML pages. HTML elements are represented by tags.</p>
                    <h3>HTML Tags</h3>
                    <p>HTML tags are element names surrounded by angle brackets:</p>
                    <pre><code>&lt;tagname&gt;content goes here...&lt;/tagname&gt;</code></pre>
                    <ul>
                        <li>HTML tags normally come in pairs like <code>&lt;p&gt;</code> and <code>&lt;/p&gt;</code></li>
                        <li>The first tag in a pair is the start tag, the second tag is the end tag</li>
                        <li>The end tag is written like the start tag, but with a forward slash inserted before the tag name</li>
                    </ul>
                `,
                code: {
                    html: `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>`,
                    css: `body { font-family: sans-serif; padding: 20px; }`,
                    js: ``
                }
            },
            {
                id: 'html-basic',
                title: 'Basic Structure',
                content: `
                    <h2>HTML Basic Structure</h2>
                    <p>All HTML documents must start with a document type declaration: <code>&lt;!DOCTYPE html&gt;</code>.</p>
                    <p>The HTML document itself begins with <code>&lt;html&gt;</code> and ends with <code>&lt;/html&gt;</code>.</p>
                    <p>The visible part of the HTML document is between <code>&lt;body&gt;</code> and <code>&lt;/body&gt;</code>.</p>
                    <h3>The &lt;!DOCTYPE&gt; Declaration</h3>
                    <p>The <code>&lt;!DOCTYPE&gt;</code> declaration represents the document type, and helps browsers to display web pages correctly. It must only appear once, at the top of the page (before any HTML tags).</p>
                `,
                code: {
                    html: `<!DOCTYPE html>
<html>
<body>

<h2>HTML Basic Structure</h2>
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>

</body>
</html>`,
                    css: ``,
                    js: ``
                }
            },
            {
                id: 'html-elements',
                title: 'Elements & Tags',
                content: `
                    <h2>HTML Elements</h2>
                    <p>An HTML element is defined by a start tag, some content, and an end tag.</p>
                    <h3>Nested Elements</h3>
                    <p>HTML elements can be nested (this means that elements can contain other elements). All HTML documents consist of nested HTML elements.</p>
                    <p>The following example contains four HTML elements (<code>&lt;html&gt;</code>, <code>&lt;body&gt;</code>, <code>&lt;h1&gt;</code> and <code>&lt;p&gt;</code>):</p>
                `,
                code: {
                    html: `<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>`,
                    css: `h1 { color: blue; }`,
                    js: ``
                }
            },
            {
                id: 'html-attributes',
                title: 'Attributes',
                content: `
                    <h2>HTML Attributes</h2>
                    <p>Attributes provide additional information about HTML elements.</p>
                    <ul>
                        <li>All HTML elements can have attributes</li>
                        <li>Attributes are always specified in the start tag</li>
                        <li>Attributes usually come in name/value pairs like: name="value"</li>
                    </ul>
                    <h3>The href Attribute</h3>
                    <p>The <code>&lt;a&gt;</code> tag defines a hyperlink. The <code>href</code> attribute specifies the URL of the page the link goes to:</p>
                `,
                code: {
                    html: `<!DOCTYPE html>
<html>
<body>

<h2>HTML Attributes</h2>
<p>HTML links are defined with the a tag. An attribute named href is used to specify the link address:</p>

<a href="https://roviotech.com">Visit Rovio Tech</a>

</body>
</html>`,
                    css: `a { color: #00E5FF; text-decoration: none; font-size: 18px; }`,
                    js: ``
                }
            },
            {
                id: 'html-forms',
                title: 'Forms',
                content: `
                    <h2>HTML Forms</h2>
                    <p>The HTML <code>&lt;form&gt;</code> element is used to create an HTML form for user input.</p>
                    <p>The <code>&lt;form&gt;</code> element is a container for different types of input elements, such as: text fields, checkboxes, radio buttons, submit buttons, etc.</p>
                `,
                code: {
                    html: `<form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Submit">
</form>`,
                    css: `input[type=text] { width: 100%; padding: 12px 20px; margin: 8px 0; box-sizing: border-box; }
input[type=submit] { background-color: #4CAF50; color: white; padding: 14px 20px; margin: 8px 0; border: none; cursor: pointer; }`,
                    js: ``
                }
            },
            {
                id: 'html-tables',
                title: 'Tables',
                content: `
                    <h2>HTML Tables</h2>
                    <p>HTML tables allow web developers to arrange data into rows and columns.</p>
                    <h3>Table Cells</h3>
                    <p>Each table cell is defined by a <code>&lt;td&gt;</code> and a <code>&lt;/td&gt;</code> tag.</p>
                `,
                code: {
                    html: `<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>`,
                    css: `table { width: 100%; border-collapse: collapse; }
th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
tr:hover { background-color: #f5f5f5; color: black; }`,
                    js: ``
                }
            }
        ]
    },
    {
        id: 'css',
        title: 'CSS',
        icon: "/images/css.png",
        color: 'text-blue-500',
        chapters: [
            {
                id: 'css-intro',
                title: 'Introduction',
                content: `
                    <h2>What is CSS?</h2>
                    <p>CSS stands for Cascading Style Sheets.</p>
                    <p>CSS describes how HTML elements are to be displayed on screen, paper, or in other media.</p>
                    <p>CSS saves a lot of work. It can control the layout of multiple web pages all at once.</p>
                `,
                code: {
                    html: `<h1>My First CSS Example</h1>
<p>This is a paragraph.</p>`,
                    css: `body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}`,
                    js: ``
                }
            },
            {
                id: 'css-selectors',
                title: 'Selectors',
                content: `
                    <h2>CSS Selectors</h2>
                    <p>CSS selectors are used to "find" (or select) the HTML elements you want to style.</p>
                    <p>We can divide CSS selectors into five categories:</p>
                    <ul>
                      <li>Simple selectors (select elements based on name, id, class)</li>
                      <li>Combinator selectors (select elements based on a specific relationship between them)</li>
                      <li>Pseudo-class selectors (select elements based on a certain state)</li>
                      <li>Pseudo-element selectors (select and style a part of an element)</li>
                      <li>Attribute selectors (select elements based on an attribute or attribute value)</li>
                    </ul>
                `,
                code: {
                    html: `<p>Every paragraph will be affected by the style.</p>
<p id="para1">Me too!</p>
<p class="center">And me!</p>`,
                    css: `p {
  text-align: center;
  color: red;
}

#para1 {
    color: blue;
}

.center {
    font-size: 24px;
}`,
                    js: ``
                }
            },
            {
                id: 'css-flexbox',
                title: 'Flexbox',
                content: `
                    <h2>CSS Flexbox</h2>
                    <p>The Flexible Box Layout Module, makes it easier to design flexible responsive layout structure without using float or positioning.</p>
                `,
                code: {
                    html: `<div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>  
</div>`,
                    css: `.flex-container {
  display: flex;
  background-color: DodgerBlue;
}

.flex-container > div {
  background-color: #f1f1f1;
  margin: 10px;
  padding: 20px;
  font-size: 30px;
  color: black;
}`,
                    js: ``
                }
            },
            {
                id: 'css-grid',
                title: 'Grid',
                content: `
                    <h2>CSS Grid Layout</h2>
                    <p>The CSS Grid Layout Module offers a grid-based layout system, with rows and columns, making it easier to design web pages without having to use floats and positioning.</p>
                `,
                code: {
                    html: `<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>  
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>  
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>  
</div>`,
                    css: `.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196F3;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}`,
                    js: ``
                }
            }
        ]
    },
    {
        id: 'js',
        title: 'JavaScript',
        icon: "/images/javascript.png",
        color: 'text-yellow-400',
        chapters: [
            {
                id: 'js-basics',
                title: 'Basics',
                content: `<h2>JavaScript Basics</h2><p>JavaScript is the programming language of the Web.</p>`,
                code: {
                    html: `<h2>My First JavaScript</h2>
<button type="button"
onclick="document.getElementById('demo').innerHTML = Date()">
Click me to display Date and Time.</button>
<p id="demo"></p>`, css: ``, js: ``
                }
            },
            {
                id: 'js-dom',
                title: 'DOM Manipulation',
                content: `<h2>The HTML DOM</h2><p>When a web page is loaded, the browser creates a Document Object Model of the page.</p>`,
                code: {
                    html: `<p id="p1">Hello World!</p>
<script>
document.getElementById("p1").innerHTML = "New text!";
</script>`, css: ``, js: ``
                }
            },
            {
                id: 'js-events',
                title: 'Events',
                content: `<h2>HTML Events</h2><p>HTML events are "things" that happen to HTML elements.</p>`,
                code: { html: `<button onclick="this.innerHTML = 'Ooops!'">Click me</button>`, css: ``, js: `` }
            },
            {
                id: 'js-async',
                title: 'Async JS',
                content: `<h2>JavaScript Async</h2><p>"I will finish later!"</p><p>Functions running in parallel with other functions are called asynchronous</p>`,
                code: {
                    html: `<p id="demo"></p>`, css: ``, js: `
function myDisplayer(some) {
  document.getElementById("demo").innerHTML = some;
}

async function myFunction() {return "Hello";}

myFunction().then(
  function(value) {myDisplayer(value);},
  function(error) {myDisplayer(error);}
);` }
            }
        ]
    },
    // --- BACKEND & OTHER LANGUAGES (Skeleton) ---
    {
        id: 'sql',
        title: 'SQL',
        icon: "/images/SQL.png",
        color: 'text-blue-300',
        chapters: [
            { id: 'sql-intro', title: 'Introduction', content: '<p>SQL is a standard language for storing, manipulating and retrieving data in databases.</p>', code: { html: '', css: '', js: '// SQL Environment Not Available in Preview' } },
            { id: 'sql-select', title: 'SELECT', content: '<p>The SELECT statement is used to select data from a database.</p>', code: { html: '', css: '', js: '' } }
        ]
    },
    {
        id: 'python',
        title: 'Python',
        icon: "/images/python.png",
        color: 'text-yellow-300',
        chapters: [
            { id: 'py-intro', title: 'Introduction', content: '<p>Python is a popular programming language.</p>', code: { html: '', css: '', js: '// Python Environment Not Available in Preview' } },
            { id: 'py-syntax', title: 'Syntax', content: '<p>Python syntax can be executed by writing directly in the Command Line.</p>', code: { html: '', css: '', js: '' } }
        ]
    },
    {
        id: 'java',
        title: 'Java',
        icon: "/images/java.png",
        color: 'text-red-400',
        chapters: [
            { id: 'java-intro', title: 'Introduction', content: '<p>Java is a class-based, object-oriented programming language.</p>', code: { html: '', css: '', js: '' } }
        ]
    },
    {
        id: 'php',
        title: 'PHP',
        icon: Server,
        color: 'text-purple-400',
        chapters: [
            { id: 'php-intro', title: 'Introduction', content: '<p>PHP is a server scripting language.</p>', code: { html: '', css: '', js: '' } }
        ]
    },
    {
        id: 'c',
        title: 'C',
        icon: "/images/C.png",
        color: 'text-gray-400',
        chapters: [
            { id: 'c-intro', title: 'Introduction', content: '<p>C is a general-purpose programming language.</p>', code: { html: '', css: '', js: '' } }
        ]
    },
    {
        id: 'cpp',
        title: 'C++',
        icon: "/images/cpp.png",
        color: 'text-blue-600',
        chapters: [
            { id: 'cpp-intro', title: 'Introduction', content: '<p>C++ is a cross-platform language that can be used to create high-performance applications.</p>', code: { html: '', css: '', js: '' } }
        ]
    },
    {
        id: 'csharp',
        title: 'C#',
        icon: "/images/csharp.png",
        color: 'text-green-600',
        chapters: [
            { id: 'cs-intro', title: 'Introduction', content: '<p>C# (C-Sharp) is a programming language developed by Microsoft.</p>', code: { html: '', css: '', js: '' } }
        ]
    },
    {
        id: 'react',
        title: 'React',
        icon: "/images/react.png",
        color: 'text-cyan-400',
        chapters: [
            { id: 'react-intro', title: 'Introduction', content: '<p>React is a JavaScript library for building user interfaces.</p>', code: { html: '', css: '', js: '' } }
        ]
    },
    // ... More can be added as needed
    {
        id: 'git',
        title: 'Git',
        icon: "/images/Git.png",
        color: 'text-orange-600',
        chapters: [
            { id: 'git-intro', title: 'Introduction', content: '<p>Git is a distributed version control system.</p>', code: { html: '', css: '', js: '' } }
        ]
    },
    {
        id: 'ai',
        title: 'AI',
        icon: BrainCircuit,
        color: 'text-emerald-400',
        chapters: [
            { id: 'ai-intro', title: 'Introduction', content: '<p>Artificial Intelligence (AI) is the intelligence demonstrated by machines.</p>', code: { html: '', css: '', js: '' } }
        ]
    }
];
