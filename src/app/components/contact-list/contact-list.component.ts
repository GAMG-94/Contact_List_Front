import { Component, OnInit, inject } from '@angular/core';
import { ContactListService } from '../../services/contact-list.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../../models/Contact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export default class ContactListComponent implements OnInit{

  private contactService = inject(ContactListService);

  contacts: Contact[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.contactService.getContacts().subscribe(contact => {
      this.contacts = contact;
    });
  }

  deleteContact(contact: Contact):void {
    this.contactService.deleteContact(contact.id).subscribe(() => {
      this.getData();
    })
  }

}

