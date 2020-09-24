import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShellComponent } from './shell/shell.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './search-form.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

const components = [ShellComponent, SearchFormComponent, MobileMenuComponent];

const modules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatGridListModule,
  LayoutModule,
  FlexLayoutModule,
];

@NgModule({
  declarations: components,
  imports: modules,
  exports: [...components, ...modules],
})
export class SharedModule {}
