Bootstrap: popular HTML, CSS and JS framework for developing responsive, mobile first projects on the web

## using Bootstrap

下面加入< head> 中

```html
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=divice-width, initial-scale=1">

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/bootstrap-theme.min.css" rel="stylesheet">
```

下面加入 <body>
```html
// jQuery (necessary for Bootstrap's JavaScript plugins
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
```

*使用 CDN 好处*

- 可以在用户浏览器 cache 中缓存
- 不需要你下载到 web project folder, 更新方便

### Bootstrap Container class

<div class="container">...</div>
* container for all the content of the site
* fixed width(width depends on screen size)
* 用最外层的 div 把所有内容包裹起来, 以便 grid 正常使用
* .container*fluid class allows full width container 

### Bootstrap Rows

* divide the page into multiple rows
* rows act as horizontal grouping for columns
* rows must be inside containers

### Jumbotron

* lightweight, flexible component for showcasing key content, e.g., company name, logo and key information
* can be used outside a container to span the entire screen width
 - use a container inside if you wish to contain the content within a fixed width


## Responsive Design

*why*

* user increasingly accessing websites from a variety of devices of different screen sizes
* adapt to the user's "viewport"
 - build it into the core of the site 
 
*foundation for responsive design*

* grid system
* fluid images
* media queries

## Grid system

*Viewport*

`<meta name="viewport" content="width=divice-width, initial-scale=1">`
the viewport meta tag:
* ensures that the screen width is set to the device width and the content is rendered with this width in mind
* desining the websites to be responsive to the size of the viewport 
 - bootstrap grid system
 
*Bootstrap grid*

* designed to be:
 * responsive
 * mobile first
 * fluid 

* Bootstrap makes available four classes
 - xs for extra small
 - sm for small
 - md for medium
 - lg for large screen sizes
* Each row in Bootstrap grid system is divided into 12 columns
* Uses the classes `.col-xs-*`, `.col-sm-*`, `.col-md-*`, `.col-lg-*` for defining the layouts for various screen sizes
* Specify 

If did not specify the layout for md and large screen sizes, how will the content be laid out for these screen sizes? 
- They will default to col-sm-* specification

*using columh Push, Pull, Offsets*
- overite the behavior of the layout
- push to right, pull to left by a certain number of columns
- offset to the right by a certain number of columns 

*Nesting columns*

- container > row > col-sm-5 + col-sm-7 > row > col-sm-9 + col-sm-3

## Icon Fonts 

* Glyphicons 
 - Included as part of Bootstrap
 - `<span class="glyphicon glyphicon-home" aria-hidden="true"></span>`
 - 250 glyphs available in Bootstrap
 
* Font Awesome
 - Very popular
 - `<i class="fa fa-phone"></i>`
 - Include the CSS files and font files into your project 

## Bootstrap-social

<a class="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i class="fa fa-facebook"></i></a>

* Uses Bootstrap and Font Awesome icons to create buttons for social media sites
* Buttons for all popular social media sites
* Include bootstrap-social.css into your project 

## User Input 

* User input to a webpage 3 approaches
 - <a> tags to provide hyperlinks
 - <button> tags to create buttons
 - <form> to create forms
  * <input> to create elements in forms

*Buttons*

* Buttons behavior dependent on where it is positioned:
 - Inside a form it takes on specific role
 - General purpose outside
* <a> can also be styled using CSS to look like a button 

*Forms*

* <input>
* <textarea>
* <button>
* <select>

## Bootstrap Buttons

* Default colors specified in Bootstrap 
 - primary, success, info, warning, danger
* Button classes can be applied to 3 elements
 - <a>
 - <button>
 - <input>
* Only <button> can be used in nav and navbar 

*Butto Classes*

- btn + { btn-default, btn-primary, ..., btn-link } + { btn-lg btn-sm btn-xs } + btn-block

*Button Groups and Toolbars*
- classes: btn-toolbar, btn-group, btn-group-vertial, btn-group-justified, btn-group-*

## Forms

* Horizontal form
 form-horizontal > form-group > label + input
 
* Inline Form
 form-inline > form-group > label + input 

## Tables

class: 
'table'
'table-striped' for zebra striped rows
'table-bordered' for borders to table cells
'table-hover' for highlighting rows when you hover over a row
'table-condensed' for cutting the cell padding in half
'table-responsive' for making the tables responsive.


*Rows and Cells*

rows and cells can be colored using 5 classes:
*active, success, info, warning, dange*

## Panels and wells

sometimes you may wish to highlight some content on your website

*panel*
panel panel-primary > panel-title + panel-body
dl>dt+dd+dt+dd

*well*

## Images and Media

*image classes*
<img scr="..." class="...">
* img-responsive: responsive images
 - scales nicely with the parent element
* Shape of image:
 - img-rounded: rounded corners
 - img-circle: circular image
 - img-thumbnail: thumbnail image

*media object*
media > (media-left media-middle > media-object img-thumbnail) + (media-body > media-heading)

class:
* media, media-object, media-body, media-heading
* media-left, media-right(after media-body)
* media-top, media-middle, media-bottom
* media-list

## Responsive Embed

Embedding media content

## Labels, Alerts, Badges, Progress Bars

## Tab, Pills, Tabbed Navigation

## Collapse, Accordion, Scrollspy, Affix 

Accordion: 点击显示当前的(FCC 菜单)
Scrollspy: 滚动高亮
Affix: 滚动位置

## Corousel

轮播图


## Bootstrap and jQuery

Bootstrap JS components build upon jQuery



# 源码

```css
/** container **/

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
.container-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

/** row **/

.row {
  margin-right: -15px;
  margin-left: -15px;
}

/** jumbotron **/

.jumbotron {
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  color: inherit;
  background-color: #eee;
}

.container .jumbotron,
.container-fluid .jumbotron {
  padding-right: 15px;
  padding-left: 15px;
  border-radius: 6px;
}
.jumbotron .container {
  max-width: 100%;
}
@media screen and (min-width: 768px) {
  .jumbotron {
    padding-top: 48px;
    padding-bottom: 48px;
  }
  .container .jumbotron,
  .container-fluid .jumbotron {
    padding-right: 60px;
    padding-left: 60px;
  }
  .jumbotron h1,
  .jumbotron .h1 {
    font-size: 63px;
  }
}


```



