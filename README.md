# WIP - not stable package


# html-to-bem package
An Atom.io editor plugin package


## Roadmap
- Split code editor view and generate new block css file 
- **DONE** |  Add notifications for better UX.

##Installation
Download package and install


## How to use

Select some Html BEM component from your file. For example:

``` html
<section class="hello hello--world">
  <h1 class="hello__heading">Hello World</h1>
  <p class="hello__paragraph">
    Hey <a class="hello__link" href="#">kids</a>.
  </p>
  <a class="hello__link hello__link--cta" href="#">Call to action</a>
</section>
```

And then type

``` css
html-to-bem:run
```

command and You will get your BEM CSS stylesheets below:

``` yaml

.hello { 

} 
 
.hello--world { 

} 
 
.hello__heading { 

} 
 
.hello__paragraph { 

} 
 
.hello__link { 

} 
 
.hello__link--cta { 

} 
 
```
