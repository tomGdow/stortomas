## Sass Tips

##### Preliminaries

All mainly from the *Treehouse* [course by Hampton Catlin](C:\Users\Thomas\treehouse\Caitlin_on_ActiveRecord\videos), especially the last 5 videos (Stage 4 videos)

(see also (on xubuntu) [/home/tomgdow/acp/sass-with-josef/hampton_catlin_revisited]( /home/tomgdow/acp/sass-with-josef/hampton_catlin_revisited))

"Sass was invented in 2006 by Hampton Catlin"

All examples should work with [sassmeister]( https://www.sassmeister.com/)

### What We Know

#### 1 Mixins

 Mixins are 'functions' that return css

    //scss
    @mixin my-mixn($color, $size) {
       color: $color;
       font-size: $size;
    }
    
    .myclass{
      @include my-mixn(red, 20px);
    }

#### 2. Functions

 Functions are like mixins but return a value, not css

    //scss
    @function mycalc($arg:10px){
      @return $arg + 20px;
    }
    
    .myclass {
      height: mycalc(30px);
    }

#### 3. Variables
Variables begin with a dollar sign

    $primary-color: #0078A0;   // rgb(0,120,160) blue
#### 4. Nesting

    //scss
    div {
     .myclass {
       background-color: red;   
     }
    }

#### 5. Partials

Partials  are  named with underscore (_uname.scss)

    @import "uname"
    @import '../partials/variables';

#### 6. Extends

    //scss
    h1 {
        color:red;
        background-color: green;
    }
       
    h2 {
      @extend h1;
      font-size: 20px;
    }

##### 6a Extends with placeholder (base class)

    //scss
    %heading-base {
       color:red;
        background-color: green;
    }
    
    h1 {
     @extend %heading-base;
    }
    
    h2 {
      @extend %heading-base;
      font-size: 20px;
    }
    
    //css
    h1, h2 {
      color: red;
      background-color: green;
    }
    
    h2 {
      font-size: 20px;
    }

#### 7. Ampersand 

The ampersand references the  parent selector 

Two basic types of use: 

    //sass
    div {
     &.myclass {
       background-color: red;   
     }
    }
    
    //css 
    div.myclass {
      background-color: red;
    }
and

    //scss
    div {
      .myclass2 & {
       background-color: red;   
     }
    }
    
    //css
    .myclass2 div {
      background-color: red;
    }

The following also works (since Sass 3.2? ):

    //scss
    .myclass3 {
      &-new {
        color: red;
      }
    }
    //css
    .myclass3-new {
      color: red;
    }

####  8.  Two types of comments

  ' // '  comments will not be visible in css

  '/* ...*/'  comments will be visible in css, but not in compact mode

#### 9.  saas --watch

    sass --watch .   <!--watch the current folder-->
#### 10.  Sass Libraries

 Compass:  http://compass-style.org/
 Bourbon:  http://bourbon.io/  (*simple mixin library*)

#### 11.  Sassmeister

 https://www.sassmeister.com/

Sassmeister was built by jedfoster:  http://jedfoster.com/code and Dale Sande: http://www.dalesande.com/  

 (Dale Sande Treehouse  [course on advanced Sass](C:\Users\Thomas\treehouse\advancedSass_Treehouse_SassMeister))

### What We Missed

####1.  Saas -- watch Alternatives

    sass --watch app.scss:app.css
    sass --watch --style compressed mystyle.scss:mystyle.css
    sass --watch --style compact mystyle.scss:mystyle.css
    sass --style compressed mystyle.scss (*write to console*)
    sass --line-comments mystyle.scss (*line-comments IN CSS. A goodie*)
    sass --l  mystyle.scss  (*line-comments, as above*)
    sass --watch .  (*watch current folder)

Consider using sass -- watch with line numbers if using partials: it tells you where everything is 

#### 2. Built-in functions.

Loads of these. 

    lighten($text-color, 30%)
    darken($text-color, 30%)

There is a cheat-sheet [here]( https://gist.github.com/AllThingsSmitty/3bcc79da563df756be46):   https://gist.github.com/AllThingsSmitty/3bcc79da563df756be46

#### 3. if/then/else

    //scss
    @mixin box_mixn($width) {
      @if $width > 100px{
        padding: 0px;
      }
      @else if $width == 100px {
        padding: 5px;
      }
      @else {
        padding: 10px;
      }
    }
    
    div {
      @include box_mixn(40px)
    }
    
    //css
    div {
      padding: 10px;
    }

#### 4. Interpolation

(note #{...}, just like Ruby)

    //scss
    @mixin color_class_mixn ($tag, $color) {
      .#{$tag}.color{
        color: $color;
        background-image: url("images/#{$color}.jpg");
        @if $color == red {
          border: 1px solid black;
          }
        }
    }
    @include color_class_mixn(sidebar, blue);
    
    //css
    .sidebar.color {
      color: blue;
      background-image: url("images/blue.jpg");
    }

#### 5.  For loop

    //scss
    @for $i from 1 through 100 {
      .box:nth-child(#{$i}) {
        background-color: darken(white, $i);
       }
    }
    
    //css 
    .box:nth-child(1) {
      background-color: #fcfcfc;
    }
    .box:nth-child(2) {
      background-color: #fafafa;
    }
    
    ...
    
    .box:nth-child(100) {
      background-color: black;
    }


#### 6. Each loop

    //scss
    @each $member in thom, jonny, colin, phil {
      .bankmanager.#{$member} {
       background: url("images/#{$member}");
       }
      }


##### 6a.  Each loop within mixin

 This is better:

(but *must* have 4 arguments)

    //scss
    @mixin band ($a, $b, $c, $d) {
      @each $member in $a, $b, $c, $d{
      .bandmember.#{$member} {
         background: url("images/#{$member}");
        }
       }
    }
    @include band(thom, johnny, colin, phil);

&nbsp; 
##### 6b.  Each loop within mixin with any number of args

This is even better.  Now can have any number of arguments


    //scss
    @mixin band2 ($members...) {
       @each $member in $members {
      .bandmember.#{$member} {
      background: url("images/#{$member}");
         }
       }
     }
    
    @include band2(thom, johnny, colin, phil);

 Even better still:

    //scss
    @mixin band3 ($name, $members...) {
      @each $member in $members {
        .#{$name}.bandmember.#{$member} {
          background: url("images/#{$member}");
        }
      }
    }
    @include band3(webheads, josef, emer, thomas);


This will work, but is NOT recommended:

    //scss
    @mixin band4 (name, members) {
      @each member in members {
        .#{$name}.bandmember.#{$member} {
      background: url("images/#{$member}");
        }
      }
    }
    @include band4(webheads, josef emer thomas);


#### 7.  Mixins. Optional Arguments and Parameters

This works, but the order of the arguments given to the mixin is important:

    //scss
    @mixin box($size, $color) {
      width: $size;
      height: $size;
      background: $color;
    }
    
    .myclass {
      @include box(10px, blue); // Order of args matter
    }


##### 7a.  Solution

(mixin as above)

    .box {
      @include box($color:blue, $size:10px);
    }

##### 7b.  But can also give default values to mixin:

    //scss
    @mixin box2($size:100px, $color:red, $display:block) {
      width: $size;
      height: $size;
      background: $color;
      display: $display;
    }
    
    .box1 {
      @include box2();
    }
    .box2 {
      @include box2($display:inline);
    }
    .box3 {
    @include box2($display: block, $size:200px, $color:green);
    }
    .box4 {
    @include box2(100px, red);
    }

#### 7d. Null as Mixin Default Argument

    //scss
    @mixin color ($height: null, $width: null)
    {
      height: $height;
      width : $width;
      color: yellow;
    }
    
    .block {
      @include color($height:10px)
    }
    
    //css
    .block {
      height: 10px;
      color: yellow;
    }

####  8. Mixin: include warning message

Message will appear in sass-watch output

     @mixin old  {
       @warn "please use new version of this mixin";
       height: 100px;
    }
    
    h1 {
      @include old;
    }



###  What We Definitely Missed

Mainly from Treehouse Advanced Sass course given by [Dale Sande]( http://www.dalesande.com/ ). 

#### 1. list-maps and map-get()

    //scss
    $colors: (
      primary: #FA6ACC,
      secondary: #F02A52,
      nav-bar: #09A6E4);
    
    div {
      background-color: map-get($colors, primary);
      color: rgba(map-get($colors, secondary), 0.4);
    }
    
    // css
    div {
      background-color: #FA6ACC;
      color: rgba(240, 42, 82, 0.4);
    }

List-maps gets rid of global variables.  The way to go? 

Useful function: **map-deep-get()**

see here:  https://css-tricks.com/snippets/sass/deep-getset-maps/

    //scss
    $colors: (
      primary: #FA6ACC,
      secondary: #F02A52,
      nav-bar: (
       primary: green,
       secondary: red)
       );
    
    @function map-deep-get($map, $keys...) {
        @each $key in $keys {
            $map: map-get($map, $key);
        }
        @return $map;
    }
      
    .nav {    
       color: map-deep-get($colors, nav-bar, primary);
      }
      
    //css
      .nav {color: green;}



#### 2.  Pass code block to Mixin with '@content' directive

@content allows a code block to be passed to a mixin (or function?). A super-goodie. 

Good example (see here: https://robots.thoughtbot.com/sasss-content-directive)

    /scss
    @mixin media($width) {
      @media only screen and (max-width: $width) {
        @content;
      }
    }
    
    @include media(320px) {
      background: red;
    }
    
    //css
    @media only screen and (max-width: 320px) {
      background: red;
    }

#### 3.  Scoping, ! Default,  and !Global

Note local scoping within css rule: 

    //scss
    $text-color: blue;
    .block {
      $text-color: red;
      color: $text-color;
    }
    .block2{
      color: $text-color;
    }
    //css
    .block {
      color: red;
    }
    .block2 {
      color: blue;
    }
##### 3a. !default

Putting '!default' at the end of a variable declaration ensures that if a variable is already assigned it will not be over-written, *unless the original assignment is to null*  (in which case it will be over-written). 

    //scss
    $text-color: blue;
    $text-color: red !default;
    
    .block {
      color: $text-color;
    }
    
    //css
    .block {
      color: blue;
    }
##### 3b. !global

Create a global variable from within a css rule 

    //scss
    $text-color: blue;
    .block {
      $text-color: green !global
    }
    .block2 {
      color: $text-color;
    }
    //css
    .block2 {
      color: green;
    }
#### 4.  Introspection

    //scss
    @mixin test() {  
      @if function-exists(myfunction){
        height: 10px;
      }
      @else {
          height: 30px;
        }
      }
    
    .block { 
      @include test
    }
    
    //css
    .block {
      height: 30px;
    }

#### 5. String Functions 

Loads of these

    //scss
    $list: 'this is list of words', 'more words', 'and more more words';
    .block {
      $strings: str-length(nth($list,2));
      height: #{$strings}px;
      sel: to-upper-case(nth($list, 2));
    }
    
    //css
    .block {
      height: 10px;
      sel: "MORE WORDS";
    }



#### 6. To Persistently Edit Sass from Chrome Browser

-   http-server (from app folder containing index.html)

    localhost: http://172.28.128.3:8080/


- Need to be running chrome on development machine)

- Have `sass -- watch` running for updates to take effect. 

- From chrome create workspace as follows : 

  Development Tools (Shift-Control-I) -> Sources -> Right-Click on App folder  (here labelled 172.28.128.3:8000) -> 'Add app folder to workspace'  Browse to App folder


- Still in Chrome/sources, Find <app>.scss file and choose 'Map to network resource' by right-clicking
- Edit scss file from Chrome, and save changes to 'see' effects.   A goodie. 


#### 7. Miscellaneous

**css-reset** by Eric Meyers: https://meyerweb.com/eric/tools/css/reset/  

(See Paul Cheney, Pluralsight, [Aspen Dental/Sass Videos](C:\Users\Thomas\Pluralsight\sass_cheney_psight) )

**koala**: http://koala-app.com/ (GUI for Sass, Compass).  Used in  [Aspen Dental/Sass Videos](C:\Users\Thomas\Pluralsight\sass_cheney_psight) 

**sass-globbing gem**

sass globbing gem auto included in Rails

    gem install sass-globbing
    // can now do the following: 
    @import "mixins/*
    // but need to run 
    sass -r sass-globbing --watch   


**Recommendation**: create application.scss as core manifest file put in all @imports 

**Underscore and dash in variable names**: For historical reasons, variable name (and all other Sass identifiers)  can use hyphens and underscores interchangeably.  For example, if you define a variable called `$main-width`,  you can access it as `$main_width`  (and vice versa)



JZ/TGD/14-7-2017/