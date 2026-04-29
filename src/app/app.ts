import { Component, effect, inject, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import {
  HasRolesDirective,
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  typeEventArgs,
  ReadyArgs
} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HasRolesDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public profile?: KeycloakProfile;
  authenticated = false;
  keycloakStatus: string | undefined;
  menuOpen = false;
  connexionOpen = false;

  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

  constructor() {
    effect(() => {
      const keycloakEvent = this.keycloakSignal();
      this.keycloakStatus = keycloakEvent.type;
      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }
      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    });
  }

  @HostListener('document:click')
  closeAll() {
    this.menuOpen = false;
    this.connexionOpen = false;
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    this.connexionOpen = false;
  }

  toggleConnexion(event: Event) {
    event.stopPropagation();
    this.connexionOpen = !this.connexionOpen;
    this.menuOpen = false;
  }

  login() { this.keycloak.login(); }
  logout() { this.keycloak.logout(); }
}