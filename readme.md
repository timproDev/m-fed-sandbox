# Sandbox

Trying out new approaches to components and template front end design

Launch [demo](https://timprodev.github.io/m-fed-sandbox/ "Accordion Component Demo")

## CSS Methodology Working Project
A CSS methodology helps to solve for cleaner code (less redundancy and smaller files) and better maintainability (ease of use and scalability). This encompasses semantic class naming and a model for files structure. Our approach infuses information gathered from BEM, SMACSS and OOCSS. This is the beginning of a modular-based system to organize templates patterns, css structure and html component patterns.

Class names should be independent of it’s content. For example,
```html
<div class=“news-feed”></div>
```
This is the not the recommended approach. Likewise, minimize the use of location-centric semantics, such as
```html
<img class=“right-rail-top”>
```
There are no hard rules as of yet around interpreting and establishing the correct naming approach. We just need to use our best judgement as well as invite collaboration and encourage a shared vocabulary. [Ref Link](https://css-tricks.com/semantic-class-names/)

The overall file model is structured as Block, State, Modification and Theme.

> B(block):
> This is where the fundamental construction of the component is styled. This includes layout from a wireframe standpoint. No actions or behavior and no colors or aesthetics.
>
>S(State):
>This is to account for pseudo classes such as :hover and attributes such as disabled. It also houses dependent classes that are manipulated through js, such as is.active. 
>
>M(Modification):
>This is strictly a sub class of the Block class and is meant to control/override positioning and layout styles. If a bio component needs to layout differently in different locations of the page, this is where those styles are controlled.
>
>T(Theme):
>This is where all the elements of design are controlled, such as spacing (padding and margin), color, scale, typography and brand.

We are also minimizing the use of html tags. Using html tags in css increase the possibility for conflicts having to do with specificity, where multiple unique classes might overlap and override each other without intention.

We also aim for minimizing the use of sub-class hierarchies to limit the processing power required to parse the css. However, we do incorporate sub-classes for themeing and modifications.

Likewise, we are exploring the use of the SASS function @at-root. In minimizing processing time, each class is an extension of the component name but compiled at the root level of the CSS file (as opposed to nested as sub-classes).

## Accordion Component

With the accordion component, I am exploring ways to refine the html structure for potential reuse. Additionally, I am looking to engineer the components so that a theme modification class will empower design to apply presentation/brand variance for the component.

Meaning, that the base presentation of a working component, like an accordion, will have no presentation other than the content (text) and the behavior (show/hide).

Should the design call for a brand- or campaign specific usecase for the accordion, simply adding a wrapper class declaring the appropriate theme will update the presentation of the component.

## Component Structure

### HTML
```html
<div class="accordion">
	<div class="accordion-inner">
		<div class="accordion-body">
			<ul class="accordion-list">
				<li class="accordion-item">
					<div class="accordion-item__header">
					<!-- content -->
					</div>
			        <div class="accordion-item__content">
			        	<div class="accordion-item__content-inner">
			        	<!-- content -->
					    </div>
			        </div>
				</li>
				<li class="accordion-item">
					<div class="accordion-item__header">
					<!-- content -->
					</div>
			        <div class="accordion-item__content">
			        	<div class="accordion-item__content-inner">
				        <!-- content -->
					    </div>
			        </div>
				</li>
				<li class="accordion-item">
					<div class="accordion-item__header">
						<!-- content -->
					</div>
			        <div class="accordion-item__content">
			        	<div class="accordion-item__content-inner">
				            <!-- content -->
					    </div>
			        </div>
				</li>
			</ul>
		</div>
	</div>
</div>
```

### SASS STRUCTURE
```css
.accordion {		
	@at-root #{&}-list {

	}
	@at-root #{&}-item {		
		overflow: hidden;		
		@at-root #{&}__header {			
		}
		@at-root #{&}__content {			
			max-height: 0;
			overflow-x: hidden;
			@at-root #{&}-inner {
			}
		}	
	}
}

.accordion {
	@at-root #{&}-list {}
	
	@at-root #{&}-item {
		
		@at-root #{&}__header {
			cursor: pointer;			
		}
		@at-root #{&}__content {			
			@include transitionator(max-height 200ms);				
			&.active {
				max-height: 3000px;
			}
			@at-root #{&}-inner {} 
		}	
	}
}

.mod-full-width {
	.accordion {
		@at-root #{&}-list {}
		 
		@at-root #{&}-item {

			@at-root #{&}__header {}

			@at-root #{&}__content {
				@at-root #{&}-inner {}
			}
		}
	}	
}

.accordion-theme-sandbox {	
	@extend .row;
	
	.accordion { 		
		@at-root #{&}-inner {
			@extend .large-6, .large-centered, .column;
		}
		@at-root #{&}-list {
		}
		
		@at-root #{&}-item {			
			border:1px solid #ffffff;
			border-radius: 40px;			
			background-color:rgba(0,0,0,0.15);
			margin: 1rem 0;
			
			@at-root #{&}__header {
				padding:.5rem .5rem .5rem 1rem;
				background-color: #f4f4f4;
				@include transitionator(background-color 500ms, color 500ms);

				&:hover {
					background-color: violet;
					color:#ffffff;
				}			
			}

			&.active {			
				.accordion-item__header {
					background-color: violet;
					color:#ffffff;
				}
			}
			@at-root #{&}__content {				
				@include transitionator(max-height 500ms);
				&.active {
					max-height: 3000px;					
				}
				@at-root #{&}-inner {
					padding:2rem;
				}
			}	
		}
	}
}
```

### SASS FILE STRUCTURE


### Javascript
```javascript

document.addEventListener("DOMContentLoaded", function(){
    ;(function($){
        function accordionComp() {
            $(".accordion-item__header").click(function(e){
                var $self = $(this),
                    $currAccordion = $self.parents(".accordion-item");
                    $currContent = $self.next(".accordion-item__content");
                    $activeState = $(".accordion-item.active");         
                if($activeState.length === 0){
                    $currAccordion.addClass("active");
                    $currContent.addClass("active");
                } else if ($currAccordion.hasClass("active")) {
                    $currAccordion.removeClass("active");
                    $currContent.removeClass("active");
                } else {                            
                    $currAccordion.addClass("active");      
                    $currContent.addClass("active");      
                }
            });
        }
        accordionComp(); 
    })(jQuery);
});
    
```
## Authors

* **Tim Schletter** - *Front End Developer*

## Local Configuration Notes

Local Build
* Local Apache; Foundation CSS Framework; js and jQuery; HTML5; PHP; SASS and Compass

Export php project into fedExport folder

Git push fold contents to github