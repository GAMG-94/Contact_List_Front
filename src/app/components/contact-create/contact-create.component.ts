import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactListService } from '../../services/contact-list.service';
import { Contact } from '../../models/Contact';

@Component({
  selector: 'app-contact-create',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact-create.component.html',
  styleUrl: './contact-create.component.css'
})

export default class ContactCreateComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  private contactListService = inject(ContactListService);

  form?: FormGroup;

  contact?: Contact;

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contactListService.getContactById(parseInt(id)).subscribe(contact => {
        this.contact = contact;
        this.form = this.fb.group({
          name: [contact.name, [Validators.required]],
          numberPhone: [contact.numberPhone, [Validators.required]],
          email: [contact.email, [Validators.required]]
        });
      })
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        numberPhone: ['', [Validators.required]],
        email: ['', [Validators.required]]
      });
    }
  }

  constructor() { }

  save() {
    const newContact = this.form!.value;
    if (this.contact) {
      this.contactListService.update(this.contact.id, newContact)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } else {
      this.contactListService.newContact(newContact)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }
}
