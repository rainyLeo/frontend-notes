https://developers.google.com/web/fundamentals/design-and-ui/responsive/

make your content work on any device.

dip: device independent pixel (CSS pixel)
hardware pixel

device pixel ratio = hardware pixel / dip

- viewport
<meta name="viewport" content="width=divice-width, initial-scale=1.0">

- max-width on element
img, video, embed, object {
	max-width: 100%
}

- relative sizes

- tap target sizes

手指: 40x40

nav a, button {
	min-width: 48px;
	min-height: 48px;
}

- start small

priorize content
perf matters

- media query

viwport < max-width

<link rel="stylesheet" media="screen and (min-width: 500px)"
	href="over500.css">

@media screen and (min-width: 500px) {
	body { color: #f79420; }
}
	
Linked CSS: many small http requests
@media: few big http requests

- picking breakpoints

- Grids

- flexbox

- common responsive patterns

column drop
mostly fluid
layout shifter
off canvas

# responsive images

max-width: 100%;
100vmax
100vmin

raster image vs vector image 

jpg vs png vs svg vs webp

移动端, pc 端使用不同尺寸的图片

background-size: cover;  
background-size: contain;

image-set()

symbol characters

icon fonts

inline svg

Srcset

sizes attribute




