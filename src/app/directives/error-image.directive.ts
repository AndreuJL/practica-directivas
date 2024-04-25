import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core'
import { fromEvent, takeWhile, tap } from 'rxjs'

@Directive({
  standalone: true,
  selector: '[appErrorImage]'
})

export class ErrorImageDirective implements OnInit {
  @Input('appErrorImage') imagesUrl: string[]

  public currentIndex: number = 0
  private readonly element: ElementRef = inject(ElementRef)
  private image: HTMLImageElement

  ngOnInit(): void {
    this.resolveImage()
  }

  public resolveImage(): void {
    this.image = this.element.nativeElement.querySelector('img') || this.element.nativeElement
    if (this.image && this.imagesUrl?.length) {
      this.setImage()
      this.errorImage()
    }
  }

  public errorImage(): void {
    fromEvent(this.image, 'error').pipe(
      tap(() => this.currentIndex += 1),
      takeWhile(() => this.currentIndex < this.imagesUrl.length)
    ).subscribe(() => {
      this.setImage()
    })
  }

  public setImage(): void {
    this.image.src = this.imagesUrl[this.currentIndex]
  }
}
