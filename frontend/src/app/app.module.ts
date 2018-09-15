import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { RouterModule, Routes } from '@angular/router';
import { IssueService } from './issue.service';
import {HttpClientModule} from '@angular/common/http';
import { MatToolbarModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule, 
  MatTableModule, 
  MatDividerModule, 
  MatSnackBarModule } from '@angular/material';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'list', component: ListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
