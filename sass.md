## 变量
$main-color: #333;


## 嵌套
{
	&:hover {
		
	}
}


## 继承

Sass will extend not just the selector you specify, but other styles that reference that selector. So use a placehoder: %h

@entend

```css
h1 {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  color: #222;
}
h2 {
	@extend h1;
  border-top: 1px solid #444;
}
```
## mixin

A mixin is a shortcut that refers to a group of CSS declarations that you’d like to use over and over again

```css
@mixin rotate($deg) {
	-webkit-transform: rotate($deg);
  -ms-transform: rotate($deg);
  transform: rotate($deg);
}

.container {
	@include rotate;
}
```


## 模块







