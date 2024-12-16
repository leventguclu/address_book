import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    notes: "",
  });

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContacts = [...contacts, { ...formData, id: uuidv4() }];
    setContacts(newContacts);
    localStorage.setItem("contacts", JSON.stringify(newContacts));
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      notes: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteContact = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="container">
      <h1>Address Book</h1>

      {isSearchOpen && (
        <div className="search-modal">
          <div className="search-content">
            <h2>Search Contacts</h2>
            <select
              className="search-filter"
              onChange={(e) => setSearchFilter(e.target.value)}
              value={searchFilter}
            >
              <option value="name">Search by Name</option>
              <option value="email">Search by Email</option>
              <option value="phone">Search by Phone</option>
              <option value="city">Search by City</option>
              <option value="country">Search by Country</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${searchFilter}...`}
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <div className="search-results">
              {contacts
                .filter(
                  (contact) =>
                    contact[searchFilter]
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase()) || false
                )
                .map((contact) => (
                  <div key={contact.id} className="contact-card">
                    <h3>{contact.name}</h3>
                    <p>{contact.email}</p>
                    <p>{contact.address}</p>
                    <p className="notes">{contact.notes}</p>
                  </div>
                ))}
            </div>
            <button onClick={() => setIsSearchOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="neo-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <button type="submit">Add Contact</button>
      </form>

      <button className="search-btn" onClick={() => setIsSearchOpen(true)}>
        Search Contacts
      </button>

      <div className="contacts-grid">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <h3>{contact.name}</h3>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.address}</p>
            <p>
              {contact.city}, {contact.country}
            </p>
            <p className="notes">{contact.notes}</p>
            <button
              className="delete-btn"
              onClick={() => deleteContact(contact.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
