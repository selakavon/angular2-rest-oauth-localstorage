import { Directive, ElementRef, Renderer} from '@angular/core';

@Directive({ selector: '[selectOnFocus]' })
export class SelectOnFocusDirective {

    constructor(el: ElementRef, renderer: Renderer) {
		renderer.listen(el.nativeElement, 'focus', (event) => {
			renderer.invokeElementMethod(el.nativeElement, 'select', []);
		});
    }

}