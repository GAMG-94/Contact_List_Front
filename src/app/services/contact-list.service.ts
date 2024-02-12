import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})

export class ContactListService {

  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/contact';

  constructor() { }

  getContacts() {
    return this.http.get<Contact[]>(`${this.url}/list`);
  }

  getContactById(id: number) {
    return this.http.get<Contact>(`${this.url}/list/${id}`);
  }

  newContact(contact: Contact) {
    return this.http.post<Contact>(`${this.url}/new`, contact);
  }

  update(id: number, contact: Contact) {
    return this.http.put<Contact>(`${this.url}/${id}`, contact);
  }

  deleteContact(id: number) {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }
}

