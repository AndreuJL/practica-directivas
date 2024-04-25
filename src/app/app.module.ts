import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { ErrorImageDirective } from './directives/error-image.directive'
import { CommonModule } from '@angular/common'


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ErrorImageDirective,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
