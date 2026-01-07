import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private iconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  protected readonly title = signal('Sprint Capacity Planning');

  ngOnInit(): void {
    this.iconRegistry.addSvgIcon('openai', this.domSanitizer.bypassSecurityTrustResourceUrl('/images/openai.svg'));
  }
}
