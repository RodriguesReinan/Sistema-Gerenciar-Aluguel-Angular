import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isMenuOpen = false

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // Lógica para abrir/fechar submenus ao clicar
  toggleSubMenu(event: Event) {
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    target.classList.toggle("active");
  }

}
