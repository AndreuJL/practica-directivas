import { Component, DebugElement } from '@angular/core'
import { ErrorImageDirective } from './error-image.directive'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

@Component({
  template: `
    <div [appErrorImage] = 'imagesUrl'>
      <img alt="img">
    </div>
  `,
})

class TestComponent {
  public imagesUrl: string[] = [
    'https://picsum.photos/id/237/300/300',
    'https://picsum.photos/id/238/300/300',
    'https://picsum.photos/id/239/300/300',
    'https://picsum.photos/id/240/300/300',
    'https://picsum.photos/id/241/300/300'
  ]
}

describe('ErrorImageDirective', () => {
  //let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  let directive: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ErrorImageDirective]
    }).compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    //component = fixture.componentInstance
    directive = fixture.debugElement.query(
      By.directive(ErrorImageDirective)
    )
    fixture.detectChanges()
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })

  it('with image error/s, should call resolveImage(), call setImage() and increment currentIndex to threeImageErrors.length', () => {
    const directiveInstance = directive.injector.get(ErrorImageDirective)
    const imgElement = directive.nativeElement.querySelector('img')
    //const inImageElement = directive.nativeElement

    const spySetImage = spyOn(directiveInstance, 'setImage')
    const spyErrorImage = spyOn(directiveInstance, 'errorImage')

    const arrayImageErrors = [1, 2, 3]
    const numberErrors = arrayImageErrors.length

    arrayImageErrors.forEach(() => {
      imgElement.dispatchEvent(new Event('error'))
      //inImageElement.dispatchEvent(new Event('error'))
      directiveInstance.resolveImage()

      expect(spySetImage).toHaveBeenCalled()
      expect(spyErrorImage).toHaveBeenCalled()
    })

    expect(spySetImage).toHaveBeenCalledTimes(numberErrors * 2)
    expect(spyErrorImage).toHaveBeenCalledTimes(numberErrors)
    expect(directiveInstance.currentIndex).toBe(numberErrors)
  })

    it('without image error/s should call resolveImage(), setImage() and do not increment currentIndex', () => {
      const directiveInstance = directive.injector.get(ErrorImageDirective)

      const spySetImage = spyOn(directiveInstance, 'setImage')
      const spyErrorImage = spyOn(directiveInstance, 'errorImage')

      directiveInstance.resolveImage()

      expect(spyErrorImage).toHaveBeenCalled()
      expect(spySetImage).toHaveBeenCalled()
      expect(directiveInstance.currentIndex).toBe(0)
    })
})
