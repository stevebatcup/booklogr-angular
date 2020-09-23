import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ShellComponent } from './shell/shell.component';

const components = [ShellComponent];

const modules = [
  CommonModule,
  RouterModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  LayoutModule,
];

@NgModule({
  declarations: components,
  imports: modules,
  exports: [...components, ...modules],
})
export class SharedModule {}
