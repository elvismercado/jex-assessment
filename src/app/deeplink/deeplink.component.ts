import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

// Angular Material
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

// Other
import { Vacancy } from '../models/vacancy.model';

@Component({
  selector: 'app-deeplink',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    RouterLink,
  ],
  templateUrl: './deeplink.component.html',
  styleUrl: './deeplink.component.scss',
})
export class DeeplinkComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    @Inject(DOCUMENT) private document: Document,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  get vacancy() {
    return this.data.vacancy;
  }

  get location() {
    return this.document.location;
  }

  get deeplink() {
    return `${this.document.location.origin}/vacancies/${this.vacancy.id}`;
  }

  get link() {
    return `vacancies/${this.vacancy.id}`;
  }

  copyDeeplink() {
    this.clipboard.copy(this.deeplink);
    this.snackBar.open('Link copied.', 'Close', {
      duration: 4000,
    });
  }
}

interface DialogData {
  vacancy: Vacancy;
}
