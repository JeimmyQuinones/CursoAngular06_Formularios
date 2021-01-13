import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplateComponent } from './pages/template/template.component';

const APP_ROUTES:Routes=[
    {path:'Reactive', component:ReactiveComponent },
    {path:'Template', component:TemplateComponent },
    {path:'**', pathMatch:'full', redirectTo:'Reactive' }
];

export const App_routing = RouterModule.forRoot(APP_ROUTES);