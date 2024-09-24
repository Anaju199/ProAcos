import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'textarea[autoResizeTextarea]'
})
export class AutoResizeTextareaDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef, private control: NgControl) {}

  // Ajusta a altura automaticamente após carregar a view
  ngAfterViewInit() {
    this.adjustTextarea();
  }

  // Monitora a entrada de dados e ajusta a altura dinamicamente
  @HostListener('input')
  onInput(): void {
    this.adjustTextarea();
  }

  private adjustTextarea(): void {
    const textarea = this.elementRef.nativeElement;
    textarea.style.height = 'auto';  // Redefine a altura
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta ao conteúdo
  }
}
