import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() item: any = {
    position: '',
    image: '',
    name: '',
    types: '',
    weight: ''
  };
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  showPokemonDetail(id: string): void {
    this.router.navigateByUrl('pokemon/' + id);
  }
}
